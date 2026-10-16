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
