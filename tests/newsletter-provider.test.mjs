import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createResendNewsletterProvider } from '../lib/newsletter/resend-provider.server.ts';
import { createNewsletterService, createRuntimeNewsletterService, newsletterService } from '../lib/newsletter/service.ts';
import { POST, setNewsletterService } from '../functions/api/newsletter.ts';

const email = 'synthetic-rc02@example.test';
const apiKey = 're_rc02_synthetic_fixture_key';
const id = '479e3145-dd38-476b-932c-529ceb705947';
const segmentId = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const input = { email, consent: true, source: 'website-newsletter' };
const json = (body, status = 200) => Response.json(body, { status });
const contact = (overrides = {}) => ({ object: 'contact', id, email, unsubscribed: false, ...overrides });
const member = () => json({ object: 'list', data: [{ id: segmentId }], has_more: false });
const absent = () => json({ name: 'not_found' }, 404);
const success = () => [absent(), json({ object: 'contact', id }), json(contact()), member()];
const activation = { privacyDisclosuresApproved: true, unsubscribeVerified: true, costAndUsageApproved: true, authorizedSmokeTestPassed: true };
// Fixture control only; this does not certify a real deployment-wide boundary.
const fixtureControl = () => ({ scope: 'deployment', enforcesFreePlanHardStop: true, verifiedAbuseControls: true, withReservation: async (_request, work) => work() });
let outbound = 0;
const originalFetch = globalThis.fetch;
before(() => { globalThis.fetch = async () => { outbound++; throw new Error('Live network forbidden'); }; });
after(() => { globalThis.fetch = originalFetch; assert.equal(outbound, 0); });

function fixture(steps, overrides = {}) {
  const requests = [];
  const diagnostics = [];
  const reservations = [];
  const control = fixtureControl();
  control.withReservation = async (reservation, work) => { reservations.push(reservation); return work(); };
  const options = { apiKey, segmentId, control, transport: async request => {
    requests.push(request);
    const step = steps.shift();
    assert.ok(step, 'Unexpected provider operation');
    return typeof step === 'function' ? step(request) : step;
  }, diagnostic: event => diagnostics.push(event), ...overrides };
  return { options, adapter: createResendNewsletterProvider(options), requests, diagnostics, reservations };
}

test('real Resend transport implementation confirms mocked contact persistence without dispatching email', async () => {
  const { adapter, requests, diagnostics, reservations } = fixture(success());
  const response = await adapter.subscribe({ ...input, email: ' SYNTHETIC-RC02@EXAMPLE.TEST ' }, id);
  assert.equal(response.status, 'accepted');
  assert.equal(response.delivered, false); assert.equal(response.verified, false);
  assert.deepEqual(Object.keys(response).sort(), ['delivered', 'message', 'status', 'verified']);
  assert.equal(requests.length, 4);
  assert.deepEqual(await requests[1].json(), { email, segments: [{ id: segmentId }] });
  for (const request of requests) {
    assert.equal(new URL(request.url).origin, 'https://api.resend.com');
    assert.equal(request.headers.get('authorization'), `Bearer ${apiKey}`);
    assert.equal(request.redirect, 'manual');
    assert.equal(request.signal.aborted, true);
    assert.equal(new URL(request.url).pathname.includes('/emails'), false);
  }
  assert.equal(reservations[0].maxProviderOperations, 7);
  assert.match(reservations[0].key, /^[a-f0-9]{64}$/);
  assert.equal(diagnostics[0].requestId, id);
  assert.equal(JSON.stringify([response, diagnostics, reservations]).includes(email), false);
  assert.equal(JSON.stringify([response, diagnostics, reservations]).includes(apiKey), false);
});

test('duplicate member and unsubscribed contacts do not trigger creation or reactivation', async () => {
  const duplicate = fixture([json(contact()), member()]);
  assert.equal((await duplicate.adapter.subscribe(input, 'fixture')).status, 'duplicate');
  assert.equal(duplicate.requests.every(request => request.method === 'GET'), true);
  const suppressed = fixture([json(contact({ unsubscribed: true }))]);
  assert.equal((await suppressed.adapter.subscribe(input, 'fixture')).status, 'rejected');
  assert.equal(suppressed.diagnostics[0].outcome, 'suppressed');
  assert.equal(suppressed.requests.length, 1);
});

test('an explicitly consenting active global contact joins the segment with verified readback', async () => {
  const nonmember = fixture([json(contact()), json({ object: 'list', data: [], has_more: false }), json({ id: segmentId }), json(contact()), member()]);
  assert.equal((await nonmember.adapter.subscribe(input, 'fixture')).status, 'accepted');
  assert.deepEqual(nonmember.requests.map(request => request.method), ['GET', 'GET', 'POST', 'GET', 'GET']);
  assert.equal(new URL(nonmember.requests[2].url).pathname, `/contacts/${id}/segments/${segmentId}`);
  assert.equal(await nonmember.requests[2].text(), '');
  assert.equal(nonmember.requests.some(request => request.method === 'PATCH'), false);
});

test('concurrent creation conflicts reconcile state without retrying creation or changing suppression', async () => {
  const concurrent = fixture([absent(), json({ name: 'conflict' }, 409), json(contact()), member()]);
  assert.equal((await concurrent.adapter.subscribe(input, 'fixture')).status, 'duplicate');
  assert.equal(concurrent.requests.filter(request => request.method === 'POST').length, 1);
  const suppressed = fixture([absent(), json({ name: 'conflict' }, 409), json(contact({ unsubscribed: true }))]);
  assert.equal((await suppressed.adapter.subscribe(input, 'fixture')).status, 'rejected');
  assert.equal(suppressed.requests.length, 3);
});

test('membership rejection, missing readback and suppression after mutation never report persistence', async () => {
  for (const tail of [[json({ message: 'denied' }, 403)], [json({ id: 'wrong' })], [json({ id: segmentId }), json(contact({ unsubscribed: true }))], [json({ id: segmentId }), json(contact()), json({ object: 'list', data: [], has_more: false })]]) {
    const nonmember = fixture([json(contact()), json({ object: 'list', data: [], has_more: false }), ...tail]);
    const feedback = await nonmember.adapter.subscribe(input, 'fixture');
    assert.equal(feedback.status, 'rejected');
    assert.doesNotMatch(feedback.message, /No preferences were changed/);
    assert.equal(nonmember.requests.filter(request => request.method === 'POST').length, 1);
  }
});

test('missing private key, segment or verified control fails closed before transport', async () => {
  for (const overrides of [{ apiKey: '' }, { apiKey: 'YOUR_RESEND_API_KEY' }, { apiKey: apiKey + '\r\n' }, { segmentId: '' }, { control: undefined }, { control: { ...fixtureControl(), scope: 'instance' } }, { control: { ...fixtureControl(), enforcesFreePlanHardStop: false } }, { control: { ...fixtureControl(), verifiedAbuseControls: false } }]) {
    const { adapter, requests } = fixture([], overrides);
    assert.equal((await adapter.subscribe(input, 'fixture')).status, 'rejected');
    assert.equal(requests.length, 0);
  }
});

test('invalid email and absent consent never consume a provider reservation', async () => {
  const { adapter, requests, reservations } = fixture([]);
  for (const value of [null, {}, { ...input, email: 'invalid' }, { ...input, email: 'bad\u0000@example.test' }, { ...input, consent: false }]) assert.equal((await adapter.subscribe(value, 'fixture')).status, 'invalid');
  assert.equal(requests.length, 0); assert.equal(reservations.length, 0);
});

test('provider quota, explicit rejection, malformed response and read outage cannot return subscription success', async () => {
  for (const [step, status, outcome] of [[json({ success: true }, 429), 'quota-error', 'quota'], [json({ message: apiKey + email }, 422), 'rejected', 'rejected'], [json({}), 'rejected', 'malformed'], [json({ error: 'outage' }, 503), 'network-error', 'network'], [new Response('{bad', { headers: { 'Content-Type': 'application/json' } }), 'rejected', 'malformed']]) {
    const { adapter, requests, diagnostics } = fixture([step]);
    const response = await adapter.subscribe(input, 'fixture');
    assert.equal(response.status, status); assert.equal(diagnostics[0].outcome, outcome);
    assert.equal(requests.length, 1);
    assert.equal(JSON.stringify([response, diagnostics]).includes(apiKey), false);
  }
});

test('provider timeout, stalled JSON body and network exceptions use bounded safe feedback', async () => {
  for (const step of [() => new Promise(() => {}), () => new Response(new ReadableStream({ start() {} }), { headers: { 'Content-Type': 'application/json' } }), () => { throw new Error(apiKey + email); }]) {
    const { adapter, requests } = fixture([step], { timeoutMilliseconds: 20 });
    assert.equal((await adapter.subscribe(input, 'fixture')).status, 'network-error');
    assert.equal(requests.length, 1); assert.equal(requests[0].signal.aborted, true);
  }
});

test('creation acknowledgement requires matching active readback and membership, with no mutation retry', async () => {
  for (const tail of [[json({})], [json(contact({ email: 'different@example.test' }))], [json(contact({ unsubscribed: true }))], [json(contact()), json({ object: 'list', data: [], has_more: true })], [json({ message: 'ambiguous' }, 503)]]) {
    const { adapter, requests } = fixture([absent(), json({ object: 'contact', id }), ...tail]);
    assert.equal((await adapter.subscribe(input, 'fixture')).status, 'rejected');
    assert.equal(requests.filter(request => request.method === 'POST').length, 1);
  }
});

test('deployment control denial, hang or fabricated success cannot authorize false acceptance', async () => {
  for (const [run, status] of [[async () => null, 'quota-error'], [async () => new Promise(() => {}), 'network-error'], [async () => ({ status: 'accepted', message: 'unsubstantiated', delivered: false, verified: false }), 'rejected']]) {
    const { adapter, requests } = fixture([], { control: { ...fixtureControl(), withReservation: run }, timeoutMilliseconds: 20 });
    assert.equal((await adapter.subscribe(input, 'fixture')).status, status);
    assert.equal(requests.length, 0);
  }
});

test('all activation gates are required; key availability alone preserves exact current prototype response', async () => {
  const prepared = fixture(success());
  for (const gate of [undefined, ...Object.keys(activation).map(name => ({ ...activation, [name]: false }))]) {
    const service = createNewsletterService({ provider: prepared.options, activation: gate });
    assert.deepEqual(await service.subscribe(input, 'fixture'), await newsletterService.subscribe(input, 'fixture'));
  }
  assert.equal(prepared.requests.length, 0);
  const service = createNewsletterService({ provider: prepared.options, activation });
  assert.equal((await service.subscribe(input, 'fixture')).status, 'accepted');
});

test('unverified unsubscribe tokens never update provider preferences', async () => {
  const { adapter, requests } = fixture([]);
  assert.equal((await adapter.unsubscribe(email)).status, 'rejected');
  assert.equal((await adapter.unsubscribe(id)).status, 'rejected');
  assert.equal(requests.length, 0);
  assert.equal((await newsletterService.unsubscribe('fixture')).status, 'prototype');
});

test('runtime flag disabled makes no provider call; enabled uses real persistence contract and requires credentials', async () => {
  const prepared = fixture(success());
  const env = { RESEND_API_KEY: apiKey, RESEND_SEGMENT_ID: segmentId };
  for (const flag of [undefined, 'false', 'TRUE', '1']) {
    assert.equal((await createRuntimeNewsletterService({ ...env, RESEND_NEWSLETTER_ENABLED: flag }, prepared.options.transport).subscribe(input, 'fixture')).status, 'prototype');
  }
  assert.equal(prepared.requests.length, 0);
  const enabled = { ...env, RESEND_NEWSLETTER_ENABLED: 'true' };
  assert.equal((await createRuntimeNewsletterService(enabled, prepared.options.transport).subscribe(input, 'fixture')).status, 'accepted');
  for (const missing of ['RESEND_API_KEY', 'RESEND_SEGMENT_ID']) {
    const broken = fixture([]);
    assert.equal((await createRuntimeNewsletterService({ ...enabled, [missing]: '' }, broken.options.transport).subscribe(input, 'fixture')).status, 'rejected');
    assert.equal(broken.requests.length, 0);
  }
  // These are mocked runtime-path tests, not evidence that a published WAF exists.
});

test('newsletter POST requires same-origin browser requests and strictly bounded JSON', async () => {
  const request = (body, headers = {}) => new Request('https://www.reltroner.com/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body });
  for (const headers of [{}, { Origin: 'https://untrusted.test' }, { Origin: 'null' }, { Origin: 'https://www.reltroner.com', 'Sec-Fetch-Site': 'cross-site' }]) {
    assert.equal((await POST(request(JSON.stringify(input), headers))).status, 403);
  }
  for (const [body, headers] of [['x'.repeat(12001), {}], ['{}', { 'Content-Length': '12001' }], ['{}', { 'Content-Type': 'application/jsonp' }], ['{bad', {}]]) {
    assert.equal((await POST(request(body, { Origin: 'https://www.reltroner.com', ...headers }))).status, 400);
  }
});

test('same-origin route preserves response schema and maps provider failures without setting a successful preview response', async () => {
  const original = newsletterService.subscribe;
  setNewsletterService(newsletterService);
  try {
    for (const [status, httpStatus] of [['accepted', 200], ['duplicate', 200], ['quota-error', 429], ['network-error', 503], ['rejected', 502], ['invalid', 422]]) {
      newsletterService.subscribe = async (_input, requestId) => {
        assert.match(requestId, /^[a-f0-9-]{36}$/);
        return { status, message: 'Synthetic backend contract result.', delivered: false, verified: false };
      };
      const response = await POST(new Request('http://localhost:3107/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3107' }, body: JSON.stringify(input) }));
      assert.equal(response.status, httpStatus);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.match(response.headers.get('x-request-id'), /^[a-f0-9-]{36}$/);
      assert.deepEqual(Object.keys(await response.json()).sort(), ['delivered', 'message', 'status', 'verified']);
    }
  } finally { newsletterService.subscribe = original; setNewsletterService(null); }
});
