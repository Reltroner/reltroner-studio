import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyCloudflareNewsletterActivation,
  createCloudflareNewsletterService,
  handleNewsletterRequest,
  POST,
  setNewsletterService,
} from '../functions/api/newsletter.ts';
import { createResendNewsletterProvider } from '../lib/newsletter/resend-provider.ts';

const email = 'synthetic-cf@example.test';
const apiKey = 're_synthetic_cf_valid_key_1234567890';
const segmentId = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const input = { email, consent: true, source: 'website-newsletter' };

const json = (body, status = 200) => Response.json(body, { status });
const notFound = () => json({ name: 'not_found', message: 'Contact not found.' }, 404);
const contact = (overrides = {}) => ({
  object: 'contact',
  id: contactId,
  email,
  unsubscribed: false,
  ...overrides,
});
const memberList = (hasMember = true) =>
  json({
    object: 'list',
    data: hasMember ? [{ id: segmentId }] : [],
    has_more: false,
  });

let outbound = 0;
const originalFetch = globalThis.fetch;
before(() => {
  globalThis.fetch = async () => {
    outbound++;
    throw new Error('Live network strictly forbidden during tests');
  };
});
after(() => {
  globalThis.fetch = originalFetch;
  assert.equal(outbound, 0, 'Zero real network calls permitted');
});

function mockTransport(steps) {
  const requests = [];
  const transport = async (request) => {
    requests.push(request);
    const step = steps.shift();
    assert.ok(step, `Unexpected provider operation #${requests.length} for ${request.method} ${request.url}`);
    return typeof step === 'function' ? step(request) : step;
  };
  return { transport, requests };
}

const verifiedEnv = {
  RESEND_API_KEY: apiKey,
  RESEND_SEGMENT_ID: segmentId,
  RESEND_NEWSLETTER_ENABLED: 'true',
  CLOUDFLARE_WAF_PROTECTION_VERIFIED: 'true',
  RESEND_HARD_STOP_VERIFIED: 'true',
  RESEND_UNSUBSCRIBE_VERIFIED: 'true',
};

// ---------------------------------------------------------------------------
// 1. Activation Gate & Cloudflare Free WAF Rule Accounting Tests
// ---------------------------------------------------------------------------

test('activation check fails closed when RESEND_NEWSLETTER_ENABLED is not exact true', () => {
  for (const flag of [undefined, '', 'false', '0', 'TRUE', 'yes']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, RESEND_NEWSLETTER_ENABLED: flag });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'DISABLED');
  }
});

test('activation check fails closed on missing or invalid API keys', () => {
  for (const key of ['', 'invalid_prefix', 're_short', 're_placeholder_12345678', 're_your_api_key_12345678', 're_changeme_12345678']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, RESEND_API_KEY: key });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'INVALID_API_KEY');
  }
});

test('activation check fails closed on missing or invalid segment UUIDs', () => {
  for (const seg of ['', 'not-a-uuid', '12345', '78261eea-8f8b-4381-83c6']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, RESEND_SEGMENT_ID: seg });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'INVALID_SEGMENT_ID');
  }
});

test('activation check fails closed when request host is *.pages.dev (custom domain WAF does not protect pages.dev)', () => {
  const pagesReq = new Request('https://preview-123.reltroner-studio.pages.dev/api/newsletter', {
    headers: { host: 'preview-123.reltroner-studio.pages.dev' },
  });
  const res = verifyCloudflareNewsletterActivation(verifiedEnv, pagesReq);
  assert.equal(res.ok, false);
  assert.equal(res.reason, 'PAGES_DEV_UNPROTECTED');
});

test('activation check fails closed when Cloudflare WAF rule reltroner-newsletter-protection is unverified or disabled', () => {
  for (const flag of [undefined, '', 'false', '0']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, CLOUDFLARE_WAF_PROTECTION_VERIFIED: flag });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'WAF_PROTECTION_UNVERIFIED');
  }
});

test('activation check fails closed when Resend Free hard stop / paid overages are unverified', () => {
  for (const flag of [undefined, '', 'false', '0']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, RESEND_HARD_STOP_VERIFIED: flag });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'RESEND_HARD_STOP_UNVERIFIED');
  }
});

test('activation check fails closed when Resend Broadcast unsubscribe workflow is unverified', () => {
  for (const flag of [undefined, '', 'false', '0']) {
    const res = verifyCloudflareNewsletterActivation({ ...verifiedEnv, RESEND_UNSUBSCRIBE_VERIFIED: flag });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'UNSUBSCRIBE_UNVERIFIED');
  }
});

test('activation check passes only on custom domain with all gates explicitly verified', () => {
  const customReq = new Request('https://www.reltroner.com/api/newsletter', {
    headers: { host: 'www.reltroner.com' },
  });
  const res = verifyCloudflareNewsletterActivation(verifiedEnv, customReq);
  assert.equal(res.ok, true);
});

// ---------------------------------------------------------------------------
// 2. Cloudflare Service Factory Fail-Closed Behavior
// ---------------------------------------------------------------------------

test('createCloudflareNewsletterService returns prototype response when disabled without provider calls', async () => {
  const { transport, requests } = mockTransport([]);
  const service = createCloudflareNewsletterService({ RESEND_NEWSLETTER_ENABLED: 'false' }, undefined, { transport });
  const result = await service.subscribe(input, 'test-req-1');
  assert.equal(result.status, 'prototype');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.ok(result.message.includes('Local prototype'));
  assert.equal(requests.length, 0);

  const unsub = await service.unsubscribe('any-token');
  assert.equal(unsub.status, 'prototype');
  assert.equal(requests.length, 0);
});

test('createCloudflareNewsletterService fails closed with rejected status when enabled but unverified', async () => {
  const { transport, requests } = mockTransport([]);
  const unverified = {
    RESEND_API_KEY: apiKey,
    RESEND_SEGMENT_ID: segmentId,
    RESEND_NEWSLETTER_ENABLED: 'true',
    CLOUDFLARE_WAF_PROTECTION_VERIFIED: 'false', // Unverified WAF
  };
  const service = createCloudflareNewsletterService(unverified, undefined, { transport });
  const result = await service.subscribe(input, 'test-req-2');
  assert.equal(result.status, 'rejected');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.ok(result.message.includes('Newsletter provider configuration or approved abuse controls are unavailable'));
  assert.equal(requests.length, 0);
});

// ---------------------------------------------------------------------------
// 3. Deterministic Resend Contacts/Segments Provider Workflows
// ---------------------------------------------------------------------------

test('deterministic workflow: new subscriber creates contact and verifies segment membership; zero emails sent', async () => {
  const steps = [
    notFound(), // 1. GET /contacts/email -> 404 not found
    json({ object: 'contact', id: contactId }, 201), // 2. POST /contacts -> 201 created
    json(contact()), // 3. GET /contacts/:id -> active contact
    memberList(true), // 4. GET /contacts/:id/segments -> member confirmed
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-new-sub');
  assert.equal(result.status, 'accepted');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.equal(result.message, 'Your subscription was saved in Resend. No email was sent.');

  assert.equal(requests.length, 4);
  assert.equal(requests[0].method, 'GET');
  assert.equal(new URL(requests[0].url).pathname, `/contacts/${encodeURIComponent(email)}`);
  assert.equal(requests[1].method, 'POST');
  assert.equal(new URL(requests[1].url).pathname, '/contacts');
  assert.deepEqual(await requests[1].json(), { email, segments: [{ id: segmentId }] });
  assert.equal(requests[2].method, 'GET');
  assert.equal(new URL(requests[2].url).pathname, `/contacts/${contactId}`);
  assert.equal(requests[3].method, 'GET');
  assert.equal(new URL(requests[3].url).pathname, `/contacts/${contactId}/segments`);

  // Ensure no /emails or /broadcasts was called
  for (const r of requests) {
    assert.ok(!r.url.includes('/emails') && !r.url.includes('/broadcasts'));
  }
});

test('deterministic workflow: existing active segment member is deduplicated without mutation', async () => {
  const steps = [
    json(contact()), // 1. GET /contacts/email -> active contact
    memberList(true), // 2. GET /contacts/:id/segments -> already in segment
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-dup');
  assert.equal(result.status, 'duplicate');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.ok(result.message.includes('already on the Studio newsletter list'));

  assert.equal(requests.length, 2);
  assert.equal(requests[0].method, 'GET');
  assert.equal(requests[1].method, 'GET');
  // Zero POST/mutation operations performed
  assert.ok(requests.every((r) => r.method === 'GET'));
});

test('deterministic workflow: existing contact not in segment is added with readback verification', async () => {
  const steps = [
    json(contact()), // 1. GET /contacts/email -> active contact
    memberList(false), // 2. GET /contacts/:id/segments -> not in segment
    json({ id: segmentId }), // 3. POST /contacts/:id/segments/:segmentId -> added
    json(contact()), // 4. GET /contacts/:id -> readback active
    memberList(true), // 5. GET /contacts/:id/segments -> confirmed member
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-add-seg');
  assert.equal(result.status, 'accepted');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.equal(requests.length, 5);
  assert.equal(requests[2].method, 'POST');
  assert.equal(new URL(requests[2].url).pathname, `/contacts/${contactId}/segments/${segmentId}`);
});

test('deterministic workflow: suppressed contact (unsubscribed: true) fails closed without mutation', async () => {
  const steps = [
    json(contact({ unsubscribed: true })), // 1. GET /contacts/email -> suppressed contact
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-suppressed');
  assert.equal(result.status, 'rejected');
  assert.equal(result.delivered, false);
  assert.equal(result.verified, false);
  assert.ok(result.message.includes('Existing subscription preferences require review'));
  assert.equal(requests.length, 1);
  assert.equal(requests[0].method, 'GET'); // Never attempted POST
});

test('deterministic workflow: contact creation 409 conflict reconciles against concurrent signup', async () => {
  const steps = [
    notFound(), // 1. GET /contacts/email -> not found
    json({ name: 'conflict' }, 409), // 2. POST /contacts -> 409 conflict
    json(contact()), // 3. GET /contacts/email -> re-read reveals contact
    memberList(true), // 4. GET /contacts/:id/segments -> member confirmed
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-conflict');
  assert.equal(result.status, 'duplicate');
  assert.equal(requests.length, 4);
});

test('deterministic workflow: provider 429 quota error maps directly to quota-error (HTTP 429)', async () => {
  const steps = [
    json({ name: 'rate_limit_exceeded', message: 'Too many requests' }, 429),
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
  });

  const result = await service.subscribe(input, 'req-429');
  assert.equal(result.status, 'quota-error');
  assert.equal(requests.length, 1);
});

test('deterministic workflow: timeout aborts and maps to network-error (HTTP 503) without retry', async () => {
  const steps = [
    () => new Promise((resolve) => setTimeout(resolve, 50)),
  ];
  const { transport, requests } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
    timeoutMilliseconds: 10,
  });

  const result = await service.subscribe(input, 'req-timeout');
  assert.equal(result.status, 'network-error');
  assert.equal(requests.length, 1);
});

test('diagnostic event never leaks sensitive credentials, contact IDs, or user emails', async () => {
  const diagnostics = [];
  const steps = [
    notFound(),
    json({ object: 'contact', id: contactId }, 201),
    json(contact()),
    memberList(true),
  ];
  const { transport } = mockTransport(steps);
  const service = createResendNewsletterProvider({
    apiKey,
    segmentId,
    edgeProtection: 'cloudflare-waf',
    transport,
    diagnostic: (event) => diagnostics.push(event),
  });

  const diagUUID = '87654321-4321-4321-4321-210987654321';
  await service.subscribe(input, diagUUID);
  assert.equal(diagnostics.length, 1);
  const diag = diagnostics[0];
  assert.equal(diag.scope, 'newsletter');
  assert.equal(diag.requestId, diagUUID);
  assert.equal(diag.outcome, 'accepted');
  assert.equal(diag.mutationAttempted, true);

  const serialized = JSON.stringify(diag);
  assert.ok(!serialized.includes(email), 'Email must not be in diagnostic');
  assert.ok(!serialized.includes(apiKey), 'API key must not be in diagnostic');
  assert.ok(!serialized.includes(contactId), 'Contact ID must not be in diagnostic');
});

// ---------------------------------------------------------------------------
// 4. Route Handler Contract & Status Mapping Tests
// ---------------------------------------------------------------------------

function apiReq(body, headers = {}) {
  return new Request('https://www.reltroner.com/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://www.reltroner.com',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('route handler enforces same-origin browser requests (missing / cross-origin returns 403)', async () => {
  for (const headers of [
    { Origin: '' },
    { Origin: 'https://untrusted.test' },
    { Origin: 'null' },
    { Origin: 'https://www.reltroner.com', 'Sec-Fetch-Site': 'cross-site' },
  ]) {
    const req = new Request('https://www.reltroner.com/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(input),
    });
    const res = await POST(req);
    assert.equal(res.status, 403);
    const body = await res.json();
    assert.equal(body.status, 'rejected');
  }
});

test('route handler rejects malformed, oversized (>12KB), and non-JSON requests with 400', async () => {
  for (const [body, headers] of [
    ['{not-valid-json', {}],
    ['x'.repeat(12001), {}],
    [JSON.stringify(input), { 'Content-Type': 'application/jsonp' }],
    [JSON.stringify(input), { 'Content-Length': '12001' }],
  ]) {
    const res = await POST(apiReq(body, headers));
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.status, 'rejected');
  }
});

test('route handler rejects invalid consent with 422', async () => {
  const res = await POST(apiReq({ email, consent: false }));
  assert.equal(res.status, 422);
  const data = await res.json();
  assert.equal(data.status, 'invalid');
});

test('route handler maps provider outcomes to exact HTTP statuses and response schema', async () => {
  const mockService = {
    provider: 'resend',
    async subscribe(_in, _id) {
      return { status: 'accepted', message: 'Accepted msg', delivered: false, verified: false };
    },
    async unsubscribe() {
      return { status: 'rejected', message: 'Rejected msg', delivered: false, verified: false };
    },
  };

  for (const [status, expectedHttp] of [
    ['accepted', 200],
    ['duplicate', 200],
    ['prototype', 200],
    ['quota-error', 429],
    ['network-error', 503],
    ['rejected', 502],
    ['invalid', 422],
  ]) {
    mockService.subscribe = async () => ({
      status,
      message: `Status is ${status}`,
      delivered: false,
      verified: false,
    });
    setNewsletterService(mockService);
    try {
      const res = await POST(apiReq(input));
      assert.equal(res.status, expectedHttp);
      assert.equal(res.headers.get('cache-control'), 'no-store');
      assert.match(res.headers.get('x-request-id'), /^[a-f0-9-]{36}$/);
      const data = await res.json();
      assert.deepEqual(Object.keys(data).sort(), ['delivered', 'message', 'status', 'verified']);
      assert.equal(data.status, status);
    } finally {
      setNewsletterService(null);
    }
  }
});

test('route handler rejects GET and PUT with 405 Method Not Allowed and Allow: POST header', async () => {
  const getReq = new Request('https://www.reltroner.com/api/newsletter', { method: 'GET' });
  const getRes = await handleNewsletterRequest(getReq, {
    provider: 'resend',
    subscribe: async () => ({ status: 'prototype', message: 'ok', delivered: false, verified: false }),
    unsubscribe: async () => ({ status: 'prototype', message: 'ok', delivered: false, verified: false }),
  });
  // handleNewsletterRequest is called for POST in onRequest; for non-POST onRequest returns 405
  const { onRequest } = await import('../functions/api/newsletter.ts');
  const context = { request: getReq, env: verifiedEnv };
  const res = await onRequest(context);
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'POST');
});

test('Pages hostname behavior: any *.pages.dev subdomain or host variation fails closed before transport', () => {
  for (const host of [
    'preview.reltroner-studio.pages.dev',
    'pr-12.reltroner-studio.pages.dev:443',
    'branch-name.pages.dev',
  ]) {
    const req1 = new Request(`https://${host}/api/newsletter`);
    assert.equal(verifyCloudflareNewsletterActivation(verifiedEnv, req1).ok, false);
    assert.equal(verifyCloudflareNewsletterActivation(verifiedEnv, req1).reason, 'PAGES_DEV_UNPROTECTED');

    const req2 = new Request('https://www.reltroner.com/api/newsletter', { headers: { host } });
    assert.equal(verifyCloudflareNewsletterActivation(verifiedEnv, req2).ok, false);
    assert.equal(verifyCloudflareNewsletterActivation(verifiedEnv, req2).reason, 'PAGES_DEV_UNPROTECTED');
  }
});

test('enabled-mode preview consistency: *.pages.dev request to onRequestPost fails closed without calling Resend', async () => {
  const { onRequestPost } = await import('../functions/api/newsletter.ts');
  const pagesReq = new Request('https://preview.reltroner-studio.pages.dev/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://preview.reltroner-studio.pages.dev',
      Host: 'preview.reltroner-studio.pages.dev',
    },
    body: JSON.stringify(input),
  });
  const res = await onRequestPost({ request: pagesReq, env: verifiedEnv });
  assert.equal(res.status, 502);
  const data = await res.json();
  assert.equal(data.status, 'rejected');
  assert.equal(data.delivered, false);
  assert.equal(data.verified, false);
});

test('disabled mode consistency: disabled env returns prototype response without network calls', async () => {
  const { onRequestPost } = await import('../functions/api/newsletter.ts');
  const req = new Request('https://www.reltroner.com/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://www.reltroner.com',
    },
    body: JSON.stringify(input),
  });
  const res = await onRequestPost({ request: req, env: { RESEND_NEWSLETTER_ENABLED: 'false' } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'prototype');
  assert.equal(data.delivered, false);
  assert.equal(data.verified, false);
});

test('arbitrary custom hostnames cannot activate Resend and fail closed before transport', async () => {
  const { onRequestPost } = await import('../functions/api/newsletter.ts');
  for (const badHost of [
    'evil-domain.com',
    'staging.reltroner.com',
    'unauthorized.com',
    'reltroner.org',
  ]) {
    const req = new Request(`https://${badHost}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: `https://${badHost}`,
        Host: badHost,
      },
      body: JSON.stringify(input),
    });
    const check = verifyCloudflareNewsletterActivation(verifiedEnv, req);
    assert.equal(check.ok, false);
    assert.equal(check.reason, 'UNAUTHORIZED_HOSTNAME');

    const res = await onRequestPost({ request: req, env: verifiedEnv });
    assert.equal(res.status, 502);
    const data = await res.json();
    assert.equal(data.status, 'rejected');
  }
});

test('host mismatch between request.url and Host header fails closed', () => {
  const spoofReq = new Request('https://www.reltroner.com/api/newsletter', {
    headers: { host: 'evil-spoof.com' },
  });
  const check = verifyCloudflareNewsletterActivation(verifiedEnv, spoofReq);
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'UNAUTHORIZED_HOSTNAME');
});

test('server-side activation calculation logic produces a strict serializable boolean', () => {
  const computeActivation = (env) =>
    env.RESEND_NEWSLETTER_ENABLED === 'true' &&
    env.CLOUDFLARE_WAF_PROTECTION_VERIFIED === 'true' &&
    env.RESEND_HARD_STOP_VERIFIED === 'true' &&
    env.RESEND_UNSUBSCRIBE_VERIFIED === 'true';

  assert.equal(computeActivation(verifiedEnv), true);
  for (const key of [
    'RESEND_NEWSLETTER_ENABLED',
    'CLOUDFLARE_WAF_PROTECTION_VERIFIED',
    'RESEND_HARD_STOP_VERIFIED',
    'RESEND_UNSUBSCRIBE_VERIFIED',
  ]) {
    assert.equal(computeActivation({ ...verifiedEnv, [key]: 'false' }), false);
    assert.equal(computeActivation({ ...verifiedEnv, [key]: undefined }), false);
  }
});

const diagnosticKeys = ['scope', 'requestId', 'stage', 'operation', 'requestConstructed', 'fetchEntered',
  'providerHttpStatus', 'errorCategory', 'mutationAttempted', 'evidenceConfirmed', 'outcome'].sort();
const requestUUID = '87654321-4321-4321-4321-210987654321';
const unsafeMarker = `${email}|${apiKey}|${contactId}|${segmentId}|https://api.resend.com/private|Authorization|private-body|private-hmac`;

async function diagnosticWorkflow(steps, options = {}) {
  const { flag, ...overrides } = { flag: 'true', ...options };
  const diagnostics = [];
  const { transport, requests } = mockTransport([...steps]);
  const request = apiReq(input);
  const service = createCloudflareNewsletterService(
    { ...verifiedEnv, NEWSLETTER_DIAGNOSTICS_ENABLED: flag }, request,
    { transport, diagnostic: event => diagnostics.push(event), ...overrides }
  );
  const response = await handleNewsletterRequest(request, service);
  const body = await response.json();
  assert.deepEqual(Object.keys(body).sort(), ['delivered', 'message', 'status', 'verified']);
  const publicMessages = {
    accepted: 'Your subscription was saved in Resend. No email was sent.',
    duplicate: 'Resend confirms this address is already on the Studio newsletter list. No email was sent.',
    'quota-error': 'The newsletter request limit was reached. Subscription acceptance is not confirmed.',
    rejected: 'Subscription acceptance could not be confirmed. Check your preferences before retrying.',
    'network-error': 'Subscription acceptance could not be confirmed. Check your preferences before retrying.',
  };
  assert.equal(body.message, publicMessages[body.status]);
  assert.equal(body.delivered, false);
  assert.equal(body.verified, false);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('x-request-id'), /^[a-f0-9-]{36}$/);
  for (const event of diagnostics) {
    assert.deepEqual(Object.keys(event).sort(), diagnosticKeys);
    assert.equal(event.requestId, response.headers.get('x-request-id'));
    assert.ok(Object.isFrozen(event));
    const serialized = JSON.stringify(event);
    for (const secret of unsafeMarker.split('|')) assert.equal(serialized.includes(secret), false);
    assert.equal(event.providerHttpStatus === null || (Number.isInteger(event.providerHttpStatus) && event.providerHttpStatus >= 100 && event.providerHttpStatus <= 599), true);
  }
  return { diagnostics, requests, body, status: response.status };
}

test('R4 diagnostics default off and require exact string true without changing the public contract', async () => {
  for (const flag of [undefined, '', 'false', 'TRUE', '1', true]) {
    const run = await diagnosticWorkflow([json(contact()), memberList()], { flag });
    assert.equal(run.diagnostics.length, 0);
    assert.equal(run.body.status, 'duplicate');
    assert.equal(run.requests.length, 2);
  }
});

test('R4 enabled route emits one structured console record correlated with X-Request-Id', async (t) => {
  const logs = [];
  t.mock.method(console, 'log', value => logs.push(value));
  const { transport } = mockTransport([json(contact()), memberList()]);
  const request = apiReq(input);
  const service = createCloudflareNewsletterService({ ...verifiedEnv, NEWSLETTER_DIAGNOSTICS_ENABLED: 'true' }, request, { transport });
  const response = await handleNewsletterRequest(request, service);
  assert.equal(logs.length, 1);
  const event = JSON.parse(logs[0]);
  assert.deepEqual(Object.keys(event).sort(), diagnosticKeys);
  assert.equal(event.requestId, response.headers.get('x-request-id'));
  assert.equal(event.outcome, 'duplicate');
});

test('R4 HMAC failure is identified before Request construction or transport entry', async (t) => {
  t.mock.method(crypto.subtle, 'importKey', async () => { throw new Error(unsafeMarker); });
  const run = await diagnosticWorkflow([]);
  const [event] = run.diagnostics;
  assert.equal(run.status, 502);
  assert.equal(run.requests.length, 0);
  assert.equal(event.stage, 'hmac_reservation');
  assert.equal(event.operation, 'calculate_reservation');
  assert.equal(event.errorCategory, 'hmac');
  assert.equal(event.requestConstructed, false);
  assert.equal(event.fetchEntered, false);
  assert.equal(event.mutationAttempted, false);
  assert.equal(event.providerHttpStatus, null);
});

test('R4 initialization failure is observable while preserving the existing route exception contract', async (t) => {
  const request = apiReq(input);
  const diagnostics = [];
  const service = createCloudflareNewsletterService({ ...verifiedEnv, NEWSLETTER_DIAGNOSTICS_ENABLED: 'true' }, request,
    { diagnostic: event => diagnostics.push(event), transport: async () => { throw new Error('Unexpected mock operation'); } });
  t.mock.method(globalThis, 'AbortController', class { constructor() { throw new Error(unsafeMarker); } });
  const response = await handleNewsletterRequest(request, service);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { status: 'rejected', message: 'The request could not be validated. Try again from this website.' });
  assert.equal(diagnostics.length, 1);
  assert.deepEqual(Object.keys(diagnostics[0]).sort(), diagnosticKeys);
  assert.equal(diagnostics[0].stage, 'provider_initialization');
  assert.equal(diagnostics[0].errorCategory, 'initialization');
  assert.equal(diagnostics[0].fetchEntered, false);
  for (const secret of unsafeMarker.split('|')) assert.equal(JSON.stringify(diagnostics).includes(secret), false);
});

test('R4 Request constructor failure is distinct from fetch rejection, including before a mutation', async (t) => {
  const NativeRequest = globalThis.Request;
  let failPost = false;
  t.mock.method(globalThis, 'Request', class extends NativeRequest {
    constructor(url, init) {
      if (String(url).startsWith('https://api.resend.com') && (!failPost || init.method === 'POST')) throw new Error(unsafeMarker);
      super(url, init);
    }
  });
  for (const post of [false, true]) {
    failPost = post;
    const run = await diagnosticWorkflow(post ? [notFound()] : []);
    const [event] = run.diagnostics;
    assert.equal(run.status, 503);
    assert.equal(run.requests.length, post ? 1 : 0);
    assert.equal(event.operation, post ? 'create_contact' : 'lookup_contact');
    assert.equal(event.stage, 'request_construction');
    assert.equal(event.errorCategory, 'request_construction');
    assert.equal(event.requestConstructed, false);
    assert.equal(event.fetchEntered, false);
    assert.equal(event.mutationAttempted, false);
  }
});

test('R4 fetch rejection identifies transport entry without assuming a provider response', async () => {
  const run = await diagnosticWorkflow([() => { throw new Error(unsafeMarker); }]);
  const [event] = run.diagnostics;
  assert.equal(run.status, 503);
  assert.equal(run.requests.length, 1);
  assert.equal(event.stage, 'fetch_invocation');
  assert.equal(event.errorCategory, 'fetch_rejected');
  assert.equal(event.requestConstructed, true);
  assert.equal(event.fetchEntered, true);
  assert.equal(event.providerHttpStatus, null);
  assert.equal(event.mutationAttempted, false);
});

for (const [providerStatus, httpStatus, category, outcome] of [
  [401, 502, 'provider_authentication', 'rejected'],
  [403, 502, 'provider_authentication', 'rejected'],
  [429, 429, 'provider_quota', 'quota'],
  [500, 503, 'provider_server', 'network'],
  [503, 503, 'provider_server', 'network'],
]) {
  test(`R4 provider HTTP ${providerStatus} is classified without logging its body`, async () => {
    const run = await diagnosticWorkflow([json({ name: 'private', message: unsafeMarker }, providerStatus)]);
    const [event] = run.diagnostics;
    assert.equal(run.status, httpStatus);
    assert.equal(run.requests.length, 1);
    assert.equal(event.stage, 'provider_response');
    assert.equal(event.providerHttpStatus, providerStatus);
    assert.equal(event.errorCategory, category);
    assert.equal(event.outcome, outcome);
    assert.equal(event.fetchEntered, true);
    assert.equal(event.mutationAttempted, false);
  });
}

test('R4 malformed JSON and unexpected contact/transport shapes identify separate boundaries', async () => {
  for (const [response, stage, category] of [
    [new Response('{', { headers: { 'content-type': 'application/json' } }), 'response_parsing', 'response_json'],
    [json({ object: 'contact', message: unsafeMarker }), 'contact_lookup', 'response_shape'],
    [{ message: unsafeMarker }, 'provider_response', 'response_shape'],
  ]) {
    const run = await diagnosticWorkflow([response]);
    assert.equal(run.status, 502);
    assert.equal(run.requests.length, 1);
    assert.equal(run.diagnostics[0].stage, stage);
    assert.equal(run.diagnostics[0].errorCategory, category);
    assert.equal(run.diagnostics[0].evidenceConfirmed, false);
  }
});

test('R4 successful creation and duplicates preserve exact response, provider operations and evidence', async () => {
  for (const [steps, expectedStatus, expectedCount, mutationAttempted, message] of [
    [() => [notFound(), json({ object: 'contact', id: contactId }), json(contact()), memberList()], 'accepted', 4, true, 'Your subscription was saved in Resend. No email was sent.'],
    [() => [json(contact()), memberList()], 'duplicate', 2, false, 'Resend confirms this address is already on the Studio newsletter list. No email was sent.'],
  ]) {
    const enabled = await diagnosticWorkflow(steps());
    const disabled = await diagnosticWorkflow(steps(), { flag: 'false' });
    assert.deepEqual(enabled.body, { status: expectedStatus, message, delivered: false, verified: false });
    assert.deepEqual(enabled.body, disabled.body);
    assert.equal(enabled.status, disabled.status);
    assert.equal(enabled.requests.length, expectedCount);
    assert.equal(disabled.requests.length, expectedCount);
    for (let i = 0; i < expectedCount; i++) {
      assert.equal(enabled.requests[i].method, disabled.requests[i].method);
      assert.equal(enabled.requests[i].url, disabled.requests[i].url);
      assert.deepEqual([...enabled.requests[i].headers], [...disabled.requests[i].headers]);
      assert.equal(await enabled.requests[i].text(), await disabled.requests[i].text());
    }
    const [event] = enabled.diagnostics;
    assert.equal(enabled.diagnostics.length, 1);
    assert.equal(event.stage, 'confirmation');
    assert.equal(event.operation, 'verify_membership');
    assert.equal(event.mutationAttempted, mutationAttempted);
    assert.equal(event.evidenceConfirmed, true);
    assert.equal(event.errorCategory, 'none');
    assert.equal(event.outcome, expectedStatus);
  }
});

test('R4 mutation attempt is retained when creation fetch rejects or readback cannot confirm persistence', async () => {
  for (const [steps, operation, category, httpStatus] of [
    [[notFound(), () => { throw new Error(unsafeMarker); }], 'create_contact', 'fetch_rejected', 503],
    [[notFound(), json({ object: 'contact', id: contactId }), json({ message: unsafeMarker }, 500)], 'read_contact', 'provider_server', 502],
    [[notFound(), json({ object: 'contact', id: contactId }), json(contact()), memberList(false)], 'verify_membership', 'indeterminate', 502],
  ]) {
    const run = await diagnosticWorkflow(steps);
    const [event] = run.diagnostics;
    assert.equal(run.status, httpStatus);
    assert.equal(event.operation, operation);
    assert.equal(event.errorCategory, category);
    assert.equal(event.mutationAttempted, true);
    assert.equal(event.evidenceConfirmed, false);
    assert.notEqual(run.body.status, 'accepted');
  }
});

test('R4 timeout and reservation denial retain their stage without extra provider operations', async () => {
  const timeout = await diagnosticWorkflow([() => new Promise(() => {})], { timeoutMilliseconds: 10 });
  assert.equal(timeout.status, 503);
  assert.equal(timeout.requests.length, 1);
  assert.equal(timeout.diagnostics[0].stage, 'fetch_invocation');
  assert.equal(timeout.diagnostics[0].errorCategory, 'timeout');
  const diagnostics = [];
  let calls = 0;
  const service = createResendNewsletterProvider({ apiKey, segmentId,
    control: { scope: 'deployment', enforcesFreePlanHardStop: true, verifiedAbuseControls: true, withReservation: async () => null },
    transport: async () => { calls++; throw new Error('Unexpected mock operation'); }, diagnostic: event => diagnostics.push(event) });
  assert.equal((await service.subscribe(input, requestUUID)).status, 'quota-error');
  assert.equal(calls, 0);
  assert.equal(diagnostics[0].stage, 'reservation_control');
  assert.equal(diagnostics[0].errorCategory, 'reservation_denied');
  assert.equal(diagnostics[0].fetchEntered, false);
});

test('R4 throwing diagnostic sinks cannot alter subscription business behavior', async () => {
  const run = await diagnosticWorkflow([json(contact()), memberList()], { diagnostic: () => { throw new Error(unsafeMarker); } });
  assert.equal(run.body.status, 'duplicate');
  assert.equal(run.status, 200);
  assert.equal(run.requests.length, 2);
});

test('R4 repeated reservation work is classified as operation quota without repeating provider calls', async () => {
  const diagnostics = [];
  const { transport, requests } = mockTransport([json(contact()), memberList()]);
  const service = createResendNewsletterProvider({ apiKey, segmentId, transport,
    control: { scope: 'deployment', enforcesFreePlanHardStop: true, verifiedAbuseControls: true,
      withReservation: async (_reservation, work) => { await work(); return work(); } },
    diagnostic: event => diagnostics.push(event) });
  assert.equal((await service.subscribe(input, requestUUID)).status, 'quota-error');
  assert.equal(requests.length, 2);
  assert.equal(diagnostics[0].errorCategory, 'operation_quota');
  assert.equal(diagnostics[0].outcome, 'quota');
});

test('R5 outbound Requests construct under Workers redirect constraints and retain R4 correlation', async (t) => {
  const NativeRequest = globalThis.Request;
  let constructed = 0;
  t.mock.method(globalThis, 'Request', class extends NativeRequest {
    constructor(url, init) {
      const outbound = String(url).startsWith('https://api.resend.com/');
      if (outbound && init.redirect === 'error') throw new TypeError('Unsupported mock redirect mode');
      super(url, init);
      if (outbound) {
        assert.equal(this.redirect, 'manual');
        constructed++;
      }
    }
  });
  const run = await diagnosticWorkflow([notFound(), json({ object: 'contact', id: contactId }), json(contact()), memberList()]);
  assert.equal(run.status, 200);
  assert.equal(run.body.status, 'accepted');
  assert.equal(constructed, 4);
  assert.equal(run.requests.length, 4);
  assert.equal(run.diagnostics[0].requestConstructed, true);
  assert.equal(run.diagnostics[0].fetchEntered, true);
  assert.equal(run.diagnostics[0].evidenceConfirmed, true);
  for (const request of run.requests) {
    assert.equal(new URL(request.url).origin, 'https://api.resend.com');
    assert.ok(request.headers.get('authorization') === `Bearer ${apiKey}`, 'Synthetic authorization stays on the Resend request');
  }
});

for (const status of [301, 302, 307, 308]) {
  for (const mutation of [false, true]) {
    test(`R5 HTTP ${status} during ${mutation ? 'creation' : 'lookup'} is rejected before parsing with zero redirect forwarding`, async (t) => {
      let bodyReads = 0;
      let locationReads = 0;
      const redirect = new Response('{', { status, headers: {
        Location: 'https://redirect-target.invalid/receive', 'Content-Type': 'application/json',
      } });
      t.mock.method(redirect.body, 'getReader', () => { bodyReads++; throw new Error('Redirect body must not be parsed'); });
      const readHeader = redirect.headers.get;
      t.mock.method(redirect.headers, 'get', function (name) {
        if (name.toLowerCase() === 'location') locationReads++;
        return readHeader.call(this, name);
      });
      const run = await diagnosticWorkflow(mutation ? [notFound(), redirect] : [redirect]);
      assert.equal(run.status, 502);
      assert.equal(run.body.status, 'rejected');
      assert.equal(run.requests.length, mutation ? 2 : 1);
      assert.equal(bodyReads, 0);
      assert.equal(locationReads, 0);
      for (const request of run.requests) {
        assert.equal(request.redirect, 'manual');
        assert.equal(new URL(request.url).origin, 'https://api.resend.com');
        assert.ok(request.headers.get('authorization') === `Bearer ${apiKey}`, 'Synthetic authorization stays on the Resend request');
      }
      const [event] = run.diagnostics;
      assert.equal(event.stage, 'provider_response');
      assert.equal(event.operation, mutation ? 'create_contact' : 'lookup_contact');
      assert.equal(event.providerHttpStatus, status);
      assert.equal(event.errorCategory, 'provider_rejected');
      assert.equal(event.outcome, 'rejected');
      assert.equal(event.requestConstructed, true);
      assert.equal(event.fetchEntered, true);
      assert.equal(event.mutationAttempted, mutation);
      assert.equal(event.evidenceConfirmed, false);
    });
  }
}
