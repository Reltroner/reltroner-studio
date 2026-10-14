import test from 'node:test';import assert from 'node:assert/strict';
import {remark} from 'remark';import gfm from 'remark-gfm';import html from 'remark-html';
import {articleMarkdownHtml} from '../lib/content/markdown-renderer.ts';
import {enforcePublicUrls,markdownHtmlOptions} from '../lib/security/markdown-rendering.ts';
const slugify=text=>text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'section';
async function render(source){return remark().use(gfm).use(enforcePublicUrls).use(articleMarkdownHtml,{slugify}).process(source);}

test('Markdown heading depth, inline formatting and outline levels stay in agreement',async()=>{
const file=await render('# ✏️ **One**\n\n## Two *italic*\n\n### Three `code`\n\n#### Four\n\nNormal paragraph.');
assert.deepEqual(file.data.articleHeadings.map(h=>h.level),[1,2,3,4]);
for(const [depth,id] of [[1,'one'],[2,'two-italic'],[3,'three-code'],[4,'four']])assert.match(String(file),new RegExp(`<h${depth} id="${id}" class="archive-heading">`));
assert.match(String(file),/<strong>One<\/strong>/);assert.match(String(file),/<em>italic<\/em>/);assert.match(String(file),/<code>code<\/code>/);assert.match(String(file),/<p>Normal paragraph\.<\/p>/);
});

test('repeated, accented and naturally suffixed titles get stable unique IDs',async()=>{
const source='# Réi & Co.\n\n## Réi & Co.\n\n### Réi & Co.-2\n\n#### Réi & Co.\n\n# ✨';
const a=await render(source),b=await render(source);
assert.deepEqual(a.data.articleHeadings,b.data.articleHeadings);
assert.deepEqual(a.data.articleHeadings.map(h=>h.id),['rei-co','rei-co-2','rei-co-2-2','rei-co-3','section']);
assert.equal(new Set(a.data.articleHeadings.map(h=>h.id)).size,5);
});

test('heading-like fenced/inline code stays literal and never enters the outline',async()=>{
const file=await render('# Actual\n\n`## Inline literal`\n\n```md\n# Fenced one\n## Fenced two\n### Fenced three\n#### Fenced four\n```');
assert.deepEqual(file.data.articleHeadings.map(h=>h.text),['Actual']);
assert.equal((String(file).match(/<h[1-4] /g)||[]).length,1);assert.match(String(file),/<code>## Inline literal<\/code>/);assert.match(String(file),/<pre><code/);
});

test('the existing public sanitizer and non-heading Markdown output are preserved',async()=>{
const source='<script>alert(1)</script>\n\n<img src="/images/graphicorespec.webp" onerror="alert(2)">\n\n[unsafe](javascript:alert%281%29)\n\n[safe](/items)\n\n> Quote\n\n- **Bold**\n- *Italic*\n\n| A | B |\n| - | - |\n| 1 | 2 |';
const file=await render(source);
assert.doesNotMatch(String(file),/<script|onerror=|javascript:/i);assert.match(String(file),/href="\/items"/);assert.match(String(file),/<blockquote>/);assert.match(String(file),/<table>/);
const previous=await remark().use(gfm).use(enforcePublicUrls).use(html,markdownHtmlOptions).process(source);
assert.equal(String(file),String(previous));
});
