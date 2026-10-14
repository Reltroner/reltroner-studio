import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSubscription } from '../lib/newsletter/schema.ts';
import { validateInquiry } from '../lib/contact/schema.ts';
import { newsletterService } from '../lib/newsletter/service.ts';
import { contactService } from '../lib/contact/service.ts';
import { readFormRequest } from '../lib/forms/request.ts';
import { isSameOriginRequest } from '../lib/security/request-origin.ts';

test('newsletter needs separate explicit opt-in and validates bounded email', () => {
  assert.equal(validateSubscription({ email: 'reader@example.test', consent: false }).input, undefined);
  assert.equal(validateSubscription({ email: 'x'.repeat(255) + '@example.test', consent: true }).input, undefined);
  assert.equal(validateSubscription({ email: ' Reader@Example.test ', consent: true }).input.email, 'reader@example.test');
});

const valid = { intent: 'creative', name: 'Example Reader', email: 'reader@example.test', message: 'A synthetic inquiry for local validation.', privacyAcknowledged: true, website: '' };
test('contact rejects bad intent, honeypot and oversize inquiry; never enrolls newsletter', () => {
  assert.ok(validateInquiry(valid).input);
  for (const data of [{ ...valid, intent: 'admin' }, { ...valid, website: 'spam.test' }, { ...valid, message: 'x'.repeat(4001) }, { ...valid, privacyAcknowledged: false }, { ...valid, email: 'javascript:alert(1)' }]) assert.equal(validateInquiry(data).input, undefined);
  assert.equal('consent' in validateInquiry(valid).input, false);
});

test('disconnected adapters cannot claim accepted, subscribed, delivered or verified', async () => {
  let requests = 0;
  const original = globalThis.fetch;
  globalThis.fetch = async () => { requests++; throw new Error('External requests prohibited in prototype'); };
  try {
    const newsletter = await newsletterService.subscribe({ email: 'reader@example.test', consent: true, source: 'website-newsletter' }, 'test');
    assert.equal(newsletter.status, 'prototype'); assert.equal(newsletter.delivered, false); assert.equal(newsletter.verified, false);
    assert.equal((await newsletterService.unsubscribe('synthetic')).status, 'prototype');
    assert.equal((await contactService.submit(valid)).status, 'prototype'); assert.equal(requests, 0);
  } finally { globalThis.fetch = original; }
});

test('form API rejects cross-origin, malformed and oversized bodies', async () => {
  const request = (body, headers = {}) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body });
  await assert.rejects(() => readFormRequest(request('{}', { Origin: 'https://untrusted.test' })), /ORIGIN/);
  await assert.rejects(() => readFormRequest(request('x'.repeat(12001))), /SIZE/);
  await assert.rejects(() => readFormRequest(request('{bad')));
  assert.deepEqual(await readFormRequest(request('{"email":"synthetic@example.test"}')), { email: 'synthetic@example.test' });
});

test('origin guard uses HTTP host and preserves cross-site rejection behind local Next server', async () => {
  const local = new Request('http://localhost:3107/api/contact', { method: 'POST', headers: { Host: '127.0.0.1:3107', Origin: 'http://127.0.0.1:3107', 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(isSameOriginRequest(local), true);
  assert.deepEqual(await readFormRequest(local), {});
  for (const headers of [
    { Host: '127.0.0.1:3107', Origin: 'https://untrusted.test' },
    { Host: '127.0.0.1:3107', Origin: 'http://127.0.0.1:3108' },
    { Host: '127.0.0.1:3107', Origin: 'null' },
    { Host: '127.0.0.1:3107', 'Sec-Fetch-Site': 'cross-site' },
    { Host: '127.0.0.1:3107', Origin: 'http://127.0.0.1:3107', 'X-Forwarded-Host': 'untrusted.test' },
  ]) {
    const request = new Request('http://localhost:3107/api/contact', { headers });
    assert.equal(isSameOriginRequest(request), Boolean(headers['X-Forwarded-Host']));
  }
});
