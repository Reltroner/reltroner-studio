import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { resolveHomepageImage, HOMEPAGE_IMAGE_IDS } from "../lib/assets/homepage-assets.mjs";
import { RESOURCE_SOURCE_SHA, RESOURCE_FALLBACK_IMAGE, requireResourceUrl, resolveResourceAsset, resolveResourceUrl } from "../lib/assets/resource-manifest.ts";
import { KNOWN_MISSING_NON_BLOCKING, firstPartyResourceUrl, normalizeResourcePath } from "../lib/assets/resource-paths.mjs";
import { MANDATORY_ASSETS, discoverSourceReferences, gitBlobSha, synchronizeFirstPartyAssets, validateAssetBytes } from "../tools/sync-first-party-assets.mjs";
import { verifyFirstPartyExport } from "../tools/verify-first-party-export.mjs";
import { assertApprovedGithubUrl, createGithubClient } from "../tools/sync-resource-manifest.mjs";

const manifest = JSON.parse(await fs.readFile("lib/assets/generated/first-party-manifest.json", "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

test("the generated manifest binds one resource commit, Git blobs, SHA-256 digests and confined URLs", () => {
  assert.match(manifest.sourceSha, /^[a-f0-9]{40}$/);
  assert.equal(RESOURCE_SOURCE_SHA, manifest.sourceSha);
  const keys = new Set();
  for (const entry of manifest.entries) {
    assert.match(entry.sourceSha, /^[a-f0-9]{40}$/);
    assert.match(entry.blobSha, /^[a-f0-9]{40}$/);
    assert.match(entry.sha256, /^[a-f0-9]{64}$/);
    assert.equal(entry.resourcePath, `landing-page-resource${entry.logicalPath}`);
    assert.equal(normalizeResourcePath(entry.logicalPath), entry.logicalPath);
    assert.equal(entry.url, firstPartyResourceUrl(entry.logicalPath, entry.sha256));
    assert.ok(!keys.has(`${entry.sourceSha}:${entry.logicalPath}`));
    keys.add(`${entry.sourceSha}:${entry.logicalPath}`);
  }
});

test("the four mandatory images are exported as verified bytes at the current commit, with no third exemption", async () => {
  assert.deepEqual([...KNOWN_MISSING_NON_BLOCKING].sort(), ["/images/reltronland-map.webp", "/images/skytropolis.webp"]);
  for (const logical of MANDATORY_ASSETS) {
    assert.ok(!KNOWN_MISSING_NON_BLOCKING.includes(logical));
    const entry = manifest.entries.find(item => item.sourceSha === manifest.sourceSha && item.logicalPath === logical);
    assert.ok(entry, `mandatory image missing: ${logical}`);
    assert.equal(resolveResourceUrl(logical), entry.url);
    assert.notEqual(resolveResourceUrl(logical), RESOURCE_FALLBACK_IMAGE);
    const bytes = await fs.readFile(path.join("public/resource-assets", entry.sha256, ...logical.split("/")));
    assert.equal(bytes.length, entry.bytes);
    assert.equal(gitBlobSha(bytes), entry.blobSha);
    assert.equal(sha256(bytes), entry.sha256);
    assert.equal(bytes.toString("ascii", 0, 4) + bytes.toString("ascii", 8, 12), "RIFFWEBP");
  }
});

test("intentionally pinned homepage and component artwork resolves to its own historical revision", async () => {
  for (const id of HOMEPAGE_IMAGE_IDS) {
    const image = resolveHomepageImage(id);
    const entry = resolveResourceAsset(`/images/${image.filename}`, image.sourceSha);
    assert.ok(entry);
    assert.equal(image.url, entry.immutableUrl);
    assert.match(image.url, /^\/resource-assets\/[a-f0-9]{64}\/images\/home-page-\d+\.webp$/);
  }
  assert.equal(resolveHomepageImage(505).sourceSha, "b30ac75b2d4989939c21dd6a9109fbe911ff924d");
  for (const file of ["components/worldbuilding/EditorialCdnArt.tsx", "components/worldbuilding/ExploreAboutCdnImage.tsx", "components/ecosystem/SelectedWorkShowcase.tsx"]) {
    const source = await fs.readFile(file, "utf8");
    assert.doesNotMatch(source, /cdn\.jsdelivr\.net/);
    const { references } = discoverSourceReferences(source, file);
    const pinned = references.filter(reference => reference.sourceSha);
    assert.ok(pinned.length >= 2, file);
    for (const reference of pinned) assert.equal(requireResourceUrl(reference.value, reference.sourceSha), resolveResourceAsset(reference.value, reference.sourceSha).immutableUrl);
  }
  assert.throws(() => requireResourceUrl("/images/vierkernplatte.webp", "f".repeat(40)), /not in the verified first-party manifest/);
});

test("source discovery reads declared pins and rejects unsafe declarations", () => {
  const source = `const sourceCommit = '${"a".repeat(40)}';\nconst sourceCommitOverrides = { 2: '${"b".repeat(40)}' };\nconst artwork = { 1: ['one.webp', 1, 1, 'One'], 2: ['two.webp', 1, 1, 'Two'] } as const;\nconst pin = '${"c".repeat(40)}';\nexport const x = requireResourceUrl('/images/three.webp', pin);\nexport const y = '/files/guide.pdf';`;
  const { references } = discoverSourceReferences(source, "fixture.tsx");
  assert.deepEqual(references.map(reference => [reference.value, reference.sourceSha]), [["/images/one.webp", "a".repeat(40)], ["/images/two.webp", "b".repeat(40)], ["/images/three.webp", "c".repeat(40)], ["/files/guide.pdf", undefined]]);
  assert.throws(() => discoverSourceReferences(`const sourceCommit = 'main';\nconst artwork = { 1: ['one.webp'] };`, "fixture.tsx"), /40-character/);
  assert.throws(() => discoverSourceReferences(`const sourceCommit = '${"a".repeat(40)}';\nconst artwork = { 1: ['../secret.webp'] };`, "fixture.tsx"), /Unsafe declared asset/);
});

test("byte validation rejects HTML responses, wrong sizes and misleading signatures even when the blob matches", () => {
  const html = Buffer.from("<!doctype html><title>Not found</title>");
  const webpInfo = { blobSha: gitBlobSha(webp("real")), bytes: webp("real").length };
  assert.throws(() => validateAssetBytes("/images/a.webp", webpInfo, html), /Git blob integrity mismatch/);
  assert.throws(() => validateAssetBytes("/images/a.webp", { blobSha: gitBlobSha(html), bytes: html.length }, html), /misleading file signature/);
  assert.throws(() => validateAssetBytes("/images/a.webp", { ...webpInfo, bytes: 26 * 1024 * 1024 }, webp("real")), /25 MiB/);
  assert.match(validateAssetBytes("/images/a.webp", webpInfo, webp("real")), /^[a-f0-9]{64}$/);
  for (const value of ["/images/../a.webp", "/images/%2e%2e/a.webp", "/images/a.svg", "javascript:alert(1)", "https://evil.example/images/a.webp", "http://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/images/a.webp", "/resource-assets/xyz/images/a.webp"]) assert.equal(normalizeResourcePath(value), null);
});

// ---- Synchronization against a simulated, read-only GitHub upstream (no network) ----

function webp(seed) {
  const payload = Buffer.from(`VP8 fixture ${seed}`);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "ascii");
  header.writeUInt32LE(payload.length + 4, 4);
  header.write("WEBP", 8, "ascii");
  return Buffer.concat([header, payload]);
}

const MAIN_1 = "1".repeat(40), MAIN_2 = "2".repeat(40), PINNED = "9".repeat(40);

function upstream(commits, main) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push(url);
    assert.equal(options?.method, undefined); // GET only.
    const api = "https://api.github.com/repos/Reltroner/reltroner-studio-resource";
    const raw = "https://raw.githubusercontent.com/Reltroner/reltroner-studio-resource/";
    if (url === `${api}/commits/main`) return Response.json({ sha: main, commit: { tree: { sha: `e${main.slice(1)}` } } });
    // Tree SHAs are the commit SHA with a leading "e"; pinned commits are requested directly.
    const treeMatch = url.match(/\/git\/trees\/([a-f0-9]{40})\?recursive=1$/);
    if (url.startsWith(api) && treeMatch) {
      const sha = treeMatch[1].startsWith("e") ? `${main[0]}${treeMatch[1].slice(1)}` : treeMatch[1];
      const files = commits[sha];
      if (!files) return new Response("Not Found", { status: 404 });
      return Response.json({ sha: `e${sha.slice(1)}`, truncated: false, tree: Object.entries(files).map(([file, bytes]) => ({ path: `landing-page-resource${file}`, mode: "100644", type: "blob", sha: gitBlobSha(bytes), size: bytes.length })) });
    }
    if (url.startsWith(raw)) {
      const [sha, ...rest] = url.slice(raw.length).split("/");
      const bytes = commits[sha]?.[decodeURIComponent(`/${rest.slice(1).join("/")}`)];
      return bytes ? new Response(commits.serveHtml ? "<!doctype html>" : bytes, { status: 200 }) : new Response("Not Found", { status: 404 });
    }
    throw new Error(`Unexpected upstream request: ${url}`);
  };
  return { calls, fetchImpl };
}

async function fixtureRoot() {
  const base = path.resolve(".next/cache/first-party-asset-tests");
  await fs.mkdir(base, { recursive: true });
  const root = await fs.mkdtemp(path.join(base, "root-"));
  await fs.mkdir(path.join(root, "app"), { recursive: true });
  await fs.mkdir(path.join(root, "lib/assets"), { recursive: true });
  await fs.writeFile(path.join(root, "app/page.tsx"), `const pin = '${PINNED}';\nexport const current = '/images/a.webp';\nexport const historical = requireResourceUrl('/images/a.webp', pin);\n`);
  await fs.writeFile(path.join(root, "lib/assets/homepage-assets.mjs"), "export const HOMEPAGE_IMAGE_IDS = Object.freeze([]);\n");
  await fs.writeFile(path.join(root, "lib/assets/homepage-revisions.json"), JSON.stringify({ baseCommit: PINNED, overrides: {} }));
  return root;
}

function mandatoryFiles(seed) {
  return Object.fromEntries(MANDATORY_ASSETS.map(file => [file, webp(`${file}-${seed}`)]));
}

const collect = async () => ({ published: 1, references: [{ value: "/images/b.webp", sourcePath: "content/fixture.md" }, { value: "/images/skytropolis.webp", sourcePath: "content/places/skytropolis.md" }] });
const readManifest = async root => JSON.parse(await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8"));
const urlFor = (result, logical, sha) => result.entries.find(entry => entry.logicalPath === logical && entry.sourceSha === sha)?.url;

test("synchronization detects a new upstream commit once, keeps unchanged URLs, changes changed URLs and keeps pinned bytes", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const commits = {
    [PINNED]: { ...mandatoryFiles("old"), "/images/a.webp": webp("a-historical") },
    [MAIN_1]: { ...mandatoryFiles("1"), "/images/a.webp": webp("a-1"), "/images/b.webp": webp("b-stable") },
    [MAIN_2]: { ...mandatoryFiles("1"), "/images/a.webp": webp("a-2"), "/images/b.webp": webp("b-stable") },
  };
  const first = upstream(commits, MAIN_1);
  const one = await synchronizeFirstPartyAssets({ root, fetchImpl: first.fetchImpl, collect, log: null });
  assert.equal(one.sourceSha, MAIN_1);
  assert.equal(first.calls.filter(url => url.endsWith("/commits/main")).length, 1);
  // Every downloaded byte comes from the resolved commit or an explicit pin, never from a branch name.
  const rawCalls = first.calls.filter(url => url.startsWith("https://raw.githubusercontent.com/"));
  assert.ok(rawCalls.every(url => url.includes(`/${MAIN_1}/`) || url.includes(`/${PINNED}/`)));
  assert.ok(rawCalls.some(url => url.includes(`/${PINNED}/landing-page-resource/images/a.webp`)));
  assert.ok(!first.calls.some(url => /@main|\/main\//.test(url)));
  // Approved missing images are not fabricated; the logical reference stays a runtime placeholder.
  assert.ok(!one.entries.some(entry => entry.logicalPath === "/images/skytropolis.webp"));

  const historicalUrl = urlFor(one, "/images/a.webp", PINNED);
  assert.equal(historicalUrl, firstPartyResourceUrl("/images/a.webp", sha256(webp("a-historical"))));
  assert.deepEqual(await fs.readFile(path.join(root, "public/resource-assets", sha256(webp("a-historical")), "images/a.webp")), webp("a-historical"));

  const repeat = await synchronizeFirstPartyAssets({ root, fetchImpl: upstream(commits, MAIN_1).fetchImpl, collect, log: null });
  assert.deepEqual(repeat.entries, one.entries);
  const manifestOne = await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8");

  const second = upstream(commits, MAIN_2);
  const two = await synchronizeFirstPartyAssets({ root, fetchImpl: second.fetchImpl, collect, log: null });
  assert.equal(two.sourceSha, MAIN_2);
  assert.equal((await readManifest(root)).sourceSha, MAIN_2);
  assert.notEqual(await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8"), manifestOne);
  assert.notEqual(urlFor(two, "/images/a.webp", MAIN_2), urlFor(one, "/images/a.webp", MAIN_1));
  assert.equal(urlFor(two, "/images/b.webp", MAIN_2), urlFor(one, "/images/b.webp", MAIN_1));
  assert.equal(urlFor(two, "/images/a.webp", PINNED), historicalUrl);
  // Unchanged blobs come from the verified local cache instead of a second download.
  assert.ok(!second.calls.some(url => url.endsWith("/images/b.webp")));
  // The export directory holds exactly the current verified set.
  const exported = [];
  for (const digest of await fs.readdir(path.join(root, "public/resource-assets"))) exported.push(digest);
  assert.deepEqual(exported.sort(), [...new Set(two.entries.map(entry => entry.sha256))].sort());
  const snapshot = JSON.parse(await fs.readFile(path.join(root, "lib/assets/resource-snapshot.json"), "utf8"));
  assert.equal(snapshot.sourceSha, MAIN_2);
});

test("missing, unverifiable or HTML-substituted mandatory assets fail closed without replacing the last verified output", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const good = { [PINNED]: { ...mandatoryFiles("old"), "/images/a.webp": webp("a-historical") }, [MAIN_1]: { ...mandatoryFiles("1"), "/images/a.webp": webp("a-1"), "/images/b.webp": webp("b") } };
  await synchronizeFirstPartyAssets({ root, fetchImpl: upstream(good, MAIN_1).fetchImpl, collect, log: null });
  const before = await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8");
  const digestsBefore = (await fs.readdir(path.join(root, "public/resource-assets"))).sort();

  const withoutMandatory = { ...good, [MAIN_2]: { ...good[MAIN_1] } };
  delete withoutMandatory[MAIN_2]["/images/vierkernplatte.webp"];
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: upstream(withoutMandatory, MAIN_2).fetchImpl, collect, log: null }), /Required resource missing: \/images\/vierkernplatte\.webp/);

  const unexpectedMissing = { ...good, [MAIN_2]: { ...good[MAIN_1] } };
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: upstream(unexpectedMissing, MAIN_2).fetchImpl, collect: async () => ({ published: 1, references: [{ value: "/images/not-approved.webp", sourcePath: "content/x.md" }] }), log: null }), /Missing resource/);

  const unverifiablePin = { [MAIN_2]: { ...good[MAIN_1] } };
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: upstream(unverifiablePin, MAIN_2).fetchImpl, collect, log: null }), /HTTP 404/);

  await fs.rm(path.join(root, ".next/cache/reltroner-first-party-assets/blobs"), { recursive: true, force: true });
  const html = { ...good, [MAIN_2]: { ...good[MAIN_1] }, serveHtml: true };
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: upstream(html, MAIN_2).fetchImpl, collect, log: null }), /Git blob integrity mismatch/);

  const unavailable = async () => new Response("Unavailable", { status: 503 });
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: unavailable, collect, log: null }), /HTTP 503/);

  assert.equal(await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8"), before);
  assert.deepEqual((await fs.readdir(path.join(root, "public/resource-assets"))).sort(), digestsBefore);
  assert.deepEqual((await fs.readdir(path.join(root, ".next/cache/reltroner-first-party-assets"))).filter(name => /^(staging|backup)-/.test(name)), []);
});

test("the export gate requires every manifest file and rejects missing, altered, unlisted or jsDelivr references", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const commits = { [PINNED]: { ...mandatoryFiles("old"), "/images/a.webp": webp("a-historical") }, [MAIN_1]: { ...mandatoryFiles("1"), "/images/a.webp": webp("a-1"), "/images/b.webp": webp("b") } };
  const result = await synchronizeFirstPartyAssets({ root, fetchImpl: upstream(commits, MAIN_1).fetchImpl, collect, log: null });
  await fs.cp(path.join(root, "public"), path.join(root, "out"), { recursive: true });
  const page = path.join(root, "out/index.html");
  await fs.writeFile(page, `<img src="${urlFor(result, "/images/b.webp", MAIN_1)}"><style>.a{background:url(${urlFor(result, "/images/a.webp", PINNED)})}</style>`);
  assert.deepEqual((await verifyFirstPartyExport({ root })).errors, []);

  const victim = result.entries.find(entry => entry.logicalPath === "/images/b.webp");
  const victimFile = path.join(root, "out/resource-assets", victim.sha256, "images/b.webp");
  await fs.writeFile(victimFile, webp("tampered"));
  assert.match((await verifyFirstPartyExport({ root })).errors.join("\n"), /bytes differ/);
  await fs.rm(victimFile);
  assert.match((await verifyFirstPartyExport({ root })).errors.join("\n"), /Missing exported asset/);
  await fs.cp(path.join(root, "public/resource-assets", victim.sha256), path.join(root, "out/resource-assets", victim.sha256), { recursive: true });

  await fs.writeFile(page, `<img src="https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/images/b.webp"><img src="/resource-assets/${"e".repeat(64)}/images/b.webp">`);
  const errors = (await verifyFirstPartyExport({ root })).errors.join("\n");
  assert.match(errors, /jsDelivr resource transport present/);
  assert.match(errors, /Unlisted first-party URL/);
});

// ---- GitHub API authentication: credential confinement, production enforcement, failure handling ----

const TOKEN = "ghp_fixtureToken0123456789abcdef";
const API = "https://api.github.com/repos/Reltroner/reltroner-studio-resource";
const header = (request, name) => Object.entries(request.headers).find(([key]) => key.toLowerCase() === name)?.[1];

// Records every request's URL, headers and redirect mode, then delegates to a simulated upstream.
function recording(respond) {
  const requests = [];
  return { requests, fetchImpl: async (url, options) => { requests.push({ url, headers: { ...options.headers }, redirect: options.redirect }); return respond(url, options, requests.length); } };
}

function syncedCommits() {
  return { [PINNED]: { ...mandatoryFiles("old"), "/images/a.webp": webp("a-historical") }, [MAIN_1]: { ...mandatoryFiles("1"), "/images/a.webp": webp("a-1"), "/images/b.webp": webp("b") } };
}

test("a configured GITHUB_TOKEN is sent as a bearer to api.github.com only, never to raw byte downloads", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const remote = upstream(syncedCommits(), MAIN_1);
  const recorder = recording((url, options) => remote.fetchImpl(url, options));
  const logs = [];
  const result = await synchronizeFirstPartyAssets({ root, fetchImpl: recorder.fetchImpl, env: { GITHUB_TOKEN: ` ${TOKEN} ` }, collect, log: line => logs.push(line) });
  const api = recorder.requests.filter(request => request.url.startsWith("https://api.github.com/"));
  const raw = recorder.requests.filter(request => request.url.startsWith("https://raw.githubusercontent.com/"));
  assert.ok(api.length >= 3 && raw.length >= 6);
  assert.equal(api.length + raw.length, recorder.requests.length);
  for (const request of api) {
    assert.equal(header(request, "authorization"), `Bearer ${TOKEN}`);
    assert.equal(header(request, "accept"), "application/vnd.github+json");
    assert.equal(header(request, "user-agent"), "reltroner-resource-sync");
  }
  for (const request of raw) assert.equal(header(request, "authorization"), undefined);
  assert.ok(recorder.requests.every(request => request.redirect === "manual"));
  // The credential is never persisted or logged.
  assert.match(logs.join("\n"), /GitHub API authenticated/);
  for (const text of [JSON.stringify(result), logs.join("\n"), await fs.readFile(path.join(root, "lib/assets/generated/first-party-manifest.json"), "utf8"), await fs.readFile(path.join(root, "lib/assets/resource-snapshot.json"), "utf8")]) assert.ok(!text.includes(TOKEN));
});

test("local and preview builds stay anonymous without a token and send no Authorization header", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const remote = upstream(syncedCommits(), MAIN_1);
  const recorder = recording((url, options) => remote.fetchImpl(url, options));
  const logs = [];
  await synchronizeFirstPartyAssets({ root, fetchImpl: recorder.fetchImpl, env: {}, collect, log: line => logs.push(line) });
  assert.ok(recorder.requests.length > 0);
  assert.ok(recorder.requests.every(request => header(request, "authorization") === undefined));
  assert.match(logs.join("\n"), /GitHub API anonymous/);
  const preview = createGithubClient({ fetchImpl: async () => { throw new Error("unused"); }, env: { CF_PAGES: "1", CF_PAGES_BRANCH: "feature/assets" } });
  assert.equal(preview.authenticated, false);
  assert.equal(preview.production, false);
  const production = createGithubClient({ fetchImpl: async () => { throw new Error("unused"); }, env: { CF_PAGES: "1", CF_PAGES_BRANCH: "main", GITHUB_TOKEN: TOKEN } });
  assert.equal(production.authenticated, true);
  assert.equal(production.production, true);
  assert.ok(!JSON.stringify(production).includes(TOKEN));
});

test("Cloudflare production builds without a usable token fail before any request or write", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  for (const env of [{ CF_PAGES: "1", CF_PAGES_BRANCH: "main" }, { CF_PAGES: "1", CF_PAGES_BRANCH: "main", GITHUB_TOKEN: "   " }]) {
    const recorder = recording(() => { throw new Error("no request may be sent"); });
    await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: recorder.fetchImpl, env, collect, log: null }), /GITHUB_TOKEN is required for Cloudflare Pages production builds/);
    assert.equal(recorder.requests.length, 0);
  }
  const unsafe = "ghp_fixture\nInjected: header";
  const recorder = recording(() => { throw new Error("no request may be sent"); });
  const error = await synchronizeFirstPartyAssets({ root, fetchImpl: recorder.fetchImpl, env: { GITHUB_TOKEN: unsafe }, collect, log: null }).catch(caught => caught);
  assert.match(error.message, /cannot be sent in an HTTP header/);
  assert.ok(!error.message.includes("ghp_fixture"));
  assert.equal(recorder.requests.length, 0);
  await assert.rejects(fs.access(path.join(root, "lib/assets/generated/first-party-manifest.json")));
  await assert.rejects(fs.access(path.join(root, "public/resource-assets")));
});

test("a rejected or forbidden token stops without anonymous fallback and never discloses its value", async t => {
  for (const status of [401, 403]) {
    const recorder = recording(() => new Response("Bad credentials", { status }));
    const client = createGithubClient({ fetchImpl: recorder.fetchImpl, env: { GITHUB_TOKEN: TOKEN }, sleep: async () => assert.fail("no retry") });
    const error = await client.json("/commits/main").catch(caught => caught);
    assert.match(error.message, new RegExp(`rejected the configured GITHUB_TOKEN \\(HTTP ${status}\\); stopped without anonymous fallback`));
    assert.ok(!error.message.includes(TOKEN));
    assert.equal(recorder.requests.length, 1);
    assert.equal(header(recorder.requests[0], "authorization"), `Bearer ${TOKEN}`);
  }
  const anonymous = createGithubClient({ fetchImpl: async () => new Response("", { status: 401 }), env: {} });
  await assert.rejects(anonymous.json("/commits/main"), /GitHub API \/commits\/main returned HTTP 401$/);
  // Transport errors that echo the credential are redacted before they can reach build logs.
  const leaky = recording(() => { throw new Error(`socket closed while sending Bearer ${TOKEN}`); });
  const leaked = await createGithubClient({ fetchImpl: leaky.fetchImpl, env: { GITHUB_TOKEN: TOKEN }, sleep: async () => {} }).json("/commits/main").catch(caught => caught);
  assert.equal(leaky.requests.length, 3);
  assert.ok(!leaked.message.includes(TOKEN));
  assert.match(leaked.message, /\[redacted\]/);
  // The full synchronization surfaces the rejection and writes nothing.
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const rejected = recording(() => new Response("Bad credentials", { status: 401 }));
  await assert.rejects(synchronizeFirstPartyAssets({ root, fetchImpl: rejected.fetchImpl, env: { GITHUB_TOKEN: TOKEN }, collect, log: null }), /HTTP 401\); stopped without anonymous fallback/);
  assert.ok(rejected.requests.every(request => header(request, "authorization") === `Bearer ${TOKEN}`));
  await assert.rejects(fs.access(path.join(root, "lib/assets/generated/first-party-manifest.json")));
});

test("rate limits honour Retry-After and reset windows within a bounded wait", async () => {
  const now = 1_800_000_000_000;
  const ok = () => Response.json({ sha: MAIN_1 });
  const run = async (responses, env = { GITHUB_TOKEN: TOKEN }) => {
    const sleeps = [];
    const recorder = recording((url, options, count) => (responses[count - 1] || ok)());
    const client = createGithubClient({ fetchImpl: recorder.fetchImpl, env, now: () => now, sleep: async ms => { sleeps.push(ms); } });
    const outcome = await client.json("/commits/main").catch(error => error);
    return { outcome, sleeps, requests: recorder.requests };
  };
  const limited = (status, headers) => () => new Response("rate limited", { status, headers });

  let r = await run([limited(429, { "retry-after": "2" })]);
  assert.equal(r.outcome.sha, MAIN_1);
  assert.deepEqual(r.sleeps, [2000]);
  assert.ok(r.requests.every(request => header(request, "authorization") === `Bearer ${TOKEN}`));

  r = await run([limited(403, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(now / 1000 + 5) })]);
  assert.equal(r.outcome.sha, MAIN_1);
  assert.deepEqual(r.sleeps, [5000]);

  r = await run([limited(429, {})]);
  assert.deepEqual(r.sleeps, [60000]);

  r = await run([limited(403, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(now / 1000 + 3600) })]);
  assert.match(r.outcome.message, /rate limited \(HTTP 403\) for the configured GITHUB_TOKEN; retry window 3600s exceeds the bounded wait/);
  assert.deepEqual(r.sleeps, []);
  assert.equal(r.requests.length, 1);

  r = await run([limited(429, { "retry-after": "1" }), limited(429, { "retry-after": "1" }), limited(429, { "retry-after": "1" })]);
  assert.match(r.outcome.message, /rate limited \(HTTP 429\)/);
  assert.deepEqual(r.sleeps, [1000, 1000]);
  assert.equal(r.requests.length, 3);

  r = await run([limited(403, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(now / 1000 + 900) })], {});
  assert.match(r.outcome.message, /for anonymous access; configure GITHUB_TOKEN/);
  assert.ok(r.requests.every(request => header(request, "authorization") === undefined));
});

test("redirects are refused unfollowed and only the approved resource origins can be requested", async () => {
  for (const respond of [
    () => new Response(null, { status: 302, headers: { location: "https://evil.example/collect" } }),
    () => Object.defineProperty(Response.json({ sha: MAIN_1 }), "redirected", { value: true }),
    () => Object.defineProperty(Response.json({ sha: MAIN_1 }), "url", { value: "https://evil.example/commits/main" }),
  ]) {
    const recorder = recording(respond);
    const client = createGithubClient({ fetchImpl: recorder.fetchImpl, env: { GITHUB_TOKEN: TOKEN }, sleep: async () => assert.fail("no retry") });
    await assert.rejects(client.json("/commits/main"), /attempted a redirect; refused without following it/);
    assert.equal(recorder.requests.length, 1);
    assert.ok(recorder.requests.every(request => request.url.startsWith(`${API}/`)));
  }
  const rawRedirect = recording(() => new Response(null, { status: 301, headers: { location: "https://evil.example/a.webp" } }));
  const rawClient = createGithubClient({ fetchImpl: rawRedirect.fetchImpl, env: { GITHUB_TOKEN: TOKEN } });
  await assert.rejects(rawClient.raw(MAIN_1, "landing-page-resource/images/a.webp", { read: response => response.arrayBuffer() }), /attempted a redirect/);
  assert.equal(header(rawRedirect.requests[0], "authorization"), undefined);
  assert.equal(rawRedirect.requests[0].url, `https://raw.githubusercontent.com/Reltroner/reltroner-studio-resource/${MAIN_1}/landing-page-resource/images/a.webp`);

  for (const value of [
    "https://evil.example/repos/Reltroner/reltroner-studio-resource/commits/main",
    "https://api.github.com.evil.example/repos/Reltroner/reltroner-studio-resource/commits/main",
    "http://api.github.com/repos/Reltroner/reltroner-studio-resource/commits/main",
    "https://user:secret@api.github.com/repos/Reltroner/reltroner-studio-resource/commits/main",
    "https://api.github.com:8443/repos/Reltroner/reltroner-studio-resource/commits/main",
    "https://api.github.com/repos/Reltroner/another-repository/commits/main",
    "https://api.github.com/user",
    "https://raw.githubusercontent.com/Reltroner/another-repository/main/a.webp",
    "https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/images/a.webp",
  ]) assert.throws(() => assertApprovedGithubUrl(value), /unapproved resource origin/);
  assert.equal(assertApprovedGithubUrl(`${API}/commits/main`).api, true);
  assert.equal(assertApprovedGithubUrl(`https://raw.githubusercontent.com/Reltroner/reltroner-studio-resource/${MAIN_1}/landing-page-resource/images/a.webp`).api, false);
  const unused = createGithubClient({ fetchImpl: async () => assert.fail("no request"), env: { GITHUB_TOKEN: TOKEN } });
  for (const endpoint of ["https://evil.example/x", "//evil.example/x", "/../../user", "/commits/main#x", "/user@evil"]) assert.throws(() => unused.json(endpoint), /Invalid GitHub API endpoint/);
  assert.throws(() => unused.raw("main", "landing-page-resource/images/a.webp", {}), /40-character/);
});

test("the export gate fails when the build credential appears in published output without printing it", async t => {
  const root = await fixtureRoot();
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await synchronizeFirstPartyAssets({ root, fetchImpl: upstream(syncedCommits(), MAIN_1).fetchImpl, env: {}, collect, log: null });
  await fs.cp(path.join(root, "public"), path.join(root, "out"), { recursive: true });
  await fs.writeFile(path.join(root, "out/index.html"), "<p>clean</p>");
  assert.deepEqual((await verifyFirstPartyExport({ root, env: { GITHUB_TOKEN: TOKEN } })).errors, []);
  await fs.writeFile(path.join(root, "out/leak.js"), `const t = "${TOKEN}";`);
  const errors = (await verifyFirstPartyExport({ root, env: { GITHUB_TOKEN: TOKEN } })).errors.join("\n");
  assert.match(errors, /GITHUB_TOKEN value present in export \(not printed\): leak\.js/);
  assert.ok(!errors.includes(TOKEN));
});
