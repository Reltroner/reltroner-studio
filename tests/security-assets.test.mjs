import test from "node:test";
import assert from "node:assert/strict";
import { createResourceManifestEntry, RESOURCE_SOURCE_SHA, RESOURCE_FALLBACK_IMAGE, normalizeResourcePath, resolveResourceAsset, resolveResourceUrl } from "../lib/assets/resource-manifest.ts";
import { resolveStaticAssetUrl } from "../lib/assets/cdn.js";

test("same-filename revisions resolve to different immutable commit URLs", () => {
  const filename = "/images/direktori-listing.webp";
  const first = createResourceManifestEntry(filename, `landing-page-resource${filename}`, "a".repeat(40));
  const second = createResourceManifestEntry(filename, `landing-page-resource${filename}`, "b".repeat(40));
  assert.equal(first.logicalPath, second.logicalPath);
  assert.notEqual(first.immutableUrl, second.immutableUrl);
  assert.ok(second.immutableUrl.includes(`@${"b".repeat(40)}/`));
  assert.throws(() => createResourceManifestEntry(filename, `landing-page-resource${filename}`, "main"));
});

test("resource tree pin preserves filenames and upgrades existing mutable URLs", () => {
  const logical = "/images/direktori-listing.webp";
  const resource = resolveResourceAsset(logical);
  assert.equal(resource.sourceSha, RESOURCE_SOURCE_SHA);
  assert.equal(resource.metadata.blobSha, "04ae261ff50c9eef818a219893740c07f86b0e33");
  assert.equal(resolveStaticAssetUrl(`https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource${logical}`), resource.immutableUrl);
  assert.equal(resource.immutableUrl.endsWith(logical), true);
  assert.equal(resource.immutableUrl.includes("@main/"), false);
  const historical = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${"a".repeat(40)}/landing-page-resource${logical}`;
  assert.equal(resolveStaticAssetUrl(historical), historical);
});

test("missing assets and traversal fail safely", () => {
  assert.equal(resolveResourceUrl("/images/not-an-existing-resource.webp"), RESOURCE_FALLBACK_IMAGE);
  assert.equal(resolveResourceUrl("/files/not-an-existing-resource.pdf"), null);
  for (const value of ["/images/../secret", "/images/%2e%2e/secret", "/images//file.webp", "javascript:alert(1)", "https://evil.example/images/direktori-listing.webp"]) assert.equal(normalizeResourcePath(value), null);
  assert.throws(() => createResourceManifestEntry("/images/a.webp", "landing-page-resource/images/b.webp", "a".repeat(40)));
});
