import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = [
  'app/page.tsx',
  'app/creators/page.tsx',
  'app/readers/page.tsx',
  'app/explore/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
];

test('newsletter placement is reused once on the homepage and all five entry pages', async () => {
  for (const page of pages) {
    const source = await readFile(page, 'utf8');
    assert.match(source, /import NewsletterPlacement from '@\/components\/newsletter\/NewsletterPlacement';/, page);
    assert.equal((source.match(/<NewsletterPlacement\s*\/>/g) ?? []).length, 1, page);
  }
});

test('shared placement preserves all four fail-closed activation gates', async () => {
  const source = await readFile('components/newsletter/NewsletterPlacement.tsx', 'utf8');
  for (const env of [
    'RESEND_NEWSLETTER_ENABLED',
    'CLOUDFLARE_WAF_PROTECTION_VERIFIED',
    'RESEND_HARD_STOP_VERIFIED',
    'RESEND_UNSUBSCRIBE_VERIFIED',
  ]) {
    assert.ok(source.includes(`process.env.${env} === 'true'`), env);
  }
  assert.match(source, /<NewsletterSection activationVerified=\{activationVerified\}/);
});

test('contact artwork no longer uses the generic conversation placeholder', async () => {
  const source = await readFile('components/contact/ContactExperience.tsx', 'utf8');
  assert.match(source, /<ContactConversationArt\s*\/>/);
  assert.doesNotMatch(source, /<ConceptArt kind="conversation"/);
  assert.match(source, /href="#newsletter"/);
  assert.match(source, /Contact inquiries never subscribe you/);
});

test('contact and newsletter continue to use separate components and transport paths', async () => {
  const contact = await readFile('app/contact/page.tsx', 'utf8');
  const placement = await readFile('components/newsletter/NewsletterPlacement.tsx', 'utf8');
  assert.match(contact, /<ContactExperience\s*\/>/);
  assert.match(contact, /<NewsletterPlacement\s*\/>/);
  assert.ok(contact.indexOf('<ContactExperience />') < contact.indexOf('<NewsletterPlacement />'));
  assert.doesNotMatch(placement, /Web3Forms|fetch\s*\(|contact\.client/);
});
