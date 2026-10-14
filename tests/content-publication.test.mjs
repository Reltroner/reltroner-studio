import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

test('synthetic unpublished files are absent from public routes, aliases, index, palette, static params and related discovery', async () => {
  const originalCwd = process.cwd();
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'reltroner-publication-test-'));
  const { COLLECTION_ORDER } = await import('../lib/constants/collections.js');
  try {
    await Promise.all(COLLECTION_ORDER.map((collection) => fs.mkdir(path.join(fixtureRoot, 'content', collection), { recursive: true })));
    const fixtures = {
      'public.md': '---\ntitle: Public Fixture\npublished: true\ntags: [shared]\n---\n## Public Heading\nPublic fixture evidence.',
      'legacy.md': '---\ntitle: Legacy Public Fixture\n---\nLegacy safe public content.',
      'draft.md': '---\ntitle: SECRET Draft Fixture\npublished: false\naliases: [secret-alias]\ntags: [shared]\n---\nSECRET_DRAFT_BODY',
      'private.md': '---\ntitle: SECRET Private Fixture\npublished: true\nprivate: true\n---\nSECRET_PRIVATE_BODY',
      'status.md': '---\ntitle: SECRET Status Fixture\nstatus: unpublished\n---\nSECRET_STATUS_BODY',
      'for-recruiters.md': '---\ntitle: SECRET Static Reference\npublished: false\n---\nSECRET_STATIC_REFERENCE',
    };
    await Promise.all(Object.entries(fixtures).map(([name, source]) => fs.writeFile(path.join(fixtureRoot, 'content', 'blog', name), source)));
    process.chdir(fixtureRoot);
    const { getCollectionEntries, getCollectionEntry, getCollectionStaticParams, getCommandPaletteEntries } = await import('../lib/utils/content.js');
    const { getPublicContentIndex, toPublicContentEntry } = await import('../lib/content/public-index.ts');
    const publicEntries = await getCollectionEntries('blog');
    assert.equal(publicEntries.length, 2);
    const publicResult = await getCollectionEntry('blog', 'public');
    assert.ok(publicResult.contentHtml.includes('Public fixture evidence'));
    for (const slug of ['draft', 'secret-alias', 'private', 'status', 'for-recruiters']) assert.equal(await getCollectionEntry('blog', slug), null, slug);
    const index = await getPublicContentIndex();
    assert.equal(index.length, 2);
    assert.ok(index.every((entry) => entry.published && !('filePath' in entry) && !('fileName' in entry)));
    const output = JSON.stringify({ index, params: await getCollectionStaticParams('blog'), palette: await getCommandPaletteEntries(), related: publicResult.relatedEntries, html: publicResult.contentHtml });
    assert.ok(!output.includes('SECRET'));
    assert.ok(!output.includes('/blog/for-recruiters'));
    assert.equal(toPublicContentEntry({ ...publicEntries[0], published: false }), null);
    // Sitemap derives article paths from the same published-only static params.
    assert.deepEqual((await getCollectionStaticParams('blog')).map(({ slug }) => `/blog/${slug}`).sort(), ['/blog/legacy', '/blog/public']);
  } finally {
    process.chdir(originalCwd);
    // Only this test's newly created OS temporary directory is removed.
    assert.ok(fixtureRoot.startsWith(path.resolve(os.tmpdir()) + path.sep));
    await fs.rm(fixtureRoot, { recursive: true, force: true });
  }
});
