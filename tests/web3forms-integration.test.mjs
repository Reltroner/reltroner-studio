import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { submitContact } from '../lib/contact/web3forms.client.ts';
import { contactService } from '../lib/contact/service.ts';
import { INTENT_LABELS } from '../lib/contact/types.ts';

const validInquiry = {
  intent: 'engineering',
  name: 'Ada Lovelace',
  email: 'ada@example.test',
  message: 'Exploring analytical engine integration and architectural collaboration in Reltroner Studio.',
  privacyAcknowledged: true,
  website: '',
};

const syntheticKey = '11111111-2222-3333-4444-555555555555';
const baseOptions = { accessKey: syntheticKey, enabled: true };

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;
let unmockedFetchAttempts = 0;

before(() => {
  globalThis.window = {};
  globalThis.fetch = async () => {
    unmockedFetchAttempts++;
    throw new Error('FATAL: Real network fetch attempted in test environment!');
  };
});

after(() => {
  globalThis.window = originalWindow;
  globalThis.fetch = originalFetch;
  assert.equal(unmockedFetchAttempts, 0, 'No unmocked external network calls permitted');
});

const parseJson = async (response) => response.json();

test('1. Successful provider acceptance produces HTTP 200, status "accepted", and does NOT claim delivery verified', async () => {
  let captured;
  const mockFetcher = async (url, req) => {
    captured = { url, req };
    return Response.json(
      { success: true, body: { data: validInquiry, message: 'Inquiry received' } },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  };

  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.status, 200);
  assert.equal(response.ok, true);

  const body = await parseJson(response);
  assert.equal(body.status, 'accepted');
  assert.equal(typeof body.message, 'string');
  assert.match(body.message, /accepted your inquiry/);
  assert.match(body.message, /does not confirm that a person has read it/);
  assert.equal(captured.url, 'https://api.web3forms.com/submit');
});

test('2. HTTP 200 with success: false maps to status "rejected"', async () => {
  const mockFetcher = async () => Response.json({ success: false, message: 'Invalid submission' }, { status: 200 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.ok, false);
  const body = await parseJson(response);
  assert.equal(body.status, 'rejected');
  assert.match(body.message, /did not confirm acceptance/);
});

test('3. HTTP 400 client error maps to status "rejected"', async () => {
  const mockFetcher = async () => Response.json({ success: false, message: 'Bad request' }, { status: 400 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.ok, false);
  const body = await parseJson(response);
  assert.equal(body.status, 'rejected');
});

test('4. HTTP 403 forbidden (e.g. server-side disallowed or key blocked) maps to status "rejected"', async () => {
  const mockFetcher = async () => Response.json({ success: false, message: 'Forbidden' }, { status: 403 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.ok, false);
  const body = await parseJson(response);
  assert.equal(body.status, 'rejected');
});

test('5. HTTP 429 rate limit maps to HTTP 429 and status "quota-error"', async () => {
  const mockFetcher = async () => Response.json({ success: false, message: 'Too many requests' }, { status: 429 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.status, 429);
  const body = await parseJson(response);
  assert.equal(body.status, 'quota-error');
  assert.match(body.message, /request limit was reached/);
});

test('6. HTTP 500 server error maps to status "rejected"', async () => {
  const mockFetcher = async () => Response.json({ statusCode: 500, error: 'Server error' }, { status: 500 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.ok, false);
  const body = await parseJson(response);
  assert.equal(body.status, 'rejected');
});

test('7. Request timeout aborts request and returns status "network-error" without retry', async () => {
  let callCount = 0;
  const mockFetcher = async () => {
    callCount++;
    return new Promise(() => {}); // never resolves
  };

  const response = await submitContact(validInquiry, {
    ...baseOptions,
    timeoutMilliseconds: 20,
    fetcher: mockFetcher,
  });

  assert.equal(response.status, 503);
  const body = await parseJson(response);
  assert.equal(body.status, 'network-error');
  assert.match(body.message, /could not be confirmed/);
  assert.equal(callCount, 1, 'Never retries on timeout');
});

test('8. Network exception returns status "network-error" without retry', async () => {
  let callCount = 0;
  const mockFetcher = async () => {
    callCount++;
    throw new TypeError('Network connection refused');
  };

  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(response.status, 503);
  const body = await parseJson(response);
  assert.equal(body.status, 'network-error');
  assert.equal(callCount, 1, 'Never retries on network failure');
});

test('9. Malformed JSON or non-JSON content-type maps to status "rejected"', async () => {
  for (const resp of [
    new Response('<html><body>Error 500</body></html>', { headers: { 'Content-Type': 'text/html' } }),
    new Response('invalid { json', { headers: { 'Content-Type': 'application/json' } }),
    new Response('', { headers: { 'Content-Type': 'application/json' } }),
  ]) {
    const response = await submitContact(validInquiry, { ...baseOptions, fetcher: async () => resp });
    assert.equal(response.ok, false);
    const body = await parseJson(response);
    assert.equal(body.status, 'rejected');
  }
});

test('10. Missing or invalid public access key fails closed without network call', async () => {
  let callCount = 0;
  const mockFetcher = async () => { callCount++; throw new Error('Unreachable'); };

  for (const badKey of ['', 'not-a-uuid', '12345', 'secret-key-without-dashes']) {
    const response = await submitContact(validInquiry, { ...baseOptions, accessKey: badKey, fetcher: mockFetcher });
    assert.equal(response.status, 503);
    const body = await parseJson(response);
    assert.equal(body.status, 'rejected');
  }
  assert.equal(callCount, 0, 'No requests dispatched when key is invalid');
});

test('11. Client validation boundaries reject invalid inputs before any network transport', async () => {
  let callCount = 0;
  const mockFetcher = async () => { callCount++; throw new Error('Unreachable'); };

  const invalidCases = [
    { ...validInquiry, intent: 'unknown-intent' },
    { ...validInquiry, name: '' },
    { ...validInquiry, name: 'Bad\nName' },
    { ...validInquiry, email: 'not-an-email' },
    { ...validInquiry, message: 'Too short' },
    { ...validInquiry, message: 'x'.repeat(4001) },
    { ...validInquiry, privacyAcknowledged: false },
    { ...validInquiry, website: 'bot-fill' },
  ];

  for (const badInput of invalidCases) {
    const response = await submitContact(badInput, { ...baseOptions, fetcher: mockFetcher });
    assert.equal(response.status, 422);
    const body = await parseJson(response);
    assert.equal(body.status, 'invalid');
  }
  assert.equal(callCount, 0, 'Validation failures must never touch provider');
});

test('12. Correct field mapping: name, email, message, intent, and honeypot botcheck', async () => {
  let sentBody;
  const mockFetcher = async (_url, req) => {
    sentBody = JSON.parse(req.body);
    return Response.json({ success: true }, { status: 200 });
  };

  await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.deepEqual(sentBody, {
    access_key: syntheticKey,
    name: validInquiry.name,
    email: validInquiry.email,
    message: validInquiry.message,
    intent: validInquiry.intent,
    botcheck: '',
  });
});

test('13. Correct subject handling: supports explicit subject option without modifying form fields', async () => {
  let sentBody;
  const mockFetcher = async (_url, req) => {
    sentBody = JSON.parse(req.body);
    return Response.json({ success: true }, { status: 200 });
  };

  const customSubject = `Reltroner Studio Inquiry — ${INTENT_LABELS.engineering}`;
  await submitContact(validInquiry, { ...baseOptions, subject: customSubject, fetcher: mockFetcher });
  assert.equal(sentBody.subject, customSubject);
  assert.equal(sentBody.name, validInquiry.name);
  assert.equal(sentBody.email, validInquiry.email);
});

test('14. No unrelated fields, cookies, or secrets transmitted', async () => {
  let capturedReq;
  const mockFetcher = async (_url, req) => {
    capturedReq = req;
    return Response.json({ success: true }, { status: 200 });
  };

  await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  const parsed = JSON.parse(capturedReq.body);

  // Must NOT include client-side validation flags or internal form details
  assert.equal('privacyAcknowledged' in parsed, false);
  assert.equal('website' in parsed, false);
  assert.equal('token' in parsed, false);
  assert.equal('apiKey' in parsed, false);

  // Headers must omit authorization and credentials
  assert.equal(capturedReq.credentials, 'omit');
  const headers = new Headers(capturedReq.headers);
  assert.equal(headers.get('authorization'), null);
  assert.equal(headers.get('cookie'), null);
});

test('15. Response object conforms strictly to ContactResult schema', async () => {
  const mockFetcher = async () => Response.json({ success: true }, { status: 200 });
  const response = await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  const result = await parseJson(response);

  assert.ok(typeof result.status === 'string');
  assert.ok(['idle', 'loading', 'invalid', 'prototype', 'accepted', 'rejected', 'network-error', 'quota-error'].includes(result.status));
  assert.ok(typeof result.message === 'string');
  assert.equal(typeof result.reference === 'undefined' || typeof result.reference === 'string', true);
});

test('16. No automatic POST retry on failure', async () => {
  let calls = 0;
  const mockFetcher = async () => {
    calls++;
    return Response.json({ success: false }, { status: 500 });
  };

  await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(calls, 1, 'Only one attempt is permitted; automatic retries could duplicate inquiries');
});

test('17. Pre-aborted signal prevents any provider dispatch', async () => {
  let calls = 0;
  const controller = new AbortController();
  controller.abort();

  const response = await submitContact(validInquiry, {
    ...baseOptions,
    signal: controller.signal,
    fetcher: async () => { calls++; throw new Error('Unreachable'); },
  });

  assert.equal(calls, 0);
  const body = await parseJson(response);
  assert.equal(body.status, 'network-error');
});

test('18. Disabled runtime flag defaults safely to local prototype without network call', async () => {
  let calls = 0;
  const mockFetcher = async () => { calls++; throw new Error('Unreachable'); };

  const response = await submitContact(validInquiry, {
    ...baseOptions,
    enabled: false,
    fetcher: mockFetcher,
  });

  assert.equal(calls, 0);
  assert.equal(response.status, 200);
  const body = await parseJson(response);
  assert.equal(body.status, 'prototype');
  assert.deepEqual(body, await contactService.submit(validInquiry));
});

test('19. No Resend API invocation or cross-contamination with newsletter', async () => {
  let resendHit = false;
  const mockFetcher = async (url) => {
    if (url.includes('resend.com')) {
      resendHit = true;
      throw new Error('Resend must not be touched by contact form');
    }
    return Response.json({ success: true }, { status: 200 });
  };

  await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(resendHit, false);
});

test('20. Browser-only execution enforced: server environments fail closed', async () => {
  globalThis.window = undefined;
  try {
    const response = await submitContact(validInquiry, baseOptions);
    assert.equal(response.status, 503);
    const body = await parseJson(response);
    assert.equal(body.status, 'rejected');
  } finally {
    globalThis.window = {};
  }
});

test('21. Oversized Unicode inquiry payload (>12KB) rejected pre-flight', async () => {
  let calls = 0;
  const hugeInquiry = { ...validInquiry, message: '★'.repeat(4000) }; // 3 bytes per char * 4000 = 12000 + json overhead > 12KB
  const response = await submitContact(hugeInquiry, {
    ...baseOptions,
    fetcher: async () => { calls++; throw new Error('Unreachable'); },
  });

  assert.equal(response.status, 400);
  const body = await parseJson(response);
  assert.equal(body.status, 'rejected');
  assert.equal(calls, 0);
});

test('22. No Formspree endpoint invocation across any submission flow', async () => {
  let formspreeHit = false;
  const mockFetcher = async (url) => {
    if (url.includes('formspree.io')) {
      formspreeHit = true;
      throw new Error('Formspree must never be invoked');
    }
    return Response.json({ success: true }, { status: 200 });
  };
  await submitContact(validInquiry, { ...baseOptions, fetcher: mockFetcher });
  assert.equal(formspreeHit, false, 'Contact submission must never contact Formspree');
});

test('23. New Contact execution path has zero Google reCAPTCHA or Formspree dependencies', async () => {
  const fs = await import('node:fs/promises');
  const contactPage = await fs.readFile('app/contact/page.tsx', 'utf8');
  const contactExperience = await fs.readFile('components/contact/ContactExperience.tsx', 'utf8');
  const contactForm = await fs.readFile('components/contact/ContactInquiryForm.tsx', 'utf8');
  const clientAdapter = await fs.readFile('lib/contact/web3forms.client.ts', 'utf8');

  for (const [name, content] of [
    ['app/contact/page.tsx', contactPage],
    ['components/contact/ContactExperience.tsx', contactExperience],
    ['components/contact/ContactInquiryForm.tsx', contactForm],
    ['lib/contact/web3forms.client.ts', clientAdapter],
  ]) {
    assert.equal(content.includes('formspree'), false, `${name} must not reference formspree`);
    assert.equal(content.includes('recaptcha'), false, `${name} must not reference recaptcha`);
    assert.equal(content.includes('react-google-recaptcha'), false, `${name} must not import react-google-recaptcha`);
    assert.equal(content.includes('NEXT_PUBLIC_RECAPTCHA_SITE_KEY'), false, `${name} must not use reCAPTCHA site key`);
    assert.equal(content.includes('NEXT_PUBLIC_FORMSPREE_ENDPOINT'), false, `${name} must not use Formspree endpoint`);
  }
});

test('24. Button truthfulness and privacy accessibility in new Contact form', async () => {
  const fs = await import('node:fs/promises');
  const contactForm = await fs.readFile('components/contact/ContactInquiryForm.tsx', 'utf8');
  assert.match(contactForm, /process\.env\.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' \? 'Send inquiry' : 'Preview inquiry locally'/);
  assert.match(contactForm, /href="\/privacy"/, 'Direct Link to privacy policy must precede submission');
  assert.match(contactForm, /name="privacyAcknowledged"/, 'Mandatory consent acknowledgment checkbox must be present');
});
