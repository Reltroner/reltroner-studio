import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { firstPartyResourceUrl, MAX_ASSET_BYTES, MAX_EXPORT_FILES } from '../lib/assets/resource-paths.mjs';

// Postbuild gate: every published resource URL maps to verified exported bytes; no jsDelivr resource transport remains.
const MANDATORY = ['/images/vierkernplatte.webp', '/images/reltroner-studio-communication-framework.webp', '/images/about-rei-27.webp', '/images/explore-page-25.webp'];
const JSDELIVR_RESOURCE = /cdn\.jsdelivr\.net\/gh\/Reltroner\/reltroner-studio-resource/i;
const FIRST_PARTY_URL = /\/resource-assets\/[a-f0-9]{64}\/(?:images|files|videos)\/[A-Za-z0-9_%().\-/]+?\.(?:webp|png|jpe?g|gif|avif|pdf|mp4)(?![A-Za-z0-9_%\-/.])/gi;

async function listFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(file));
    else if (entry.isFile()) files.push(file);
  }
  return files;
}

export async function verifyFirstPartyExport({ root = process.cwd(), outDir = 'out', manifestPath = 'lib/assets/generated/first-party-manifest.json', env = process.env } = {}) {
  const errors = [];
  // The build credential must never reach published files; its value is never printed.
  const token = String(env.GITHUB_TOKEN ?? '').trim();
  const out = path.resolve(root, outDir);
  const manifest = JSON.parse(await fs.readFile(path.resolve(root, manifestPath), 'utf8'));
  if (!/^[a-f0-9]{40}$/.test(manifest.sourceSha) || !Array.isArray(manifest.entries) || !manifest.entries.length) throw new Error('Missing verified first-party manifest');
  const listed = new Set();
  for (const entry of manifest.entries) {
    let expected;
    try { expected = firstPartyResourceUrl(entry.logicalPath, entry.sha256); } catch { expected = null; }
    if (entry.url !== expected || !/^[a-f0-9]{40}$/.test(entry.blobSha) || !/^[a-f0-9]{40}$/.test(entry.sourceSha)) { errors.push(`Invalid manifest record: ${entry.logicalPath}`); continue; }
    listed.add(entry.url);
    const bytes = await fs.readFile(path.join(out, 'resource-assets', entry.sha256, ...entry.logicalPath.split('/'))).catch(() => null);
    if (!bytes) errors.push(`Missing exported asset: ${entry.url}`);
    else if (bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) errors.push(`Exported asset bytes differ from manifest: ${entry.url}`);
  }
  for (const logical of MANDATORY) if (!manifest.entries.some(entry => entry.sourceSha === manifest.sourceSha && entry.logicalPath === logical)) errors.push(`Mandatory asset not exported at ${manifest.sourceSha}: ${logical}`);

  const files = await listFiles(out);
  if (files.length > MAX_EXPORT_FILES) errors.push(`Cloudflare Pages file-count limit exceeded: ${files.length}`);
  let scanned = 0;
  for (const file of files) {
    const relative = path.relative(out, file).replaceAll('\\', '/');
    if (/(^|\/)\.resource-assets-(staging|backup)-/.test(relative)) errors.push(`Staging directory leaked into export: ${relative}`);
    const stat = await fs.stat(file);
    if (stat.size > MAX_ASSET_BYTES) errors.push(`Cloudflare Pages 25 MiB file limit: ${relative}`);
    if (relative.startsWith('resource-assets/') || !/\.(html|txt|js|css|json|xml|rsc)$/i.test(file)) continue;
    scanned++;
    const text = await fs.readFile(file, 'utf8');
    if (JSDELIVR_RESOURCE.test(text)) errors.push(`jsDelivr resource transport present in export: ${relative}`);
    if (token.length >= 8 && text.includes(token)) errors.push(`GITHUB_TOKEN value present in export (not printed): ${relative}`);
    for (const match of text.matchAll(FIRST_PARTY_URL)) {
      const url = match[0];
      if (listed.has(url)) continue;
      errors.push(`Unlisted first-party URL in ${relative}: ${url}`);
    }
  }
  return { errors: [...new Set(errors)], entries: manifest.entries.length, files: files.length, scanned, sourceSha: manifest.sourceSha };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const result = await verifyFirstPartyExport();
    if (result.errors.length) {
      for (const error of result.errors.slice(0, 80)) console.error(`[asset-gate] ${error}`);
      process.exitCode = 1;
    } else console.log(`[asset-gate] PASS: ${result.entries} verified first-party assets exported; ${result.scanned} HTML/RSC/JS/CSS files audited; ${result.files} files total; resource commit ${result.sourceSha}`);
  } catch (error) { console.error(`[asset-gate] FAIL: ${error.message}`); process.exitCode = 1; }
}
