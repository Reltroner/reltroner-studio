import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import { articleMarkdownHtml } from '../lib/content/markdown-renderer.ts';
import { processVideoDirectives, injectVideoEmbeds } from '../lib/utils/videoEmbeds.ts';
import { enforcePublicUrls } from '../lib/security/markdown-rendering.ts';
import { introductionCases, renderIntroductionMarkup } from './fixtures/article-introduction.mjs';

const slugify = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
async function render(source, title) {
  return remark().use(gfm).use(enforcePublicUrls).use(articleMarkdownHtml, { slugify, title }).process(source);
}

for (const fixture of introductionCases) test(fixture.name, async () => {
  const first = await render(fixture.markdown, fixture.title);
  const second = await render(fixture.markdown, fixture.title);
  const intro = first.data.articleIntroduction;
  assert.deepEqual(first.data, second.data, 'extraction is deterministic');
  assert.equal(String(first), String(second));
  assert.doesNotMatch(intro.titleHtml || '', /<\/?(?:h[1-6]|p|div|ul|pre|script)\b/i);
  assert.doesNotMatch(intro.leadHtml || '', /<\/?(?:h[1-6]|div|ul|pre|script)\b/i);
  assert.equal(Boolean(intro.leadHtml), Boolean(fixture.lead));
  if (fixture.lead) assert.match(intro.leadHtml, fixture.lead);
  for (const text of fixture.body || []) assert.ok(intro.bodyHtml.includes(text), 'section retained: ' + text);
  if (fixture.levels) assert.deepEqual(first.data.articleHeadings.map(h => h.level), fixture.levels);
  const markup = renderIntroductionMarkup({ title: fixture.title, introduction: intro });
  assert.doesNotMatch(markup, /onerror=|onclick=|javascript:|<script/i);
  assert.equal((markup.match(/<h1\b/g) || []).length, (String(first).match(/<h1\b/g) || []).length || 1, 'opening H1 reused without deleting later authored H1');
  assert.equal(new Set(first.data.articleHeadings.map(h => h.id)).size, first.data.articleHeadings.length);
  if (fixture.inline) assert.match(intro.titleHtml, fixture.inline);
  if (fixture.plain) { assert.equal(intro.titleText, fixture.title); assert.equal(intro.titleHtml, undefined); }
});

test('the exact places article keeps Overview and the subsequent H1 in the body', async () => {
  const parsed = matter(await fs.readFile('content/places/reltronland-provinces-cities-districts.md', 'utf8'));
  const file = await render(parsed.content, parsed.data.title);
  const intro = file.data.articleIntroduction;
  assert.equal(intro.titleText, parsed.data.title);
  assert.equal(intro.titleHtml, undefined);
  assert.equal(intro.leadHtml, undefined);
  assert.match(intro.bodyHtml, /<h2 id="1-overview" class="archive-heading">1. Overview<\/h2>/);
  assert.match(intro.bodyHtml, /<h1 id="2-reltronland" class="archive-heading">2. Reltronland<\/h1>/);
  assert.ok(!intro.bodyHtml.includes('editorial-lead'), 'a later section is never promoted to introduction');
  assert.equal(file.data.articleHeadings.length, 81);
});

test('a video placeholder adjacent to the title remains a body-level media block', async () => {
  const { transformedMarkdown, placeholders } = processVideoDirectives('# Title\n\n::video{src="https://evil.test/invalid.mp4"}\n\n## Section');
  const file = await remark().use(gfm).use(enforcePublicUrls).use(articleMarkdownHtml, { slugify, title: 'Title', mediaPlaceholders: [...placeholders.keys()] }).process(transformedMarkdown);
  assert.equal(file.data.articleIntroduction.leadHtml, undefined);
  const body = injectVideoEmbeds(file.data.articleIntroduction.bodyHtml, placeholders);
  assert.match(body, /embedded playback unavailable/);
  assert.doesNotMatch(body, /<p[^>]*>\s*<(?:figure|div)/);
  assert.match(body, /<h2 id="section"/);
});
