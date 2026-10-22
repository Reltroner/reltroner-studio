import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { synchronizeResources, createHistoricalVerifier, createGithubClient } from './sync-resource-manifest.mjs';
import { assertGitSha, serializeResourceSnapshot } from './generate-resource-manifest.mjs';
import { printResourceAudit } from './audit-resource-references.mjs';
import { normalizeResourcePath, firstPartyResourceUrl, historicalResourceSha, RESOURCE_ROOT, MAX_ASSET_BYTES, MAX_EXPORT_FILES } from '../lib/assets/resource-paths.mjs';

// Build preflight only: reads GitHub, writes local generated files; never commits, pushes or deploys.
export const MANDATORY_ASSETS = Object.freeze(['/images/vierkernplatte.webp', '/images/reltroner-studio-communication-framework.webp', '/images/about-rei-27.webp', '/images/explore-page-25.webp']);
export const MANIFEST_PATH = 'lib/assets/generated/first-party-manifest.json';
export const SNAPSHOT_PATH = 'lib/assets/resource-snapshot.json';
export const OUTPUT_DIRECTORY = 'public/resource-assets';
const WORK_DIRECTORY = '.next/cache/reltroner-first-party-assets';
const PIN_CALLS = new Set(['resolveResourceUrl', 'requireResourceUrl']);
export const gitBlobSha = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');

export function validateAssetBytes(logical, info, bytes) {
  if (!Number.isSafeInteger(info.bytes) || info.bytes < 1 || info.bytes > MAX_ASSET_BYTES) throw new Error(`Cloudflare Pages 25 MiB file limit or invalid size: ${logical}`);
  if (bytes.length !== info.bytes || gitBlobSha(bytes) !== info.blobSha) throw new Error(`Git blob integrity mismatch: ${logical}`);
  const ascii = (a, b) => bytes.toString('ascii', a, b);
  const ext = path.posix.extname(logical).toLowerCase();
  const signatures = {
    '.webp': bytes.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP',
    '.png': bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    '.jpg': bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    '.jpeg': bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    '.gif': ['GIF87a', 'GIF89a'].includes(ascii(0, 6)),
    '.avif': ascii(4, 8) === 'ftyp' && /avif|avis/.test(ascii(8, 24)),
    '.pdf': ascii(0, 5) === '%PDF-',
    '.mp4': ascii(4, 8) === 'ftyp',
  };
  if (normalizeResourcePath(logical) !== logical || !signatures[ext]) throw new Error(`Unsupported or misleading file signature: ${logical}`);
  return createHash('sha256').update(bytes).digest('hex');
}

// Read declared constants, never execute application components to discover their pins.
export function discoverSourceReferences(source, filename) {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const variables = new Map();
  function walk(node, visit) { visit(node); ts.forEachChild(node, child => walk(child, visit)); }
  walk(tree, node => { if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) variables.set(node.name.text, node.initializer); });
  function literal(node) {
    if (!node) return undefined;
    if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) || ts.isSatisfiesExpression(node)) return literal(node.expression);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isIdentifier(node)) return literal(variables.get(node.text));
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => {
      if (!ts.isPropertyAssignment(p)) throw new Error(`Non-static artwork declaration: ${filename}`);
      return [p.name.getText(tree).replace(/^['"]|['"]$/g, ''), literal(p.initializer)];
    }));
    if (ts.isCallExpression(node) && node.expression.getText(tree) === 'Object.freeze') return literal(node.arguments[0]);
    throw new Error(`Non-static artwork value: ${filename}`);
  }
  const references = [];
  const sourcePath = filename.replaceAll('\\', '/');
  const add = (value, pin) => {
    if (!normalizeResourcePath(value)) throw new Error(`Unsafe declared asset: ${value} in ${filename}`);
    references.push({ value, sourcePath, ...(pin ? { sourceSha: assertGitSha(pin) } : {}) });
  };
  // Convention shared by the CDN artwork components: `artwork` filenames pinned by `sourceCommit`.
  if (variables.has('artwork') && variables.has('sourceCommit')) {
    const artwork = literal(variables.get('artwork'));
    const pin = literal(variables.get('sourceCommit'));
    const overrides = variables.has('sourceCommitOverrides') ? literal(variables.get('sourceCommitOverrides')) : {};
    for (const [id, [file]] of Object.entries(artwork)) add(`/images/${file}`, overrides[id] || pin);
  }
  walk(tree, node => {
    if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return;
    if (!normalizeResourcePath(node.text)) return;
    const call = node.parent;
    if (ts.isCallExpression(call) && call.arguments[0] === node && PIN_CALLS.has(call.expression.getText(tree)) && call.arguments[1]) add(node.text, literal(call.arguments[1]));
    else references.push({ value: node.text, sourcePath });
  });
  const homepageIds = variables.has('HOMEPAGE_IMAGE_IDS') ? literal(variables.get('HOMEPAGE_IMAGE_IDS')) : [];
  return { references, homepageIds };
}

async function collectApplicationReferences(root) {
  const references = MANDATORY_ASSETS.map(value => ({ value, sourcePath: 'mandatory first-party assets' }));
  async function walk(directory) {
    let listing;
    try { listing = await fs.readdir(directory, { withFileTypes: true }); } catch (error) { if (error.code === 'ENOENT') return; throw error; }
    for (const entry of listing) {
      if (entry.name === 'assets' || entry.name === 'generated' || entry.name.startsWith('.')) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (/\.(jsx?|tsx?|mjs)$/.test(entry.name)) references.push(...discoverSourceReferences(await fs.readFile(file, 'utf8'), path.relative(root, file)).references);
    }
  }
  for (const directory of ['app', 'components', 'lib']) await walk(path.join(root, directory));
  const homepage = discoverSourceReferences(await fs.readFile(path.join(root, 'lib/assets/homepage-assets.mjs'), 'utf8'), 'lib/assets/homepage-assets.mjs');
  const revisions = JSON.parse(await fs.readFile(path.join(root, 'lib/assets/homepage-revisions.json'), 'utf8'));
  for (const id of homepage.homepageIds) {
    const filename = `home-page-${id}.webp`;
    references.push({ value: `/images/${filename}`, sourceSha: assertGitSha(revisions.overrides?.[filename]?.commit || revisions.baseCommit), sourcePath: 'lib/assets/homepage-revisions.json' });
  }
  return references;
}

async function rawAsset(github, sourceSha, info) {
  // Bytes come from raw.githubusercontent.com at the exact commit, without credentials.
  // Large videos need more than a fixed timeout; the budget still bounds every attempt.
  const timeout = 30000 + Math.ceil(info.bytes / 262144) * 1000;
  return github.raw(sourceSha, info.path, {
    timeout,
    read: async response => {
      if (Number(response.headers.get('content-length')) > MAX_ASSET_BYTES) throw Object.assign(new Error(`Asset exceeds 25 MiB: ${info.path}`), { permanent: true });
      return Buffer.from(await response.arrayBuffer());
    },
  });
}

function confined(root, destination) {
  const absolute = path.resolve(destination);
  if (!absolute.startsWith(path.resolve(root) + path.sep)) throw new Error(`Path escapes authorized directory: ${absolute}`);
  return absolute;
}

async function readOptional(file) {
  try { return await fs.readFile(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function writeAtomic(file, body) {
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, body);
  await fs.rename(temporary, file);
}

/**
 * Resolves resource `main` once, verifies every required (commit, path) pair against Git blob identities,
 * and publishes the bytes under content-addressed `/resource-assets/{sha256}/...` paths for the static export.
 */
export async function synchronizeFirstPartyAssets({ root = process.cwd(), fetchImpl = fetch, env = process.env, sleep, collect, log = console.log } = {}) {
  root = path.resolve(root);
  // Credentials are resolved before any request: Cloudflare production builds require GITHUB_TOKEN, sent as an
  // Authorization bearer to api.github.com only. Resource byte downloads never carry credentials.
  const github = createGithubClient({ fetchImpl, env, ...(sleep ? { sleep } : {}) });
  const verifyHistorical = createHistoricalVerifier(fetchImpl, github);
  const { snapshot, report } = await synchronizeResources({ fetchImpl, github, collect, verifyHistorical, write: async () => {} });
  const current = new Map(snapshot.resources.map(resource => [resource.path.slice(RESOURCE_ROOT.length), resource]));
  const wanted = new Map();
  const add = async (logicalPath, sourceSha, sourcePath) => {
    sourceSha = assertGitSha(sourceSha);
    const key = `${sourceSha}:${logicalPath}`;
    if (wanted.has(key)) return;
    const info = sourceSha === snapshot.sourceSha ? current.get(logicalPath) : await verifyHistorical(sourceSha, RESOURCE_ROOT + logicalPath);
    if (!info) {
      // Application-owned public files are independent of the upstream repository.
      if (sourceSha === snapshot.sourceSha) {
        try { if ((await fs.stat(confined(path.join(root, 'public'), path.join(root, 'public', logicalPath)))).isFile()) return; } catch (error) { if (error.code !== 'ENOENT') throw error; }
      }
      throw new Error(`Required resource missing: ${logicalPath}@${sourceSha} (${sourcePath})`);
    }
    if (info.bytes > MAX_ASSET_BYTES) throw new Error(`Cloudflare Pages 25 MiB file limit: ${logicalPath}`);
    wanted.set(key, { logicalPath, sourceSha, info });
  };
  for (const asset of report.assets) if (asset.status === 'PASS') await add(asset.asset, asset.sourceSha, asset.sources[0]);
  for (const reference of await collectApplicationReferences(root)) {
    const logical = normalizeResourcePath(reference.value);
    await add(logical, reference.sourceSha || historicalResourceSha(reference.value) || snapshot.sourceSha, reference.sourcePath);
  }
  if (wanted.size > MAX_EXPORT_FILES) throw new Error('First-party asset count exceeds 20,000');

  const work = confined(root, path.join(root, WORK_DIRECTORY));
  const blobs = path.join(work, 'blobs');
  await fs.mkdir(blobs, { recursive: true });
  for (const entry of await fs.readdir(work)) if (/^(staging|backup)-/.test(entry)) await fs.rm(path.join(work, entry), { recursive: true, force: true });
  // Staged outside public/ so an interrupted run can never leak partial files into the export.
  const staging = await fs.mkdtemp(path.join(work, 'staging-'));
  const output = confined(root, path.join(root, OUTPUT_DIRECTORY));
  const manifest = confined(root, path.join(root, MANIFEST_PATH));
  const snapshotPath = confined(root, path.join(root, SNAPSHOT_PATH));
  let complete = false;
  try {
    const jobs = [...wanted.values()].sort((a, b) => `${a.sourceSha}:${a.logicalPath}`.localeCompare(`${b.sourceSha}:${b.logicalPath}`, 'en'));
    const entries = new Array(jobs.length);
    let position = 0, failure, downloaded = 0;
    const workers = Array.from({ length: Math.min(4, jobs.length) }, async () => {
      while (!failure && position < jobs.length) {
        const index = position++;
        const { logicalPath, sourceSha, info } = jobs[index];
        try {
          const cachePath = confined(blobs, path.join(blobs, assertGitSha(info.blobSha)));
          let bytes = await readOptional(cachePath);
          if (!bytes || bytes.length !== info.bytes || gitBlobSha(bytes) !== info.blobSha) {
            bytes = await rawAsset(github, sourceSha, info);
            downloaded++;
          }
          const sha256 = validateAssetBytes(logicalPath, info, bytes);
          await fs.writeFile(cachePath, bytes);
          const destination = confined(staging, path.join(staging, sha256, logicalPath));
          await fs.mkdir(path.dirname(destination), { recursive: true });
          await fs.writeFile(destination, bytes);
          entries[index] = { logicalPath, resourcePath: info.path, sourceSha, blobSha: info.blobSha, sha256, bytes: bytes.length, url: firstPartyResourceUrl(logicalPath, sha256) };
        } catch (error) { failure ||= error; }
      }
    });
    await Promise.all(workers);
    if (failure) throw failure;
    entries.sort((a, b) => a.logicalPath.localeCompare(b.logicalPath, 'en') || a.sourceSha.localeCompare(b.sourceSha, 'en'));
    await fs.mkdir(path.dirname(manifest), { recursive: true });
    await fs.mkdir(path.dirname(output), { recursive: true });
    const oldSnapshot = await readOptional(snapshotPath);
    const oldManifest = await readOptional(manifest);
    const backup = path.join(work, `backup-${process.pid}`);
    let moved = false;
    try {
      try { await fs.rename(output, backup); moved = true; } catch (error) { if (error.code !== 'ENOENT') throw error; }
      await fs.rename(staging, output);
      await writeAtomic(manifest, `${JSON.stringify({ sourceSha: snapshot.sourceSha, entries }, null, 2)}\n`);
      await writeAtomic(snapshotPath, serializeResourceSnapshot(snapshot));
      complete = true;
    } catch (error) {
      await fs.rm(output, { recursive: true, force: true });
      if (moved) await fs.rename(backup, output);
      if (oldManifest) await fs.writeFile(manifest, oldManifest); else await fs.rm(manifest, { force: true });
      if (oldSnapshot) await fs.writeFile(snapshotPath, oldSnapshot);
      throw error;
    } finally { if (complete) await fs.rm(backup, { recursive: true, force: true }); }
    if (log) {
      printResourceAudit(report);
      log(`[assets] PASS: ${entries.length} verified first-party files (${downloaded} downloaded); resource commit ${snapshot.sourceSha}; GitHub API ${github.authenticated ? 'authenticated' : 'anonymous'}`);
    }
    return { sourceSha: snapshot.sourceSha, entries, report };
  } finally { if (!complete) await fs.rm(staging, { recursive: true, force: true }); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { await synchronizeFirstPartyAssets(); } catch (error) { console.error(`[assets] FAIL: ${error.message}`); process.exitCode = 1; }
}
