import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import { articleMarkdownHtml } from '../lib/content/markdown-renderer.ts';
import { enforcePublicUrls } from '../lib/security/markdown-rendering.ts';
import { COLLECTIONS } from '../lib/constants/collections.js';
import { isPublicContent } from '../lib/content/taxonomy.ts';

const slugify = text => text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
async function render(source, title) {
  return remark().use(gfm).use(enforcePublicUrls).use(articleMarkdownHtml, { slugify, title }).process(source);
}
// Windows checkouts may add CRLF; the deployed build reads LF from Git.
const read = async file => (await fs.readFile(file, 'utf8')).replace(/\r\n/g, '\n');
const visibleText = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const textOf = node => node.value ?? (node.children || []).map(textOf).join('');
const hasMedia = node => node.type === 'image' || node.type === 'html' || (node.children || []).some(hasMedia);

// A line of `---` or `===` directly under text turns that text into a Setext heading. That is legitimate for a short
// label, but here it usually means a separator was written straight after prose, metadata or media. Such a "heading"
// spans several source lines, reads as a sentence, or carries an image or HTML.
function accidentalSetextHeadings(markdown) {
  const found = [];
  const visit = node => {
    if (node.type === 'heading' && !markdown.slice(node.position.start.offset, node.position.end.offset).startsWith('#')) {
      const label = markdown.slice(node.position.start.offset, node.position.end.offset).split('\n').slice(0, -1);
      const text = textOf(node).trim();
      if (label.length > 1 || /\.["'”’)*_]*$/.test(text) || hasMedia(node)) found.push({ line: node.position.start.line, text: text.slice(0, 80) });
    }
    (node.children || []).forEach(visit);
  };
  visit(remark().use(gfm).parse(markdown));
  return found;
}

async function publishedArticles() {
  const articles = [];
  for (const { key, contentDir } of Object.values(COLLECTIONS)) {
    for (const entry of await fs.readdir(path.join('content', contentDir), { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const file = path.join('content', contentDir, entry.name).replaceAll('\\', '/');
      const parsed = matter(await read(file));
      if (isPublicContent(parsed.data)) articles.push({ collection: key, file, ...parsed });
    }
  }
  return articles;
}

test('a separator written directly after a paragraph is the only thing the paragraph fix changes', async () => {
  const accidental = await render('### Bridge\nThe conspiracy points beyond the city toward national power.\n---\n## SEASON 3 — National Conspiracy');
  const fixed = await render('### Bridge\nThe conspiracy points beyond the city toward national power.\n\n---\n## SEASON 3 — National Conspiracy');
  assert.match(String(accidental), /<h2 id="the-conspiracy-points/, 'the unfixed source really parses as a heading');
  assert.deepEqual(accidentalSetextHeadings('### Bridge\nThe conspiracy points beyond the city toward national power.\n---\n'), [{ line: 2, text: 'The conspiracy points beyond the city toward national power.' }]);
  assert.match(String(fixed), /<h3 id="bridge" class="archive-heading">Bridge<\/h3>\n<p>The conspiracy points beyond the city toward national power\.<\/p>\n<hr>\n<h2 id="season-3-national-conspiracy"/);
  assert.deepEqual(fixed.data.articleHeadings.map(h => [h.level, h.text]), [[3, 'Bridge'], [2, 'SEASON 3 — National Conspiracy']]);
  assert.equal(visibleText(String(fixed)), visibleText(String(accidental)), 'no text is added or lost');
});

test('legitimate Setext headings still render as headings and are not reported', async () => {
  const source = 'Overview\n========\n\nThe archive begins here.\n\nWhy it matters\n--------------\n\nMore text.';
  const file = await render(source);
  assert.deepEqual(file.data.articleHeadings.map(h => [h.level, h.id]), [[1, 'overview'], [2, 'why-it-matters']]);
  assert.match(String(file), /<h1 id="overview" class="archive-heading">Overview<\/h1>/);
  assert.deepEqual(accidentalSetextHeadings(source), []);
  assert.deepEqual(accidentalSetextHeadings('# Title\n\n> Quoted label\n> ---\n\n## Real section'), []);
});

test('multi-line prose, metadata and media on a separator are reported', () => {
  const cases = {
    prose: 'Season 4 is split between two settings\nAt this point, they remain independent actors\n---',
    metadata: '---\ntitle: "Episode 6"\ndate: "2025-05-20"\n---',
    media: '![Moveset](/images/moveset.webp)\n---',
  };
  for (const [name, source] of Object.entries(cases)) assert.equal(accidentalSetextHeadings(source).length, 1, name);
});

test('The Abyss of Comfort keeps narrative as paragraphs and its seasons as sections', async () => {
  const parsed = matter(await read('content/series/the-abyss-of-comfort.md'));
  const file = await render(parsed.content, parsed.data.title);
  const html = String(file);
  const headings = file.data.articleHeadings;
  assert.match(html, /<h3 id="bridge-\d+" class="archive-heading">Bridge<\/h3>\n<p>Delwyn disappears from the immediate reach of Pencilfania’s institutions[^<]*<\/p>\n<hr>\n<h2 id="season-4-the-underground-years" class="archive-heading">SEASON 4 — The Underground Years<\/h2>/);
  assert.match(html, /<h3 id="continuity-note" class="archive-heading">Continuity Note<\/h3>\n<p>Season 4 is intentionally split between two distinct geographic and narrative environments\.[^<]*At this point, Delwyn and Sterling remain independent actors\.[^<]*<\/p>\n<hr>\n<h2 id="season-5-formation-of-the-bounty-hunters" class="archive-heading">SEASON 5 — Formation of the Bounty Hunters<\/h2>/);
  assert.match(html, /<pre><code class="language-text">Delwyn’s own capability\n\+\n[\s\S]*?\n=\nDelwyn’s extraordinary trajectory\n<\/code><\/pre>/, 'the formula keeps its = line');
  for (const sentence of ['The conspiracy points beyond the city', 'Season 4 is intentionally split', 'Taramistry forces the Fighter', 'Delwyn’s own capability']) {
    assert.ok(!headings.some(h => h.text.startsWith(sentence)), 'not in the outline: ' + sentence);
  }
  for (let season = 1; season <= 40; season++) {
    assert.equal(headings.filter(h => h.level === 2 && h.text.startsWith(`SEASON ${season} —`)).length, 1, `Season ${season} is one H2`);
  }
  const tags = [...html.matchAll(/<h([1-4]) id="([^"]+)" class="archive-heading">/g)].map(([, level, id]) => ({ level: Number(level), id }));
  assert.deepEqual(tags, headings.map(({ level, id }) => ({ level, id })), 'reading-path outline and HTML headings agree');
  assert.deepEqual(accidentalSetextHeadings(parsed.content), []);
});

test('published articles in every collection contain no accidental Setext headings', async () => {
  const articles = await publishedArticles();
  assert.ok(new Set(articles.map(article => article.collection)).size >= 10, 'audit covers the collections');
  const found = articles.flatMap(article => accidentalSetextHeadings(article.content).map(item => `${article.file}: ${item.text}`));
  assert.deepEqual(found, []);
});

test('the corrected articles stay published and keep their media, emphasis and separators', async () => {
  const articles = await publishedArticles();
  const files = ['series/the-abyss-of-comfort', 'philosophies/abyss-as-deception', 'factions/bureaucracy-bros', 'laws/reltronland-citizenship-ethics', 'blog/rei-super-smash', 'principles/the-three-fronts-of-reltronalnd-pressure', 'organizations/reltronland-space-command'];
  for (const name of files) assert.ok(articles.some(article => article.file === `content/${name}.md`), name + ' is published');
  const smash = String(await render(articles.find(article => article.file.endsWith('rei-super-smash.md')).content));
  assert.equal((smash.match(/<img\b/g) || []).length, 4);
  assert.doesNotMatch(smash, /<h2[^>]*>(?:(?!<\/h2>)[\s\S])*<img/, 'no image inside a heading');
  const ethics = String(await render(articles.find(article => article.file.endsWith('reltronland-citizenship-ethics.md')).content));
  assert.match(ethics, /<p><em>Description:<\/em> Active violation of Astralis-aligned systems\n<em>Example:<\/em>[^<]*<\/p>\n<hr>\n<h2 id="iv-restoration-protocols"/);
  const deception = await render(articles.find(article => article.file.endsWith('abyss-as-deception.md')).content);
  assert.ok(!deception.data.articleHeadings.some(h => h.text.startsWith('title:')), 'embedded metadata is not a section');
  assert.match(String(deception), /<p>title: "🫧 Abyss of Seduction"\nslug: "abyss-of-seduction"/);
});
