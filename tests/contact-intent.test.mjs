import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { submitContact } from '../lib/contact/web3forms.client.ts';
import { validateInquiry } from '../lib/contact/schema.ts';
import { CONTACT_INTENTS, CONTACT_INTENT_BY_TOPIC } from '../lib/contact/types.ts';
import { contactTopics } from '../components/contact/ContactIntentTabs.tsx';

const REQUIRED = ['Worldbuilding & ideas', 'Asthortera & stories', 'Learning & LMS', 'Collaboration & engineering'];
const accessKey = '11111111-2222-3333-4444-555555555555';
const draft = { name: 'Synthetic Fixture', email: 'synthetic-intent@example.test', message: 'Synthetic intent mapping fixture; never deliver this inquiry.', privacyAcknowledged: true, website: '' };
// Mirrors ContactInquiryForm: the selected topic title is the submitted intent.
const formInput = (topic) => ({ ...draft, intent: topic.title });

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;
let outbound = 0;
before(() => { globalThis.window = {}; globalThis.fetch = async () => { outbound++; throw new Error('Live Web3Forms submission prohibited'); }; });
after(() => { globalThis.window = originalWindow; globalThis.fetch = originalFetch; assert.equal(outbound, 0); });

test('one canonical mapping: the four UI titles are the only accepted intents, in display order', () => {
  assert.deepEqual(contactTopics.map(topic => topic.title), REQUIRED);
  assert.deepEqual([...CONTACT_INTENTS], REQUIRED);
  assert.deepEqual(contactTopics.map(topic => topic.title), contactTopics.map(topic => CONTACT_INTENT_BY_TOPIC[topic.id]));
  for (const topic of contactTopics) assert.equal('intent' in topic, false, 'No second, divergent intent field per topic');
  assert.equal(new Set(CONTACT_INTENTS).size, 4);
});

for (const title of REQUIRED) {
  test(`mocked Web3Forms request for "${title}" sends the exact title as payload.intent`, async () => {
    const topic = contactTopics.find(item => item.title === title);
    let sent;
    const response = await submitContact(formInput(topic), {
      accessKey, enabled: true,
      fetcher: async (url, request) => { sent = { url, request }; return Response.json({ success: true }); },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'accepted', message: 'The contact provider accepted your inquiry. This does not confirm that a person has read it.' });
    assert.equal(sent.url, 'https://api.web3forms.com/submit');
    const payload = JSON.parse(sent.request.body);
    assert.equal(payload.intent, title);
    assert.deepEqual(payload, { access_key: accessKey, name: draft.name, email: draft.email, message: draft.message, intent: title, botcheck: '' });
  });
}

test('Worldbuilding and Asthortera are never merged into a generic creative intent', async () => {
  const sent = [];
  for (const topic of contactTopics) {
    await submitContact(formInput(topic), { accessKey, enabled: true, fetcher: async (_url, request) => { sent.push(JSON.parse(request.body).intent); return Response.json({ success: true }); } });
  }
  assert.deepEqual(sent, REQUIRED);
  for (const legacy of ['creative', 'engineering', 'learning']) assert.equal(sent.includes(legacy), false);
});

test('unknown, legacy, id-only and near-miss intents are rejected before any transport', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; throw new Error('Must not call'); };
  for (const intent of ['creative', 'engineering', 'learning', 'worldbuilding', 'story', 'professional', 'worldbuilding & ideas',
    'Worldbuilding & ideas ', ' Learning & LMS', 'Worldbuilding &amp; ideas', 'Collaboration / engineering', '', undefined, null, 1, ['Learning & LMS']]) {
    assert.equal(validateInquiry({ ...draft, intent }).input, undefined, `intent ${JSON.stringify(intent)} must be rejected`);
    const response = await submitContact({ ...draft, intent }, { accessKey, enabled: true, fetcher });
    assert.equal(response.status, 422);
    assert.deepEqual(await response.json(), { status: 'invalid', message: 'Choose an inquiry intent.' });
  }
  assert.equal(calls, 0);
});

test('switching topics changes the duplicate signature; resubmitting the same topic is still a duplicate', () => {
  // ContactInquiryForm keys duplicate detection on JSON.stringify(validated input).
  const signature = (topic) => JSON.stringify(validateInquiry(formInput(topic)).input);
  const signatures = contactTopics.map(signature);
  assert.equal(new Set(signatures).size, 4, 'Each topic yields a distinct signature for the same draft');
  for (const topic of contactTopics) assert.equal(signature(topic), signature(topic));
});

test('Contact form submits topic.title as intent and keeps the validated-input duplicate signature', async () => {
  const form = await fs.readFile('components/contact/ContactInquiryForm.tsx', 'utf8');
  assert.match(form, /intent: topic\.title,/);
  assert.equal(form.includes('topic.intent'), false);
  assert.match(form, /const signature = JSON\.stringify\(checked\.input\);/);
});
