import test from 'node:test';
import assert from 'node:assert/strict';
import {
  handleNewsletterPreflight, handleNewsletterRequest, onRequest,
} from '../functions/api/newsletter.ts';
import { readFormRequest } from '../lib/forms/request.ts';

const canonical = 'https://www.reltroner.com/api/newsletter';
const lmsOrigin = 'https://lms.reltroner.com';
const payload = { email: 'synthetic-lms@example.test', consent: true };
let mutations = 0;
const service = {
  provider: 'resend',
  async subscribe() {
    mutations++;
    return { status: 'accepted', message: 'Your subscription was saved in Resend. No email was sent.', delivered: false, verified: false };
  },
  async unsubscribe() { throw new Error('unsubscribe must not be called'); },
};
const post = (origin = lmsOrigin, url = canonical, extra = {}, body = payload) => new Request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Origin: origin,
    'Sec-Fetch-Site': 'same-site',
    ...extra,
  },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const preflight = (origin = lmsOrigin, url = canonical, extra = {}) => new Request(url, {
  method: 'OPTIONS',
  headers: {
    Origin: origin,
    'Sec-Fetch-Site': 'same-site',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type',
    ...extra,
  },
});

test('CORS: one precise LMS origin receives an OPTIONS 204 without contacting Resend', async () => {
  const before = mutations;
  const response = await onRequest({ request: preflight(), env: {} });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), lmsOrigin);
  assert.equal(response.headers.get('access-control-allow-methods'), 'POST');
  assert.match(response.headers.get('access-control-allow-headers'), /Content-Type/);
  assert.equal(response.headers.get('access-control-max-age'), '600');
  assert.match(response.headers.get('vary'), /Origin/);
  assert.equal(response.headers.get('access-control-allow-credentials'), null);
  assert.equal(await response.text(), '');
  assert.equal(mutations, before);
});

test('CORS: reject unapproved origins, .pages.dev, wrong host, requests for GET, and extra headers', () => {
  const before = mutations;
  for (const request of [
    preflight('https://evil.test'),
    preflight('null'),
    preflight('https://lms.reltroner.com.evil.test'),
    preflight('http://lms.reltroner.com'),
    preflight(lmsOrigin, 'https://reltroner-studio.pages.dev/api/newsletter'),
    preflight(lmsOrigin, 'https://www.reltroner.com/api/contact'),
    preflight(lmsOrigin, canonical, { Host: 'evil.test' }),
    preflight(lmsOrigin, canonical, { 'Sec-Fetch-Site': 'cross-site' }),
    preflight(lmsOrigin, canonical, { 'Access-Control-Request-Method': 'GET' }),
    preflight(lmsOrigin, canonical, { 'Access-Control-Request-Headers': 'content-type,authorization' }),
  ]) {
    const response = handleNewsletterPreflight(request);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get('access-control-allow-origin'), null);
  }
  assert.equal(mutations, before);
});

test('POST from LMS delegates to the Studio service and returns the unchanged JSON contract', async () => {
  const before = mutations;
  const response = await handleNewsletterRequest(post(), service);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), lmsOrigin);
  assert.equal(response.headers.get('access-control-allow-credentials'), null);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {
    status: 'accepted',
    message: 'Your subscription was saved in Resend. No email was sent.',
    delivered: false,
    verified: false,
  });
  assert.equal(mutations, before + 1);
});

test('POST failure paths carry allowed LMS CORS headers, with no extra mutations', async () => {
  const before = mutations;
  for (const [req, status] of [
    [post(lmsOrigin, canonical, {}, { email: 'bad', consent: true }), 422],
    [post(lmsOrigin, canonical, {}, '{bad'), 400],
    [post(lmsOrigin, canonical, { 'Content-Type': 'text/plain' }), 400],
  ]) {
    const response = await handleNewsletterRequest(req, service);
    assert.equal(response.status, status);
    assert.equal(response.headers.get('access-control-allow-origin'), lmsOrigin);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  const quotaResponse = await handleNewsletterRequest(post(), {
    ...service, async subscribe() { return { status: 'quota-error', message: 'Rate limited.', delivered: false, verified: false }; },
  });
  assert.equal(quotaResponse.status, 429);
  assert.equal(quotaResponse.headers.get('access-control-allow-origin'), lmsOrigin);
  assert.equal(mutations, before);
});

test('Untrusted origin cannot call the Studio subscription service', async () => {
  const before = mutations;
  for (const request of [
    post('https://evil.test'),
    post(''),
    post('null'),
    post(lmsOrigin, 'https://www.reltroner.com.evil.test/api/newsletter'),
    post(lmsOrigin, 'https://reltroner-studio.pages.dev/api/newsletter'),
    post(lmsOrigin, canonical, { Host: 'another.example' }),
    post(lmsOrigin, canonical, { 'Sec-Fetch-Site': 'cross-site' }),
  ]) {
    const response = await handleNewsletterRequest(request, service);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get('access-control-allow-origin'), null);
  }
  assert.equal(mutations, before);
});

test('Existing same-origin Studio form still works without any CORS headers', async () => {
  const before = mutations;
  const request = post('https://www.reltroner.com', canonical, { 'Sec-Fetch-Site': 'same-origin' });
  const response = await handleNewsletterRequest(request, service);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), null);
  assert.equal(mutations, before + 1);
});

test('General contact/form reader remains same-origin-only: LMS exception is scoped to newsletter', async () => {
  await assert.rejects(
    readFormRequest(post()),
    /ORIGIN/
  );
});
