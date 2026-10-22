import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createSubscriptionClient } from '../lib/newsletter/subscription.client.ts';
import { createCloudflareNewsletterService, handleNewsletterRequest } from '../functions/api/newsletter.ts';

const email = 'synthetic-client@example.test';
const apiKey = 're_synthetic_client_valid_key_1234567890';
const segmentId = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const rayId = '0123456789abcdef-SIN';
const input = { email, consent: true, source: 'website-newsletter' };
const verifiedEnv = {
  RESEND_API_KEY: apiKey, RESEND_SEGMENT_ID: segmentId, RESEND_NEWSLETTER_ENABLED: 'true',
  CLOUDFLARE_WAF_PROTECTION_VERIFIED: 'true', RESEND_HARD_STOP_VERIFIED: 'true', RESEND_UNSUBSCRIBE_VERIFIED: 'true',
};
const CONFIRMED = ['accepted', 'subscribed', 'duplicate', 'prototype'];
const diagnosticKeys = ['category', 'contentType', 'httpStatus', 'rayId', 'requestId', 'requestSent', 'retryAfterSeconds', 'scope'];
const unsafe = [email, apiKey, contactId, segmentId, 'Bearer', 'private-body-marker', 'private-exception-marker'];

const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers });
const cloudflareHtml = (status = 502, headers = {}) => new Response(
  // Contains success-looking JSON text: it must still never be parsed or trusted.
  `<!DOCTYPE html><html><head><title>${status} Bad Gateway</title></head><body>private-body-marker {"status":"accepted","message":"ok","delivered":false,"verified":false}</body></html>`,
  { status, headers: { 'Content-Type': 'text/html; charset=UTF-8', Server: 'cloudflare', 'Retry-After': '60', 'CF-Ray': rayId, ...headers } },
);

let outbound = 0;
const originalFetch = globalThis.fetch;
before(() => { globalThis.fetch = async () => { outbound++; throw new Error('Live network strictly forbidden during tests'); }; });
after(() => { globalThis.fetch = originalFetch; assert.equal(outbound, 0, 'Zero real network calls permitted'); });

/** Stateful synthetic Resend Contacts API: per-email uniqueness, 409 on duplicate create. */
function fakeResend({ existing } = {}) {
  const contacts = new Map();
  if (existing) contacts.set(email, { id: contactId, email, unsubscribed: existing.unsubscribed === true, segments: new Set(existing.member ? [segmentId] : []) });
  const log = [];
  const byId = id => [...contacts.values()].find(item => item.id === id);
  const transport = async (request) => {
    const { pathname } = new URL(request.url);
    log.push(`${request.method} ${pathname}`);
    assert.equal(new URL(request.url).origin, 'https://api.resend.com');
    assert.equal(request.headers.get('authorization'), `Bearer ${apiKey}`);
    const parts = pathname.split('/').filter(Boolean).map(decodeURIComponent);
    if (request.method === 'GET' && parts.length === 2) {
      const item = contacts.get(parts[1]) ?? byId(parts[1]);
      return item ? json({ object: 'contact', id: item.id, email: item.email, unsubscribed: item.unsubscribed }) : json({ name: 'not_found', message: 'Contact not found.' }, 404);
    }
    if (request.method === 'GET' && parts[2] === 'segments') return json({ object: 'list', data: [...byId(parts[1]).segments].map(id => ({ id })), has_more: false });
    if (request.method === 'POST' && parts.length === 1) {
      const body = await request.json();
      assert.equal('unsubscribed' in body, false, 'Creation never overrides suppression state');
      if (contacts.has(body.email)) return json({ name: 'conflict' }, 409);
      contacts.set(body.email, { id: contactId, email: body.email, unsubscribed: false, segments: new Set(body.segments.map(item => item.id)) });
      return json({ object: 'contact', id: contactId }, 201);
    }
    if (request.method === 'POST' && parts[2] === 'segments') { byId(parts[1]).segments.add(parts[3]); return json({ id: parts[3] }); }
    throw new Error(`Unexpected provider operation ${request.method} ${pathname}`);
  };
  return { transport, log, contacts, mutations: () => log.filter(entry => !entry.startsWith('GET ')) };
}

/** Browser → (synthetic edge) → real Pages Function handler → mocked Resend. `edge` may replace or drop the response. */
function site(resend, { env = verifiedEnv, edge, serverDiagnostics } = {}) {
  const sent = [];
  const fetcher = async (path, init) => {
    sent.push({ path, init });
    const request = new Request(new URL(path, 'https://www.reltroner.com'), { ...init, headers: { ...init.headers, Origin: 'https://www.reltroner.com' } });
    const service = createCloudflareNewsletterService(serverDiagnostics ? { ...env, NEWSLETTER_DIAGNOSTICS_ENABLED: 'true' } : env, request,
      { transport: resend.transport, diagnostic: event => serverDiagnostics?.push(event) });
    const response = await handleNewsletterRequest(request, service);
    return edge ? edge(response) : response;
  };
  return { fetcher, sent };
}

function clientWith(fetcher, extra = {}) {
  const clock = { now: 1_800_000_000_000 };
  return { clock, client: createSubscriptionClient({ fetcher, now: () => clock.now, ...extra }) };
}

function assertSafe(attempt) {
  assert.deepEqual(Object.keys(attempt.diagnostic).sort(), diagnosticKeys);
  assert.ok(Object.isFrozen(attempt.diagnostic));
  const serialized = JSON.stringify(attempt.diagnostic);
  for (const secret of unsafe) assert.equal(serialized.includes(secret), false, `diagnostic must not include ${secret}`);
  assert.deepEqual(Object.keys(attempt.result).sort(), ['delivered', 'message', 'status', 'verified']);
  assert.equal(attempt.result.delivered, false);
  assert.equal(attempt.result.verified, false);
  for (const secret of unsafe) assert.equal(attempt.result.message.includes(secret), false);
}

function assertUnconfirmed(attempt) {
  assertSafe(attempt);
  assert.equal(attempt.confirmed, false);
  assert.equal(CONFIRMED.includes(attempt.result.status), false);
}

test('same-origin request shape: one relative POST with the validated consent payload and no credentials header', async () => {
  const resend = fakeResend();
  const { fetcher, sent } = site(resend);
  const { client } = clientWith(fetcher);
  await client.submit({ ...input, email: ' Synthetic-Client@Example.test ' });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].path, '/api/newsletter');
  assert.equal(sent[0].init.method, 'POST');
  assert.equal(sent[0].init.credentials, 'same-origin');
  assert.deepEqual(JSON.parse(sent[0].init.body), input);
  assert.equal(new Headers(sent[0].init.headers).get('authorization'), null);
});

test('HTTP 200 with a provider-confirmed new subscription is the only path to accepted', async () => {
  const resend = fakeResend();
  const serverDiagnostics = [];
  const { client } = clientWith(site(resend, { serverDiagnostics }).fetcher);
  const attempt = await client.submit(input);
  assertSafe(attempt);
  assert.equal(attempt.confirmed, true);
  assert.deepEqual(attempt.result, { status: 'accepted', message: 'Your subscription was saved in Resend. No email was sent.', delivered: false, verified: false });
  assert.equal(attempt.diagnostic.category, 'application-result');
  assert.equal(attempt.diagnostic.httpStatus, 200);
  assert.deepEqual(resend.log, [`GET /contacts/${encodeURIComponent(email)}`, 'POST /contacts', `GET /contacts/${contactId}`, `GET /contacts/${contactId}/segments`]);
  // The browser-visible X-Request-Id correlates with the server's evidence record.
  assert.equal(serverDiagnostics.length, 1);
  assert.equal(attempt.diagnostic.requestId, serverDiagnostics[0].requestId);
  assert.equal(serverDiagnostics[0].evidenceConfirmed, true);
});

test('existing active contact with verified segment membership is a confirmed duplicate with zero mutations', async () => {
  const resend = fakeResend({ existing: { member: true } });
  const { client } = clientWith(site(resend).fetcher);
  const attempt = await client.submit(input);
  assertSafe(attempt);
  assert.equal(attempt.confirmed, true);
  assert.equal(attempt.result.status, 'duplicate');
  assert.deepEqual(resend.mutations(), []);
});

test('existing unsubscribed contact stays unsubscribed across repeated submissions; nothing is reactivated', async () => {
  const resend = fakeResend({ existing: { unsubscribed: true, member: true } });
  const { client, clock } = clientWith(site(resend).fetcher);
  for (let round = 0; round < 2; round++) {
    const attempt = await client.submit(input);
    assertUnconfirmed(attempt);
    assert.equal(attempt.result.status, 'rejected');
    assert.equal(attempt.result.message, 'Existing subscription preferences require review. Subscription acceptance is not confirmed.');
    assert.equal(attempt.diagnostic.httpStatus, 502);
    assert.equal(attempt.diagnostic.contentType, 'json');
    clock.now += 10_000;
  }
  assert.deepEqual(resend.mutations(), []);
  assert.equal(resend.contacts.get(email).unsubscribed, true);
});

test('HTTP 502 with Cloudflare HTML is never parsed, is reported as an unknown outcome and keeps its real category', async (t) => {
  let reads = 0;
  const { client } = clientWith(async () => {
    const response = cloudflareHtml();
    for (const method of ['json', 'text', 'arrayBuffer', 'blob', 'formData']) t.mock.method(response, method, async () => { reads++; throw new Error('HTML must not be read'); });
    return response;
  });
  const attempt = await client.submit(input);
  assertUnconfirmed(attempt);
  assert.equal(reads, 0);
  assert.equal(attempt.result.status, 'network-error');
  assert.match(attempt.result.message, /HTTP 502/);
  assert.match(attempt.result.message, /may or may not have been saved/);
  assert.match(attempt.result.message, /no automatic retry was made/);
  assert.doesNotMatch(attempt.result.message, /nothing (was )?saved|not saved|was saved/i);
  assert.deepEqual({ ...attempt.diagnostic }, {
    scope: 'newsletter-client', category: 'platform-error', requestSent: true, httpStatus: 502,
    contentType: 'html', retryAfterSeconds: 60, rayId, requestId: null,
  });
});

test('HTTP 502 with application JSON is distinguishable from a platform 502 and shows the server message', async () => {
  // Provider readback fails after creation: the function itself returns its indeterminate JSON 502.
  const steps = [json({ name: 'not_found' }, 404), json({ object: 'contact', id: contactId }, 201), json({ message: 'private-body-marker' }, 500)];
  const resend = { transport: async () => steps.shift() };
  const { client } = clientWith(site(resend).fetcher);
  const attempt = await client.submit(input);
  assertUnconfirmed(attempt);
  assert.equal(attempt.result.status, 'rejected');
  assert.equal(attempt.result.message, 'Subscription acceptance could not be confirmed. Check your preferences before retrying.');
  assert.equal(attempt.diagnostic.category, 'application-result');
  assert.equal(attempt.diagnostic.httpStatus, 502);
  assert.equal(attempt.diagnostic.contentType, 'json');
  assert.match(attempt.diagnostic.requestId, /^[a-f0-9-]{36}$/);

  const gate = clientWith(site(fakeResend(), { env: { ...verifiedEnv, CLOUDFLARE_WAF_PROTECTION_VERIFIED: 'false' } }).fetcher);
  const gated = await gate.client.submit(input);
  assertUnconfirmed(gated);
  assert.equal(gated.diagnostic.category, 'application-result');
  assert.equal(gated.diagnostic.httpStatus, 502);
  assert.match(gated.result.message, /No subscription has been confirmed/);
});

for (const [label, response, category] of [
  ['edge HTML', () => cloudflareHtml(429, { 'Retry-After': '30' }), 'platform-rate-limit'],
  ['application JSON', () => json({ status: 'quota-error', message: 'The newsletter request limit was reached. Subscription acceptance is not confirmed.', delivered: false, verified: false }, 429, { 'Retry-After': '30' }), 'application-result'],
]) {
  test(`HTTP 429 (${label}) + Retry-After maps to quota-error and holds the next submission until it elapses`, async () => {
    let calls = 0;
    const { client, clock } = clientWith(async () => { calls++; return response(); });
    const attempt = await client.submit(input);
    assertUnconfirmed(attempt);
    assert.equal(attempt.result.status, 'quota-error');
    assert.equal(attempt.diagnostic.category, category);
    assert.equal(attempt.diagnostic.retryAfterSeconds, 30);
    clock.now += 29_000;
    const heldAttempt = await client.submit(input);
    assertUnconfirmed(heldAttempt);
    assert.equal(heldAttempt.diagnostic.requestSent, false);
    assert.equal(heldAttempt.result.status, 'quota-error');
    assert.match(heldAttempt.result.message, /no additional request was sent/);
    assert.equal(calls, 1);
    clock.now += 1_000;
    await client.submit(input);
    assert.equal(calls, 2, 'A manual submission is allowed once Retry-After has elapsed');
  });
}

test('Retry-After accepts HTTP-dates and ignores malformed values', async () => {
  for (const [header, expected] of [['Thu, 15 Jan 2027 08:00:30 GMT', 30], ['soon', null], ['-5', null]]) {
    const clock = { now: Date.parse('Thu, 15 Jan 2027 08:00:00 GMT') };
    const client = createSubscriptionClient({ now: () => clock.now, fetcher: async () => cloudflareHtml(503, { 'Retry-After': header }) });
    assert.equal((await client.submit(input)).diagnostic.retryAfterSeconds, expected);
  }
});

for (const [label, edge] of [
  ['the edge replaces it with Cloudflare HTML 502', () => cloudflareHtml()],
  ['the connection drops', () => { throw new TypeError('private-exception-marker'); }],
]) {
  test(`Resend contact created but browser response lost (${label}): no false outcome, held recheck, zero duplicate mutation`, async () => {
    const resend = fakeResend();
    const serverDiagnostics = [];
    let lose = true;
    const { fetcher, sent } = site(resend, { serverDiagnostics, edge: response => (lose ? edge() : response) });
    const { client, clock } = clientWith(fetcher);

    const first = await client.submit(input);
    assertUnconfirmed(first);
    assert.equal(first.result.status, 'network-error');
    assert.match(first.result.message, /may or may not have been saved/);
    assert.equal(resend.contacts.size, 1, 'The provider mutation did happen server-side');
    assert.equal(serverDiagnostics[0].outcome, 'accepted');
    assert.equal(first.diagnostic.requestId, null, 'Browser cannot correlate a response it never received');

    // Duplicate submit after the uncertain outcome: held, nothing sent to the site or Resend.
    const logBefore = resend.log.length;
    const held = await client.submit(input);
    assertUnconfirmed(held);
    assert.equal(held.diagnostic.requestSent, false);
    assert.equal(sent.length, 1);
    assert.equal(resend.log.length, logBefore);

    // After the hold, a deliberate recheck reconciles read-first and reports the existing state.
    lose = false;
    clock.now += 60_000;
    const recheck = await client.submit(input);
    assertSafe(recheck);
    assert.equal(recheck.confirmed, true);
    assert.equal(recheck.result.status, 'duplicate');
    assert.deepEqual(resend.mutations(), ['POST /contacts'], 'Exactly one mutation across both submissions');
    for (const event of serverDiagnostics) for (const secret of unsafe) assert.equal(JSON.stringify(event).includes(secret), false);
  });
}

test('concurrent submissions on one page send exactly one POST', async () => {
  let calls = 0;
  let release;
  const { client } = clientWith(async () => { calls++; await new Promise(resolve => { release = resolve; }); return cloudflareHtml(); });
  const first = client.submit(input);
  const second = await client.submit(input);
  assertUnconfirmed(second);
  assert.equal(second.result.status, 'loading');
  assert.equal(second.diagnostic.requestSent, false);
  release();
  assertUnconfirmed(await first);
  assert.equal(calls, 1);
});

test('timeout and network exceptions are unknown outcomes with exactly one attempt and no automatic retry', async () => {
  for (const [fetcher, category, pattern] of [
    [async () => new Promise(() => {}), 'timeout', /timed out/],
    [async () => new Response(new ReadableStream({ start() {} }), { headers: { 'Content-Type': 'application/json' } }), 'timeout', /timed out/],
    [async () => { throw new TypeError('private-exception-marker'); }, 'network', /connection failed/],
  ]) {
    let calls = 0;
    const { client } = clientWith(async (...args) => { calls++; return fetcher(...args); }, { timeoutMilliseconds: 20 });
    const attempt = await client.submit(input);
    assertUnconfirmed(attempt);
    assert.equal(attempt.result.status, 'network-error');
    assert.equal(attempt.diagnostic.category, category);
    assert.match(attempt.result.message, pattern);
    assert.match(attempt.result.message, /may or may not have been saved/);
    await new Promise(resolve => setTimeout(resolve, 40));
    assert.equal(calls, 1, 'No automatic POST retry');
    assertUnconfirmed(await client.submit(input));
    assert.equal(calls, 1, 'Held: an immediate resubmit sends nothing');
  }
});

test('no fabricated accepted/subscribed: contract-violating or non-JSON responses never confirm', async () => {
  const ok = { message: 'ok', delivered: false, verified: false };
  const redirected = json({ status: 'accepted', ...ok });
  Object.defineProperty(redirected, 'redirected', { value: true });
  for (const make of [
    () => new Response('{"status":"accepted","message":"ok","delivered":false,"verified":false}', { status: 200, headers: { 'Content-Type': 'text/html' } }),
    () => new Response('{"status":"accepted","message":"ok","delivered":false,"verified":false}', { status: 200, headers: { 'Content-Type': 'text/plain' } }),
    () => new Response('{"status":"accepted","message":"ok","delivered":false,"verified":false}', { status: 200 }),
    () => json({ status: 'accepted', ...ok }, 502),
    () => json({ status: 'subscribed', ...ok }, 503),
    () => json({ status: 'accepted', ...ok, delivered: true }),
    () => json({ status: 'accepted', ...ok, verified: true }),
    () => json({ status: 'ok', ...ok }),
    () => json({ status: 'accepted', message: 1, delivered: false, verified: false }),
    () => json([{ status: 'accepted', ...ok }]),
    () => json({ status: 'accepted', ...ok, padding: 'x'.repeat(17_000) }),
    () => new Response('{"status":"accepted"', { headers: { 'Content-Type': 'application/json' } }),
    () => redirected,
  ]) {
    const { client } = clientWith(async () => make());
    assertUnconfirmed(await client.submit(input));
  }
});

test('invalid input is rejected locally without a request or a hold', async () => {
  let calls = 0;
  const { client } = clientWith(async () => { calls++; return json({ status: 'duplicate', message: 'ok', delivered: false, verified: false }); });
  for (const value of [{ email, consent: false }, { email: 'not-an-email', consent: true }, null]) {
    const attempt = await client.submit(value);
    assertUnconfirmed(attempt);
    assert.equal(attempt.result.status, 'invalid');
    assert.equal(attempt.diagnostic.requestSent, false);
  }
  assert.equal(calls, 0);
  assert.equal((await client.submit(input)).confirmed, true);
});

test('SubscribeForm uses the guarded transport and never parses the response itself', async () => {
  const form = await fs.readFile('components/newsletter/SubscribeForm.tsx', 'utf8');
  assert.match(form, /createSubscriptionClient\(\)/);
  assert.equal(form.includes('response.json()'), false);
  assert.equal(form.includes("fetch('/api/newsletter'"), false);
  assert.match(form, /if \(attempt\.confirmed\) lastPreview\.current = checked\.input\.email;/);
});
