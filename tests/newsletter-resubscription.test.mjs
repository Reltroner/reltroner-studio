import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createResendNewsletterProvider } from '../lib/newsletter/resend-provider.ts';
import { createCloudflareNewsletterService, handleNewsletterRequest } from '../functions/api/newsletter.ts';

// Re-subscription after a 30-day cooldown is BLOCKED: Resend exposes no trusted
// unsubscribe-event timestamp, and no durable store, signed webhook receiver or
// verification-email transport exists. Until those exist, every unsubscribed contact
// must be denied without mutation, whatever its age or timestamp-looking fields.

const email = 'synthetic-resubscribe@example.test';
const apiKey = 're_synthetic_resub_valid_key_1234567890';
const segmentId = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const input = { email, consent: true, source: 'website-newsletter' };
const DAY = 86_400_000;
const NOW = Date.parse('2026-10-23T00:00:00.000Z');
const denied = 'Existing subscription preferences require review. Subscription acceptance is not confirmed.';
const resendTime = (ms) => new Date(ms).toISOString().replace('T', ' ').replace('Z', '+00');
const json = (body, status = 200) => Response.json(body, { status });

let outbound = 0;
const originalFetch = globalThis.fetch;
before(() => { globalThis.fetch = async () => { outbound++; throw new Error('Live network strictly forbidden during tests'); }; });
after(() => { globalThis.fetch = originalFetch; assert.equal(outbound, 0, 'Zero real network calls permitted'); });

function recorder(respond) {
  const requests = [];
  const transport = async (request) => { requests.push({ method: request.method, path: new URL(request.url).pathname, body: await request.clone().text() }); return respond(request, requests.length); };
  return { transport, requests };
}

const provider = (transport, extra = {}) => createResendNewsletterProvider({ apiKey, segmentId, edgeProtection: 'cloudflare-waf', transport, ...extra });

function assertNoReactivation(requests) {
  for (const request of requests) {
    assert.ok(['GET', 'POST'].includes(request.method), `No ${request.method} is ever issued`);
    assert.equal(request.body.includes('unsubscribed'), false, 'No request body touches unsubscribed');
    assert.equal(request.path.startsWith('/suppressions'), false, 'Suppressions are never read or removed');
  }
  assert.deepEqual(requests.filter(request => request.method !== 'GET'), [], 'Zero provider mutations');
}

// Every field below is either contact creation time, a generic update time, or not part
// of the documented Contact object; none is a verified unsubscribe event.
const ages = [
  ['29 days', 29 * DAY],
  ['29 days, 23 hours, 59 minutes', 30 * DAY - 60_000],
  ['exactly 30 days', 30 * DAY],
  ['31 days', 31 * DAY],
  ['400 days', 400 * DAY],
];
for (const [label, age] of ages) {
  test(`unsubscribed ${label} ago: no eligibility without a trusted unsubscribe event; DENY, zero mutation`, async (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: NOW });
    const at = resendTime(NOW - age);
    const { transport, requests } = recorder(() => json({
      object: 'contact', id: contactId, email, unsubscribed: true,
      created_at: at, updated_at: at, unsubscribed_at: at, properties: { unsubscribed_at: { value: at, type: 'string' } },
    }));
    const result = await provider(transport).subscribe(input, crypto.randomUUID());
    assert.deepEqual(result, { status: 'rejected', message: denied, delivered: false, verified: false });
    assert.deepEqual(requests.map(request => `${request.method} ${request.path}`), [`GET /contacts/${encodeURIComponent(email)}`]);
    assertNoReactivation(requests);
  });
}

test('unknown unsubscribe date (no timestamps at all): DENY, zero mutation', async () => {
  const { transport, requests } = recorder(() => json({ object: 'contact', id: contactId, email, unsubscribed: true }));
  assert.equal((await provider(transport).subscribe(input, crypto.randomUUID())).message, denied);
  assertNoReactivation(requests);
});

test('31 days plus fresh consent and any token-like field: no verification path exists, so DENY with zero mutation', async () => {
  const { transport, requests } = recorder(() => json({ object: 'contact', id: contactId, email, unsubscribed: true, created_at: resendTime(NOW - 31 * DAY) }));
  const request = new Request('https://www.reltroner.com/api/newsletter', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.reltroner.com' },
    body: JSON.stringify({ ...input, token: 'synthetic-token', verificationToken: 'synthetic-token', resubscribe: true, unsubscribed: false }),
  });
  const response = await handleNewsletterRequest(request, createCloudflareNewsletterService({
    RESEND_API_KEY: apiKey, RESEND_SEGMENT_ID: segmentId, RESEND_NEWSLETTER_ENABLED: 'true', CLOUDFLARE_WAF_PROTECTION_VERIFIED: 'true',
    RESEND_HARD_STOP_VERIFIED: 'true', RESEND_UNSUBSCRIBE_VERIFIED: 'true',
  }, request, { transport }));
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { status: 'rejected', message: denied, delivered: false, verified: false });
  assertNoReactivation(requests);
});

test('existing active segment member: duplicate with zero mutation', async () => {
  const { transport, requests } = recorder((_request, n) => n === 1
    ? json({ object: 'contact', id: contactId, email, unsubscribed: false })
    : json({ object: 'list', data: [{ id: segmentId }], has_more: false }));
  assert.equal((await provider(transport).subscribe(input, crypto.randomUUID())).status, 'duplicate');
  assertNoReactivation(requests);
});

test('unsubscribe observed at readback (after a new membership) is denied, never confirmed or reversed', async () => {
  const { transport, requests } = recorder((_request, n) => [
    json({ object: 'contact', id: contactId, email, unsubscribed: false }),
    json({ object: 'list', data: [], has_more: false }),
    json({ id: segmentId }),
    json({ object: 'contact', id: contactId, email, unsubscribed: true }),
  ][n - 1]);
  const result = await provider(transport).subscribe(input, crypto.randomUUID());
  assert.deepEqual(result, { status: 'rejected', message: denied, delivered: false, verified: false });
  assert.deepEqual(requests.filter(request => request.method !== 'GET').map(request => request.path), [`/contacts/${contactId}/segments/${segmentId}`]);
  for (const request of requests) assert.equal(request.body.includes('unsubscribed'), false);
});

test('concurrent submissions for an unsubscribed contact: zero reactivation across all requests', async () => {
  const { transport, requests } = recorder(async () => { await new Promise(resolve => setTimeout(resolve, 5)); return json({ object: 'contact', id: contactId, email, unsubscribed: true }); });
  const service = provider(transport);
  const results = await Promise.all(Array.from({ length: 5 }, () => service.subscribe(input, crypto.randomUUID())));
  for (const result of results) assert.equal(result.message, denied);
  assert.equal(requests.length, 5);
  assertNoReactivation(requests);
});

test('provider timeout or 502 during lookup: unknown outcome, exactly one request, no automatic retry', async () => {
  for (const [respond, options] of [
    [() => new Promise(() => {}), { timeoutMilliseconds: 20 }],
    [() => new Response('<html>502 Bad Gateway</html>', { status: 502, headers: { 'Content-Type': 'text/html' } }), {}],
  ]) {
    const { transport, requests } = recorder(respond);
    const result = await provider(transport, options).subscribe(input, crypto.randomUUID());
    assert.equal(result.status, 'network-error');
    assert.equal(result.message, 'Subscription acceptance could not be confirmed. Check your preferences before retrying.');
    assert.equal(result.delivered, false);
    assert.equal(result.verified, false);
    await new Promise(resolve => setTimeout(resolve, 40));
    assert.equal(requests.length, 1);
    assertNoReactivation(requests);
  }
});
