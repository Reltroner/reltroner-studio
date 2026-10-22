import test from "node:test";
import assert from "node:assert/strict";
import { createResourceManifestEntry, RESOURCE_SOURCE_SHA, RESOURCE_FALLBACK_IMAGE, normalizeResourcePath, resolveResourceAsset, resolveResourceUrl } from "../lib/assets/resource-manifest.ts";
import { resolveStaticAssetUrl } from "../lib/assets/cdn.js";
import fs from "node:fs/promises";
import { resolveCdnImageUrl } from "../lib/assets/image.js";
import { createResourceSnapshot, serializeResourceSnapshot } from "../tools/generate-resource-manifest.mjs";
import { synchronizeResources, snapshotFromGithubTree, createHistoricalVerifier } from "../tools/sync-resource-manifest.mjs";
import { auditResourceReferences, collectDocumentReferences, collectPublishedReferences, KNOWN_MISSING_NON_BLOCKING } from "../tools/audit-resource-references.mjs";

test("first-party URLs are content addressed: changed bytes change the URL, unchanged bytes keep it", () => {
  const filename = "/images/direktori-listing.webp";
  const verified = (blob, sha256) => ({ blobSha: blob.repeat(40), sha256: sha256.repeat(64), bytes: 10 });
  const first = createResourceManifestEntry(filename, `landing-page-resource${filename}`, "a".repeat(40), verified("1", "c"));
  const unchanged = createResourceManifestEntry(filename, `landing-page-resource${filename}`, "b".repeat(40), verified("1", "c"));
  const changed = createResourceManifestEntry(filename, `landing-page-resource${filename}`, "b".repeat(40), verified("2", "d"));
  assert.equal(first.immutableUrl, `/resource-assets/${"c".repeat(64)}${filename}`);
  assert.equal(first.immutableUrl, unchanged.immutableUrl);
  assert.notEqual(first.immutableUrl, changed.immutableUrl);
  assert.notEqual(first.sourceSha, unchanged.sourceSha);
  assert.throws(() => createResourceManifestEntry(filename, `landing-page-resource${filename}`, "main", verified("1", "c")));
  assert.throws(() => createResourceManifestEntry(filename, `landing-page-resource${filename}`, "a".repeat(40)), /Verified Git blob/);
  assert.throws(() => createResourceManifestEntry(filename, `landing-page-resource${filename}`, "a".repeat(40), { ...verified("1", "c"), sha256: "bad" }));
});

test("resource tree pin preserves filenames and upgrades existing mutable URLs", () => {
  const logical = "/images/vierkernplatte.webp";
  const resource = resolveResourceAsset(logical);
  assert.equal(resource.sourceSha, RESOURCE_SOURCE_SHA);
  assert.match(resource.metadata.blobSha, /^[a-f0-9]{40}$/);
  assert.equal(resolveStaticAssetUrl(`https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource${logical}`), resource.immutableUrl);
  assert.equal(resource.immutableUrl.endsWith(logical), true);
  assert.equal(resource.immutableUrl.includes("@main/"), false);
  assert.ok(resource.immutableUrl.startsWith(`/resource-assets/${resource.metadata.sha256}/`));
  // An unverified historical pin never falls back to the jsDelivr transport.
  const unverified = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${"a".repeat(40)}/landing-page-resource${logical}`;
  assert.equal(resolveStaticAssetUrl(unverified), "");
  // A verified historical pin resolves to the bytes of its own revision.
  const pinned = resolveResourceAsset("/images/direktori-listing.webp", "50b259bf8db5b8c04baf0c0cb9b1cf11a32e9c70");
  assert.ok(pinned);
  assert.equal(resolveStaticAssetUrl(`https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${pinned.sourceSha}/landing-page-resource/images/direktori-listing.webp`), pinned.immutableUrl);
});

test("missing assets and traversal fail safely", () => {
  // Only the two owner-approved missing images receive the placeholder; others fail closed.
  assert.equal(resolveResourceUrl("/images/not-an-existing-resource.webp"), null);
  assert.equal(resolveStaticAssetUrl("/images/not-an-existing-resource.webp"), "");
  assert.equal(resolveStaticAssetUrl("/resource-assets/" + "0".repeat(64) + "/images/vierkernplatte.webp"), "");
  assert.equal(resolveResourceUrl("/files/not-an-existing-resource.pdf"), null);
  for (const value of ["/images/../secret", "/images/%2e%2e/secret", "/images//file.webp", "javascript:alert(1)", "https://evil.example/images/direktori-listing.webp"]) assert.equal(normalizeResourcePath(value), null);
  assert.throws(() => createResourceManifestEntry("/images/a.webp", "landing-page-resource/images/b.webp", "a".repeat(40)));
});

test("the four recovered images resolve to verified first-party files at the current resource commit", () => {
  for (const filename of ["vierkernplatte.webp", "about-rei-27.webp", "reltroner-studio-communication-framework.webp", "explore-page-25.webp"]) {
    const logical = `/images/${filename}`;
    const asset = resolveResourceAsset(logical);
    assert.ok(asset);
    assert.equal(asset.sourceSha, RESOURCE_SOURCE_SHA);
    assert.match(asset.metadata.blobSha, /^[a-f0-9]{40}$/);
    assert.ok(asset.metadata.bytes > 0);
    assert.equal(resolveCdnImageUrl(logical), asset.immutableUrl);
    assert.equal(asset.immutableUrl, `/resource-assets/${asset.metadata.sha256}${logical}`);
    assert.doesNotMatch(asset.immutableUrl, /jsdelivr/i);
    assert.notEqual(resolveCdnImageUrl(logical), RESOURCE_FALLBACK_IMAGE);
  }
});

const sourceSha = "1".repeat(40);
const treeSha = "2".repeat(40);
const blobSha = "3".repeat(40);
const resourcePath = "landing-page-resource/images/current.webp";
const record = { path: resourcePath, blobSha, bytes: 25 };
const refs = { published: 1, references: [{ value: "/images/current.webp", sourcePath: "fixture" }] };
const tree = () => ({ sha: treeSha, truncated: false, tree: [{ path: resourcePath, sha: blobSha, size: 25, mode: "100644", type: "blob" }] });

function upstream(sha = sourceSha, inventory = tree()) {
  const calls = [];
  return {
    calls,
    fetchImpl: async (url, options) => {
      calls.push(url);
      assert.ok(options.signal instanceof AbortSignal);
      assert.equal(options.method, undefined); // Read-only GET requests.
      if (url.endsWith("/commits/main")) return Response.json({ sha, commit: { tree: { sha: treeSha } } });
      assert.ok(url.endsWith(`/git/trees/${treeSha}?recursive=1`));
      return Response.json(inventory);
    },
  };
}

test("one mutable lookup selects a single immutable inventory before writing", async () => {
  const remote = upstream();
  const writes = [];
  const result = await synchronizeResources({ fetchImpl: remote.fetchImpl, collect: async () => refs, write: async (...args) => writes.push(args) });
  assert.equal(remote.calls.length, 2);
  assert.equal(remote.calls.filter(url => url.endsWith("/commits/main")).length, 1);
  assert.equal(result.snapshot.sourceSha, sourceSha);
  assert.ok(result.report.assets.every(asset => asset.sourceSha === sourceSha && asset.status === "PASS"));
  assert.equal(writes.length, 1);
  assert.equal(JSON.parse(writes[0][1]).sourceSha, sourceSha);
});

test("stable upstream output is deterministic and a replacement commit is detected", async () => {
  const outputs = [];
  for (const sha of [sourceSha, sourceSha, "4".repeat(40)]) {
    const { snapshot } = await synchronizeResources({ ...upstream(sha), collect: async () => refs, write: async (_, body) => outputs.push(body) });
    assert.equal(snapshot.sourceSha, sha);
  }
  assert.equal(outputs[0], outputs[1]);
  assert.notEqual(outputs[0], outputs[2]);
  assert.equal(JSON.parse(outputs[2]).sourceSha, "4".repeat(40));
  const other = { path: "landing-page-resource/files/a.pdf", blobSha, bytes: 10 };
  assert.equal(serializeResourceSnapshot(createResourceSnapshot(sourceSha, [record, other])), serializeResourceSnapshot(createResourceSnapshot(sourceSha, [other, record])));
});

test("upstream errors, incomplete trees and missing required assets never write a successful snapshot", async () => {
  let writes = 0;
  const write = async () => { writes++; };
  await assert.rejects(synchronizeResources({ fetchImpl: async () => new Response("Unavailable", { status: 503 }), collect: async () => refs, write }), /HTTP 503/);
  await assert.rejects(synchronizeResources({ fetchImpl: async () => { throw new Error("Network timeout"); }, collect: async () => refs, write }), /Network timeout/);
  for (const bad of [{ ...tree(), truncated: true }, { ...tree(), sha: "5".repeat(40) }, { ...tree(), tree: [] }, { ...tree(), tree: [{ ...tree().tree[0], mode: "120000" }] }]) {
    await assert.rejects(synchronizeResources({ ...upstream(sourceSha, bad), collect: async () => refs, write }));
  }
  await assert.rejects(synchronizeResources({ ...upstream(), collect: async () => ({ published: 1, references: [{ value: "/images/missing.webp", sourcePath: "fixture" }] }), write }), /Missing resource/);
  await assert.rejects(synchronizeResources({ ...upstream("main"), collect: async () => refs, write }), /40-character/);
  assert.equal(writes, 0);
});

test("snapshot validation rejects unsafe paths, invalid blobs, duplicate records and empty resources", () => {
  for (const path of ["landing-page-resource/images/../secret", "landing-page-resource/images/%2e%2e/secret", "landing-page-resource/images//file.webp", "landing-page-resource/images/./file.webp", "unapproved/images/file.webp"]) {
    assert.throws(() => createResourceSnapshot(sourceSha, [{ ...record, path }]));
  }
  assert.throws(() => createResourceSnapshot(sourceSha, [{ ...record, blobSha: "main" }]));
  assert.throws(() => createResourceSnapshot(sourceSha, [{ ...record, bytes: 0 }]));
  assert.throws(() => createResourceSnapshot(sourceSha, [record, record]));
  assert.throws(() => snapshotFromGithubTree(sourceSha, { ...tree(), truncated: true }, treeSha));
});

test("only the two exact owner-approved missing paths are exempt and still resolve to runtime fallback", async () => {
  const references = ["/images/skytropolis.webp", "/images/reltronland-map.webp", "/images/nested/skytropolis.webp", "/images/another-missing.webp", "/images/../skytropolis.webp"].map(value => ({ value, sourcePath: "fixture" }));
  const report = await auditResourceReferences(createResourceSnapshot(sourceSha, [record]), { references });
  assert.deepEqual(report.assets.filter(a => a.status === "EXEMPT").map(a => a.asset), ["/images/reltronland-map.webp", "/images/skytropolis.webp"]);
  assert.ok(report.assets.filter(a => a.status === "EXEMPT").every(a => a.classification === "KNOWN_MISSING_NON_BLOCKING"));
  assert.equal(report.failures.length, 3);
  for (const value of references.slice(0, 2).map(r => r.value)) {
    const resource = resolveResourceAsset(value);
    if (!resource) assert.equal(resolveCdnImageUrl(value), RESOURCE_FALLBACK_IMAGE);
    else assert.equal(resource.sourceSha, RESOURCE_SOURCE_SHA);
  }
});

test("media audit reads actual frontmatter, Markdown references and HTML rather than prose or code samples", () => {
  const source = '---\npublished: true\nimage: /images/cover.webp\n---\n![Inline](/images/inline.webp)\n\n![Reference][art]\n\n[art]: /images/reference.webp\n\n<img src="/images/html.webp" alt="Example">\n\nimage: /images/prose.webp\n\n`![Example](/images/code.webp)`\n\n```html\n<img src="/images/code-block.webp">\n```\n';
  assert.deepEqual(collectDocumentReferences(source, "fixture").map(r => r.value), ["/images/cover.webp", "/images/inline.webp", "/images/reference.webp", "/images/html.webp"]);
  for (const publication of ['published: false', 'private: true', 'draft: true']) assert.equal(collectDocumentReferences(`---\n${publication}\nimage: /images/private.webp\n---\n![private](/images/private.webp)`, "private"), null);
});

test("historical images require verification of their exact immutable tree and retain provenance", async () => {
  const oldSha = "a".repeat(40);
  const value = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${oldSha}/${resourcePath}`;
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    // The pinned commit itself selects its tree; no mutable reference is consulted.
    assert.ok(url.endsWith(`/git/trees/${oldSha}?recursive=1`));
    return Response.json(tree());
  };
  const report = await auditResourceReferences(createResourceSnapshot(sourceSha, [record]), { references: [{ value, sourcePath: "historical" }] }, { verifyHistorical: createHistoricalVerifier(fetchImpl) });
  assert.equal(report.failures.length, 0);
  assert.equal(report.assets[0].sourceSha, oldSha);
  assert.equal(calls.length, 1);
  const unverified = await auditResourceReferences(createResourceSnapshot(sourceSha, [record]), { references: [{ value, sourcePath: "historical" }] });
  assert.equal(unverified.failures.length, 1);
  const truncated = async () => Response.json({ ...tree(), truncated: true });
  const rejected = await auditResourceReferences(createResourceSnapshot(sourceSha, [record]), { references: [{ value, sourcePath: "historical" }] }, { verifyHistorical: createHistoricalVerifier(truncated) }).catch(error => error);
  assert.match(String(rejected), /incomplete/);
});

test("encoded traversal, unauthorized origins and cache-busting URLs cannot bypass resource checks", () => {
  const base = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${RESOURCE_SOURCE_SHA}/landing-page-resource`;
  for (const value of [`${base}/images/%2e%2e/files/a.pdf`, `${base}/images/current.webp?time=1`, `${base}/images/current.webp#x`, `${base.replace('cdn.jsdelivr.net', 'cdn.jsdelivr.net:8443')}/images/current.webp`, '/images/%252e%252e/secret', 'data:image/svg+xml,unsafe', 'https://evil.example/images/about-rei-27.webp']) assert.equal(normalizeResourcePath(value), null);
});

test("the production npm build runs synchronization before Next compilation and verifies the export after it", async () => {
  const { scripts } = JSON.parse(await fs.readFile('package.json', 'utf8'));
  assert.equal(scripts.prebuild, 'npm run assets:sync');
  assert.match(scripts['assets:sync'], /tools\/sync-first-party-assets\.mjs$/);
  assert.equal(scripts.build, 'next build');
  assert.match(scripts.postbuild, /&& npm run assets:verify$/);
  assert.match(scripts['assets:verify'], /tools\/verify-first-party-export\.mjs$/);
  assert.equal(scripts['resources:sync'], undefined); // No second, snapshot-only synchronization path.
});

test("all current published resource references resolve with only the two explicit exemptions", async () => {
  const snapshot = JSON.parse(await fs.readFile('lib/assets/resource-snapshot.json', 'utf8'));
  const collected = await collectPublishedReferences();
  const report = await auditResourceReferences(snapshot, collected);
  assert.deepEqual(report.failures, []);
  // Whether an approved missing image is referenced depends on published content; no other path may be exempt.
  const exempt = report.assets.filter(a => a.status === 'EXEMPT');
  assert.ok(exempt.every(a => KNOWN_MISSING_NON_BLOCKING.includes(a.asset) && a.classification === 'KNOWN_MISSING_NON_BLOCKING' && !resolveResourceAsset(a.asset)));
  for (const { value } of collected.references) {
    const resource = resolveResourceAsset(value);
    if (!resource) assert.ok(KNOWN_MISSING_NON_BLOCKING.includes(normalizeResourcePath(value)));
    else assert.equal(resource.sourceSha, value.match(/@([a-f0-9]{40})\//i)?.[1].toLowerCase() || RESOURCE_SOURCE_SHA);
  }
});

test("collection and rendered article covers share the snapshot URL while Rei's inline illustration remains", async () => {
  const { getCollectionEntries, getCollectionEntry } = await import('../lib/utils/content.js');
  const optionalEditorialPath = 'content/principles/reltroner-studio-communication-framework.md';

  assert.ok(
    resolveResourceAsset('/images/reltroner-studio-communication-framework.webp'),
    'Communication Framework cover must exist in the verified asset manifest'
  );

  for (const [collection, slug, filename] of [
    ['principles', 'reltroner-studio-communication-framework', 'reltroner-studio-communication-framework.webp'],
    ['characters', 'rei-reltroner', 'about-rei-27.webp']
  ]) {
    const contentPath = `content/${collection}/${slug}.md`;

    let sourceExists = true;
    try {
      await fs.access(contentPath);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
      sourceExists = false;
    }

    if (!sourceExists) {
      assert.equal(
        contentPath,
        optionalEditorialPath,
        `Required release content missing: ${contentPath}`
      );
      continue;
    }

    const card = (await getCollectionEntries(collection))
      .find(entry => entry.slug === slug);

    const article = await getCollectionEntry(collection, slug);
    const expected = resolveCdnImageUrl(`/images/${filename}`);

    assert.ok(card, `Published collection entry missing: ${contentPath}`);
    assert.ok(article?.entry, `Rendered article missing: ${contentPath}`);

    assert.equal(card.image, expected);
    assert.equal(article.entry.image, expected);

    if (collection === 'characters') {
      assert.ok(
        article.contentHtml.includes(
          resolveCdnImageUrl('/images/rei-reltroner1.webp')
        ),
        'Rei inline illustration must remain rendered'
      );
    }
  }
});
