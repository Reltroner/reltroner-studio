import test from "node:test";
import assert from "node:assert/strict";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { enforcePublicUrls, markdownHtmlOptions } from "../lib/security/markdown-rendering.ts";
import { safePublicLink } from "../lib/security/urls.ts";
import { injectVideoEmbeds, isSafeEmbedUrl, normalizeVideoSource, processVideoDirectives } from "../lib/utils/videoEmbeds.ts";

async function render(source) {
  const { transformedMarkdown, placeholders } = processVideoDirectives(source);
  const rendered = await remark().use(gfm).use(enforcePublicUrls).use(html, markdownHtmlOptions).process(transformedMarkdown);
  return injectVideoEmbeds(String(rendered), placeholders);
}

test("Markdown rejects dangerous HTML and executable URI schemes", async () => {
  const output = await render(`<script>alert(1)</script><svg><script>alert(2)</script></svg><object data="https://evil.example"></object>\n\n<img src="/images/direktori-listing.webp" onerror="alert(3)" style="background:url(javascript:alert(4))">\n\n<a href="jav&#x61;script:alert(5)">unsafe</a>\n\n[unsafe](javascript:alert%286%29)\n\n[encoded](data:text/html,hello)\n\n[relative](//evil.example)\n\n<iframe src="https://evil.example/video.mp4"></iframe>`);
  assert.doesNotMatch(output, /<script|<svg|<object|<iframe|onerror=|style=|href="(?:javascript|data|\/\/)/i);
  assert.match(output, /direktori-listing\.webp/);
  assert.match(output, /#blocked-link/);
});

test("known safe authored media, links and Markdown features survive sanitation", async () => {
  const output = await render(`<iframe src="https://www.youtube.com/embed/9AjCHJio8d8" title="Terminal Sunrise" allowfullscreen></iframe>\n\n<video controls><source src="https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/videos/reltronland-part1.mp4" type="video/mp4"></video>\n\n<div><a href="/files/creative-lore-bible.pdf" target="_blank">Download</a></div>\n\n<details><summary>More</summary><p>Known safe text</p></details>\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n- [x] Complete`);
  assert.match(output, /youtube-nocookie\.com\/embed\/9AjCHJio8d8/);
  assert.match(output, /sandbox="allow-scripts allow-same-origin allow-presentation"/);
  assert.match(output, /<video controls/);
  assert.match(output, /reltronland-part1\.mp4/);
  assert.doesNotMatch(output, /@main/);
  assert.match(output, /creative-lore-bible\.pdf/);
  assert.match(output, /<details>/);
  assert.match(output, /<table>/);
  assert.match(output, /type="checkbox"/);
});

test("video allowlist uses strict HTTPS origins and nonexecutable fallback links", async () => {
  for (const value of ["http://www.youtube-nocookie.com/embed/9AjCHJio8d8", "https://youtube.com.evil.example/embed/9AjCHJio8d8", "https://evil.example/a.mp4", "https://www.youtube-nocookie.com:8443/embed/9AjCHJio8d8", "https://attacker@www.youtube-nocookie.com/embed/9AjCHJio8d8"]) assert.equal(isSafeEmbedUrl(value), false);
  assert.equal(isSafeEmbedUrl(normalizeVideoSource("https://youtu.be/9AjCHJio8d8").src), true);
  for (const value of ["javascript:alert(1)", "data:text/html,x", "//evil.example", "https://safe.example/\nunsafe"]) assert.equal(safePublicLink(value), null);
  const output = await render('::video{src="javascript:alert(1)" title="Unsafe"}');
  assert.doesNotMatch(output, /href=|<iframe|<video/);
  assert.match(output, /Unsafe video source was blocked/);
});

test("an image-adjacent authored video becomes one playable media block", async () => {
  const source = `![Beluftner](/images/beluftnerball.webp)\n<video controls style="width:100%"><source src="https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/videos/beluftner-part1.mp4" type="video/mp4" />\nYour browser does not support the video tag.\n</video>`;
  const output = await render(source);
  assert.match(output, /<video controls src="https:\/\/cdn\.jsdelivr\.net\/gh\/Reltroner\/reltroner-studio-resource@[a-f0-9]{40}\/landing-page-resource\/videos\/beluftner-part1\.mp4"/);
  assert.equal((output.match(/<video/g) || []).length, 1);
  assert.doesNotMatch(output, /<source|Your browser does not support|style=/);
  assert.match(output, /data-native-video data-media-state="loading"/);
});

test("media preprocessing preserves literal code and rebuilds only validated attributes", async () => {
  const example = '::video{src="https://youtu.be/9AjCHJio8d8"}';
  const output = await render(`\`${example}\`\n\n\`\`\`html\n<video src="https://evil.example/attack.mp4"></video>\n\`\`\`\n\n<iframe src="https://www.youtube.com/embed/9AjCHJio8d8" onload="alert(1)" referrerpolicy="no-referrer" title="&lt;unsafe&gt;"></iframe>`);
  assert.match(output, /<code>::video/);
  assert.match(output, /(?:&lt;|&#x3C;)video/i);
  assert.doesNotMatch(output, /onload=|referrerpolicy="no-referrer"/);
  assert.match(output, /referrerpolicy="strict-origin-when-cross-origin"/);
  assert.match(output, /title="&lt;unsafe&gt;"/);
});
