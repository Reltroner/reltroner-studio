import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyContent, EPISTEMIC_CLASSIFICATIONS, isPublicContent, MAX_SEARCHABLE_TEXT_LENGTH } from '../lib/content/taxonomy.ts';
import { discoverRelatedContent, searchPublicContent } from '../lib/content/search.ts';

const entry = (id, title, extra = {}) => ({ id, title, canonicalRoute: `/blog/${id}`, collection: 'blog', published: true, tags: [], ...extra });

test('explicit epistemic classes validate, while ambiguous legacy worldbuilding requires editorial review', () => {
  for (const classification of EPISTEMIC_CLASSIFICATIONS) assert.equal(classifyContent({ classification }, 'test:fixture').classification, classification);
  assert.deepEqual(classifyContent({ category: 'Worldbuilding', tags: ['canon'] }, 'places:ambiguous'), { classification: null, classificationSource: 'editorial-review', needsEditorialReview: true });
  assert.equal(classifyContent({}, 'blog:asthortera-glossary').classification, 'FICTION_CANON');
  assert.equal(classifyContent({ classification: 'not-reviewed' }, 'blog:asthortera-glossary').classification, null);
});

test('publication predicate excludes every explicit non-public fixture and malformed published values', () => {
  assert.equal(isPublicContent({}), true);
  assert.equal(isPublicContent({ published: true }), true);
  for (const metadata of [{ published: false }, { published: 'false' }, { published: 'trues' }, { draft: true }, { draft: 'true' }, { private: true }, { unpublished: true }, { visibility: 'private' }, { status: 'unpublished' }, { public: false }]) {
    assert.equal(isPublicContent(metadata), false, JSON.stringify(metadata));
  }
});

test('shared ranking is deterministic, accent-insensitive, token-complete and bounded', () => {
  const entries = [entry('body', 'Other record', { searchableText: 'creative revision' }), entry('prefix', 'Creative Revision Practice'), entry('exact', 'Créative Revision'), entry('partial', 'Creative unrelated')];
  const expected = ['exact', 'prefix', 'body'];
  assert.deepEqual(searchPublicContent(entries, 'creative revision').map((item) => item.id), expected);
  assert.deepEqual(searchPublicContent([...entries].reverse(), 'creative revision').map((item) => item.id), expected);
  assert.equal(searchPublicContent(entries, 'creative revision', { limit: 1 })[0].id, 'exact');
  assert.equal(searchPublicContent([entry('large', 'Large', { searchableText: 'x'.repeat(MAX_SEARCHABLE_TEXT_LENGTH) + 'hidden beyond bound' })], 'hidden').length, 0);
});

test('collection filter can be broadened and related discovery never returns private evidence', () => {
  const entries = [entry('public', 'Creative', { tags: ['revision'] }), entry('cross', 'Research', { collection: 'research', tags: ['revision'] }), entry('draft', 'Draft', { tags: ['revision'], published: false }), entry('private', 'Private', { tags: ['revision'], private: true })];
  assert.deepEqual(searchPublicContent(entries, 'revision', { collection: 'blog' }).map((item) => item.id), ['public']);
  assert.equal(searchPublicContent(entries, 'revision').length, 2);
  assert.deepEqual(discoverRelatedContent(entries, entries[0]).map((item) => item.id), ['cross']);
});

test('public index client parser validates payload and drops unpublished or unsafe entries', async () => {
  const { parsePublicIndexPayload, loadPublicContentIndex, resetPublicContentIndexCache } = await import('../lib/content/public-index-client.ts');
  assert.throws(() => parsePublicIndexPayload(null));
  assert.throws(() => parsePublicIndexPayload({ entries: 'not-array' }));

  const rawEntries = [
    { id: 'blog:valid', collection: 'blog', slug: 'valid', title: 'Valid Post', canonicalRoute: '/blog/valid', aliases: ['/blog/old-valid'], tags: ['tag1'], published: true, classification: 'CREATIVE_FRAMEWORK' },
    { id: 'blog:secret', collection: 'blog', slug: 'secret', title: 'Draft Post', canonicalRoute: '/blog/secret', aliases: [], tags: [], published: false, classification: 'CREATIVE_FRAMEWORK' },
    { id: 'blog:unsafe-route', collection: 'blog', slug: 'unsafe', title: 'Unsafe Route', canonicalRoute: '//evil.com/path', aliases: [], tags: [], published: true, classification: 'CREATIVE_FRAMEWORK' },
    { id: 'blog:bad-class', collection: 'blog', slug: 'bad', title: 'Bad Class', canonicalRoute: '/blog/bad', aliases: [], tags: [], published: true, classification: 'NOT_A_CLASS' },
  ];

  const parsed = parsePublicIndexPayload({ version: 'v1', entries: rawEntries });
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].id, 'blog:valid');

  resetPublicContentIndexCache();
  const mockFetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ version: 'v1', count: 1, entries: [rawEntries[0]] }),
  });
  const loaded = await loadPublicContentIndex(mockFetch);
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].title, 'Valid Post');
  resetPublicContentIndexCache();
});
