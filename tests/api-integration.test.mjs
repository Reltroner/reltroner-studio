import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createResendContractAdapter } from '../lib/newsletter/resend.server.ts';
import { newsletterService } from '../lib/newsletter/service.ts';
import { contactService } from '../lib/contact/service.ts';
import { getConfiguredAssistantProvider } from '../lib/assistant/provider.server.ts';
import * as newsletterRoute from '../app/api/newsletter/route.ts';
import * as contactRoute from '../app/api/contact/route.ts';
import { GET as assistantAvailability } from '../app/api/assistant/route.ts';

const email = 'synthetic@example.test';
const key = 're_rc_api_01_synthetic_fixture_key';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const segmentId = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const input = { email, consent: true, source: 'website-newsletter' };
const inquiry = { intent: 'creative', name: 'Synthetic Fixture', email, message: 'Synthetic contract verification; never deliver this message.', privacyAcknowledged: true, website: '' };
const contact = (overrides = {}) => ({ object: 'contact', id: contactId, email, unsubscribed: false, ...overrides });
const membership = (overrides = {}) => ({ object: 'list', data: [{ id: segmentId }], has_more: false, ...overrides });
const json = (body, status = 200) => Response.json(body, { status });
const notFound = () => json({ name: 'not_found', message: 'Contact not found.' }, 404);
const successSteps = (address = email) => [notFound(), json({ object: 'contact', id: contactId }), json(contact({ email: address })), json(membership())];

let outboundAttempts = 0;
const originalFetch = globalThis.fetch;
before(() => {
  globalThis.fetch = async () => { outboundAttempts++; throw new Error('Unapproved outbound request prohibited'); };
});
after(() => {
  globalThis.fetch = originalFetch;
  assert.equal(outboundAttempts, 0, 'Every provider outcome must use injected synthetic fixtures');
});

function fixture(steps, options = {}) {
  const requests = [];
  const diagnostics = [];
  const transport = async (request) => {
    requests.push(request);
    const step = steps.shift();
    assert.ok(step, 'Unexpected provider operation');
    return typeof step === 'function' ? step(request) : step;
  };
  const adapter = createResendContractAdapter({ mode: 'contract-test', transport, apiKey: key, segmentId, diagnostic: event => diagnostics.push(event), ...options });
  return { adapter, requests, diagnostics };
}

test('mocked Resend acceptance requires persisted active contact and segment membership; delivery and verification stay false', async () => {
  const { adapter, requests, diagnostics } = fixture(successSteps());
  const result = await adapter.subscribe({ ...input, email: ' Synthetic@Example.test ' }, 'local-prototype');
  assert.deepEqual(Object.keys(result).sort(), ['delivered', 'message', 'status', 'verified']);
  assert.equal(result.status, 'accepted');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.deepEqual(requests.map(request => [request.method, new URL(request.url).pathname]), [
    ['GET', '/contacts/synthetic%40example.test'], ['POST', '/contacts'], ['GET', `/contacts/${contactId}`], ['GET', `/contacts/${contactId}/segments`],
  ]);
  assert.deepEqual(await requests[1].json(), { email, segments: [{ id: segmentId }] });
  for (const request of requests) {
    assert.equal(new URL(request.url).origin, 'https://api.resend.com');
    assert.equal(request.headers.get('authorization'), `Bearer ${key}`);
    assert.equal(request.headers.get('idempotency-key'), null, 'Undocumented contacts idempotency is never assumed');
    assert.equal(request.redirect, 'error');
    assert.equal(request.cache, 'no-store');
    assert.equal(request.signal.aborted, true);
  }
  assert.match(diagnostics[0].requestId, /^[a-f0-9-]{36}$/);
  assert.equal(diagnostics[0].outcome, 'accepted');
});

test('invalid input and absent/invalid configuration never reach any provider', async () => {
  const { adapter, requests } = fixture([]);
  for (const value of [null, [], {}, { ...input, consent: false }, { ...input, email: 'bad' }, { ...input, email: 'bad\u0000@example.test' }, { ...input, email: 'a'.repeat(255) + '@example.test' }]) {
    assert.equal((await adapter.subscribe(value, 'fixture')).status, 'invalid');
  }
  assert.equal(requests.length, 0);
  const config = { mode: 'contract-test', apiKey: key, segmentId, transport: async () => { throw new Error('Must not run'); } };
  for (const value of [undefined, {}, { ...config, mode: 'live' }, { ...config, apiKey: '' }, { ...config, apiKey: 'YOUR_RESEND_API_KEY' }, { ...config, apiKey: key + '\n' }, { ...config, segmentId: 'unknown' }, { ...config, transport: globalThis.fetch }, { ...config, timeoutMilliseconds: 10000 }, { ...config, maxProviderRequestsPerWindow: 0 }, { ...config, windowMilliseconds: 0 }]) {
    assert.equal((await createResendContractAdapter(value).subscribe(input, 'fixture')).status, 'rejected');
  }
});

test('production refuses the rehearsal adapter even with a fully supplied test configuration', async () => {
  const old = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    const { adapter, requests } = fixture([]);
    assert.equal((await adapter.subscribe(input, 'fixture')).status, 'rejected');
    assert.equal(requests.length, 0);
  } finally { if (old === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = old; }
});

test('provider rejection, rate limit and outage are safe failures without retries', async () => {
  for (const [httpStatus, outcome, status] of [[401, 'rejected', 'rejected'], [422, 'rejected', 'rejected'], [429, 'rate_limited', 'quota-error'], [503, 'unavailable', 'network-error']]) {
    const { adapter, requests, diagnostics } = fixture([json({ message: `${key} ${email}` }, httpStatus)]);
    const result = await adapter.subscribe(input, 'fixture');
    assert.equal(result.status, status);
    assert.equal(diagnostics[0].outcome, outcome);
    assert.equal(requests.length, 1);
    assert.equal(result.delivered, false);
    assert.equal(result.verified, false);
    assert.equal(JSON.stringify([result, diagnostics]).includes(key), false);
    assert.equal(JSON.stringify([result, diagnostics]).includes(email), false);
  }
});

test('network failure and timeout are distinguished in diagnostics, and timeout also bounds a transport that ignores abort', async () => {
  const cases = [
    { step: () => { throw new Error(`${key} ${email}`); }, outcome: 'network' },
    { step: () => new Promise(() => {}), outcome: 'timeout' },
    { step: () => new Response(new ReadableStream({ start() {} }), { headers: { 'Content-Type': 'application/json' } }), outcome: 'timeout' },
  ];
  for (const { step, outcome } of cases) {
    const { adapter, requests, diagnostics } = fixture([step], { timeoutMilliseconds: 20 });
    const result = await adapter.subscribe(input, 'fixture');
    assert.equal(result.status, 'network-error');
    assert.equal(diagnostics[0].outcome, outcome);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].signal.aborted, true);
    assert.equal(JSON.stringify([result, diagnostics]).includes(key), false);
  }
});

test('malformed, oversized, redirected and untyped provider responses never count as a missing contact or acceptance', async () => {
  const responses = [json(null), json([]), json({}), json({ name: 'not_found' }), json({ message: 'missing' }, 404), new Response('{bad', { headers: { 'Content-Type': 'application/json' } }),
    new Response('<html>not found</html>', { status: 404, headers: { 'Content-Type': 'text/html' } }), json({ padding: 'x'.repeat(17000) }),
    json({ object: 'contact', id: contactId }), json(contact({ email: 'someone-else@example.test' })), json(contact({ unsubscribed: 'false' })),
    new Response('{}', { status: 302, headers: { 'Content-Type': 'application/json', Location: 'https://unapproved.example.test' } }),
  ];
  for (const response of responses) {
    const { adapter, requests } = fixture([response]);
    assert.equal((await adapter.subscribe(input, 'fixture')).status, 'rejected');
    assert.equal(requests.length, 1, 'A malformed read never authorizes a mutation');
  }
});

test('existing unsubscribed contacts are never reactivated; active contacts must already belong to the chosen segment', async () => {
  const suppressed = fixture([json(contact({ unsubscribed: true }))]);
  assert.equal((await suppressed.adapter.subscribe(input, 'fixture')).status, 'rejected');
  assert.equal(suppressed.diagnostics[0].outcome, 'suppressed');
  assert.equal(suppressed.requests.length, 1);
  const outside = fixture([json(contact()), json(membership({ data: [] }))]);
  assert.equal((await outside.adapter.subscribe(input, 'fixture')).status, 'rejected');
  assert.equal(outside.diagnostics[0].outcome, 'preferences');
  const existing = fixture([json(contact()), json(membership())]);
  assert.equal((await existing.adapter.subscribe(input, 'fixture')).status, 'duplicate');
  assert.equal(existing.requests.every(request => request.method === 'GET'), true);
});

test('a successful creation response alone, missing segment, changed suppression or wrong contact ID never proves subscription', async () => {
  for (const remaining of [
    [json(contact({ unsubscribed: true }))], [json(contact({ id: segmentId }))], [json(contact()), json(membership({ data: [] }))],
    [json(contact()), json(membership({ data: [], has_more: true }))], [json(contact()), json(membership({ data: [null] }))],
    [json(contact()), json({ success: true })], [json({})], [json({ message: 'uncertain' }, 503)],
  ]) {
    const { adapter, requests } = fixture([notFound(), json({ object: 'contact', id: contactId }), ...remaining]);
    const result = await adapter.subscribe(input, 'fixture');
    assert.equal(result.status, 'rejected');
    assert.equal(result.delivered, false);
    assert.equal(result.verified, false);
    assert.equal(requests.filter(request => request.method === 'POST').length, 1);
  }
});

test('malformed creation acknowledgments and explicit mutation failures cannot become subscription success', async () => {
  for (const response of [json({ success: true }), json({ object: 'contact', id: 'invalid' }), json({ error: 'fixture rejection' }, 422), json({ message: 'ambiguous mutation' }, 503)]) {
    const { adapter, requests } = fixture([notFound(), response]);
    const result = await adapter.subscribe(input, 'fixture');
    assert.equal(result.status, 'rejected');
    assert.equal(requests.length, 2);
    assert.equal(result.delivered, false);
    assert.equal(result.verified, false);
  }
});

test('concurrent and repeated submissions coalesce without duplicate mutation or welcome email', async () => {
  const { adapter, requests } = fixture(successSteps());
  const results = await Promise.all([adapter.subscribe(input, 'first'), adapter.subscribe(input, 'second')]);
  assert.deepEqual(results.map(result => result.status), ['accepted', 'duplicate']);
  results[0].status = 'rejected'; // A caller cannot corrupt the cached normalized result.
  assert.equal((await adapter.subscribe(input, 'third')).status, 'duplicate');
  assert.equal(requests.length, 4);
  assert.equal(requests.filter(request => request.method === 'POST').length, 1);
  assert.equal(requests.some(request => new URL(request.url).pathname === '/emails'), false);
});

test('the prototype constant idempotency argument cannot collapse two different subscriber payloads', async () => {
  const other = 'other-synthetic@example.test';
  const { adapter, requests } = fixture([...successSteps(), ...successSteps(other)]);
  assert.equal((await adapter.subscribe(input, 'local-prototype')).status, 'accepted');
  assert.equal((await adapter.subscribe({ ...input, email: other }, 'local-prototype')).status, 'accepted');
  assert.equal(requests.filter(request => request.method === 'POST').length, 2);
});

test('indeterminate mutations are not automatically retried by duplicate requests', async () => {
  const { adapter, requests, diagnostics } = fixture([notFound(), () => { throw new Error('Network closed after possible mutation'); }]);
  const first = await adapter.subscribe(input, 'fixture');
  const second = await adapter.subscribe(input, 'fixture');
  assert.equal(first.status, 'network-error');
  assert.deepEqual(second, first);
  assert.match(first.message, /could not be confirmed/);
  assert.equal(diagnostics[0].outcome, 'network');
  assert.equal(requests.length, 2);
});

test('local mock budget counts actual provider operations and expires predictably; never claims a durable global quota', async () => {
  let time = 100;
  const { adapter, requests, diagnostics } = fixture([notFound(), notFound()], { maxProviderRequestsPerWindow: 1, windowMilliseconds: 1000, now: () => time });
  assert.equal((await adapter.subscribe(input, 'fixture')).status, 'quota-error');
  assert.equal(diagnostics[0].outcome, 'quota');
  assert.equal(requests.length, 1);
  assert.equal((await adapter.subscribe(input, 'fixture')).status, 'quota-error');
  assert.equal(requests.length, 1);
  time = 1100;
  // A different normalized payload can use the new quota window.
  assert.equal((await adapter.subscribe({ ...input, email: 'next@example.test' }, 'fixture')).status, 'quota-error');
  assert.equal(requests.length, 2);
});

test('an expired transport cannot continue with a late mutation after timeout', async () => {
  let release;
  const { adapter, requests } = fixture([() => new Promise(resolve => { release = resolve; })], { timeoutMilliseconds: 10 });
  assert.equal((await adapter.subscribe(input, 'fixture')).status, 'network-error');
  release(notFound());
  await new Promise(resolve => setTimeout(resolve, 20));
  assert.equal(requests.length, 1);
});

test('diagnostic sink failures cannot change the confirmed outcome or expose arbitrary provider fields', async () => {
  const { adapter } = fixture(successSteps(), { diagnostic: () => { throw new Error('Diagnostic sink unavailable'); } });
  assert.equal((await adapter.subscribe(input, 'fixture')).status, 'accepted');
});

function apiRequest(path, body, headers = {}) {
  return new Request(`http://localhost:3107/api/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3107', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}

test('existing form endpoints preserve their exact prototype response and method exports; no provider is activated', async () => {
  assert.deepEqual(Object.keys(newsletterRoute), ['POST']);
  assert.deepEqual(Object.keys(contactRoute), ['POST']);
  const newsletter = await newsletterRoute.POST(apiRequest('newsletter', input));
  assert.equal(newsletter.status, 200);
  assert.equal(newsletter.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await newsletter.json(), await newsletterService.subscribe(input, 'fixture'));
  const contactResponse = await contactRoute.POST(apiRequest('contact', inquiry));
  assert.equal(contactResponse.status, 200);
  assert.equal(contactResponse.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await contactResponse.json(), await contactService.submit(inquiry));
  assert.equal(getConfiguredAssistantProvider(), null);
  assert.equal((await (await assistantAvailability()).json()).available, false);
});

test('existing form endpoint validation/error schemas and HTTP statuses remain compatible', async () => {
  for (const [path, handler, body] of [['newsletter', newsletterRoute.POST, input], ['contact', contactRoute.POST, inquiry]]) {
    for (const [value, headers, httpStatus, status] of [
      [{}, {}, 422, 'invalid'], ['{bad', {}, 400, 'rejected'], [body, { Origin: 'https://unapproved.example.test' }, 403, 'rejected'],
      [body, { 'Sec-Fetch-Site': 'cross-site' }, 403, 'rejected'], [body, { 'Content-Type': 'text/plain' }, 400, 'rejected'],
      ['x'.repeat(12001), {}, 400, 'rejected'], [body, { 'Content-Length': '12001' }, 400, 'rejected'],
    ]) {
      const response = await handler(apiRequest(path, value, headers));
      const result = await response.json();
      assert.equal(response.status, httpStatus);
      assert.deepEqual(Object.keys(result).sort(), ['message', 'status']);
      assert.equal(result.status, status);
      assert.equal(typeof result.message, 'string');
      assert.equal(JSON.stringify(result).includes(email), false);
    }
  }
});

test('credentials and provider-like environment flags cannot activate any current runtime service', async () => {
  const vars = { RESEND_API_KEY: key, RESEND_SEGMENT_ID: segmentId, WEB3FORMS_ACCESS_KEY: 'synthetic-only', NEWSLETTER_PROVIDER: 'resend', CONTACT_PROVIDER: 'web3forms', ASSISTANT_PROVIDER: 'unapproved' };
  const old = Object.fromEntries(Object.keys(vars).map(name => [name, process.env[name]]));
  try {
    Object.assign(process.env, vars);
    assert.equal((await newsletterService.subscribe(input, 'fixture')).status, 'prototype');
    assert.equal((await contactService.submit(inquiry)).status, 'prototype');
    assert.equal(getConfiguredAssistantProvider(), null);
    assert.equal((await newsletterService.unsubscribe('synthetic-token')).status, 'prototype');
    const { adapter, requests } = fixture([]);
    assert.equal((await adapter.unsubscribe('synthetic-token')).status, 'prototype');
    assert.equal(requests.length, 0);
  } finally {
    for (const name of Object.keys(vars)) { if (old[name] === undefined) delete process.env[name]; else process.env[name] = old[name]; }
  }
});
