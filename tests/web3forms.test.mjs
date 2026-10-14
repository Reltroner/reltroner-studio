import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { submitContact } from '../lib/contact/web3forms.client.ts';
import { contactService } from '../lib/contact/service.ts';

const input = { intent: 'creative', name: 'Synthetic Fixture', email: 'synthetic-web3@example.test', message: 'Synthetic fixture only; never deliver this inquiry.', privacyAcknowledged: true, website: '' };
const accessKey = '78261eea-8f8b-4381-83c6-79fa7120f1cf';
const options = { accessKey, enabled: true };
const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;
let outbound = 0;
before(() => { globalThis.window = {}; globalThis.fetch = async () => { outbound++; throw new Error('Live browser submission prohibited'); }; });
after(() => { globalThis.window = originalWindow; globalThis.fetch = originalFetch; assert.equal(outbound, 0); });
const body = response => response.json();

test('browser transport requires HTTP success plus literal success true and forwards the existing honeypot', async () => {
  let observed;
  const response = await submitContact(input, { ...options, fetcher: async (url, request) => { observed = { url, request }; return Response.json({ success: true, body: { data: input, message: 'Fixture accepted' } }); } });
  assert.equal(response.ok, true); assert.equal((await body(response)).status, 'accepted');
  assert.equal(observed.url, 'https://api.web3forms.com/submit');
  assert.equal(observed.request.credentials, 'omit'); assert.equal(observed.request.redirect, 'error');
  assert.deepEqual(JSON.parse(observed.request.body), { access_key: accessKey, name: input.name, email: input.email, message: input.message, intent: input.intent, botcheck: '' });
  assert.equal(observed.request.signal.aborted, true);
  assert.equal(JSON.stringify(observed.request.headers).includes('Authorization'), false);
});

test('HTTP failure with success true, explicit false and nonboolean successes are rejected', async () => {
  for (const [value, status] of [[{ success: true }, 400], [{ success: false }, 200], [{ success: 'true' }, 200], [{ success: 1 }, 200], [{}, 200], [[], 200], [null, 200]]) {
    const response = await submitContact(input, { ...options, fetcher: async () => Response.json(value, { status }) });
    assert.equal(response.ok, false); assert.equal((await body(response)).status, 'rejected');
  }
});

test('provider 429 maps to the existing quota-error feedback', async () => {
  const response = await submitContact(input, { ...options, fetcher: async () => Response.json({ success: false }, { status: 429 }) });
  assert.equal(response.status, 429); assert.equal((await body(response)).status, 'quota-error');
});

test('malformed JSON, HTML, oversized data and redirects cannot become acceptance', async () => {
  for (const response of [new Response('{bad', { headers: { 'Content-Type': 'application/json' } }), new Response('<html>success</html>', { headers: { 'Content-Type': 'text/html' } }), Response.json({ success: true, data: 'x'.repeat(33000) }), new Response('{}', { status: 303, headers: { 'Content-Type': 'application/json' } })]) {
    assert.equal((await body(await submitContact(input, { ...options, fetcher: async () => response }))).status, 'rejected');
  }
});

test('timeout, stalled response body and network exceptions return indeterminate-safe feedback with zero retries', async () => {
  for (const fetcher of [async () => new Promise(() => {}), async () => new Response(new ReadableStream({ start() {} }), { headers: { 'Content-Type': 'application/json' } }), async () => { throw new Error(input.message); }]) {
    let calls = 0;
    const response = await submitContact(input, { ...options, timeoutMilliseconds: 20, fetcher: (...args) => { calls++; return fetcher(...args); } });
    const result = await body(response);
    assert.equal(result.status, 'network-error'); assert.match(result.message, /could not be confirmed/);
    assert.equal(JSON.stringify(result).includes(input.message), false); assert.equal(calls, 1);
  }
});

test('missing identifier fails closed; disabled adapter retains exact current prototype response', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; throw new Error('Must not call'); };
  assert.equal((await body(await submitContact(input, { ...options, accessKey: '', fetcher }))).status, 'rejected');
  assert.equal((await body(await submitContact(input, { ...options, enabled: false, fetcher }))).status, 'prototype');
  assert.equal(calls, 0);
});

test('schema, privacy and honeypot failures preserve existing validation semantics without transport', async () => {
  let calls = 0;
  for (const value of [{ ...input, intent: 'new-category' }, { ...input, privacyAcknowledged: false }, { ...input, website: 'spam' }, { ...input, message: 'short' }]) {
    assert.equal((await body(await submitContact(value, { ...options, fetcher: async () => { calls++; throw new Error('Must not call'); } }))).status, 'invalid');
  }
  assert.equal(calls, 0);
});

test('server execution is refused; free-tier delivery cannot be proxied by importing this adapter', async () => {
  globalThis.window = undefined;
  try { assert.equal((await body(await submitContact(input, options))).status, 'rejected'); }
  finally { globalThis.window = {}; }
});

test('existing aborted submit signal never starts a provider request', async () => {
  const controller = new AbortController(); controller.abort();
  let calls = 0;
  const response = await submitContact(input, { ...options, signal: controller.signal, fetcher: async () => { calls++; throw new Error('Must not call'); } });
  assert.equal((await body(response)).status, 'network-error'); assert.equal(calls, 0);
});

test('approved runtime transport stays disabled with a configured public key and preserves current feedback', async () => {
  const oldKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const oldEnabled = process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED;
  try {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = accessKey;
    process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED = 'false';
    const response = await submitContact(input);
    assert.equal(response.ok, true);
    assert.deepEqual(await body(response), await contactService.submit(input));
  } finally {
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY; else process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = oldKey;
    if (oldEnabled === undefined) delete process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED; else process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED = oldEnabled;
  }
});

test('browser-direct adapter preserves the existing server request byte limit for large Unicode inquiries', async () => {
  let calls = 0;
  const response = await submitContact({ ...input, message: 'あ'.repeat(4000) }, { ...options, fetcher: async () => { calls++; throw new Error('Must not call'); } });
  assert.equal(response.status, 400); assert.equal((await body(response)).status, 'rejected'); assert.equal(calls, 0);
});
