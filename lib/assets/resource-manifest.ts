import generated from './generated/first-party-manifest.json';
import { normalizeResourcePath, historicalResourceSha, firstPartyResourceUrl, RESOURCE_REPOSITORY, RESOURCE_ROOT, KNOWN_MISSING_NON_BLOCKING, MAX_ASSET_BYTES } from './resource-paths.mjs';
export { normalizeResourcePath, RESOURCE_REPOSITORY, RESOURCE_ROOT };
export { RESOURCE_FALLBACK_IMAGE } from './fallback';
import { RESOURCE_FALLBACK_IMAGE } from './fallback';
export const RESOURCE_SOURCE_SHA: string = generated.sourceSha;

export interface ResourceManifestEntry {
  logicalPath: string;
  resourcePath: string;
  sourceSha: string;
  immutableUrl: string;
  metadata: { blobSha: string; sha256: string; bytes: number; alt?: string; width?: number; height?: number };
}

/** Only verified bytes with a source commit may receive an immutable first-party URL. */
export function createResourceManifestEntry(logicalPath: string, resourcePath: string, sourceSha: string, metadata?: ResourceManifestEntry['metadata']): ResourceManifestEntry {
  if (!/^[a-f0-9]{40}$/i.test(sourceSha)) throw new Error('A full resource commit SHA is required');
  const normalized = normalizeResourcePath(logicalPath);
  if (!normalized || normalized !== logicalPath || resourcePath !== RESOURCE_ROOT + normalized) throw new Error('Resource path must match its confined logical path');
  if (!metadata || !/^[a-f0-9]{40}$/i.test(metadata.blobSha) || !/^[a-f0-9]{64}$/i.test(metadata.sha256) || !Number.isSafeInteger(metadata.bytes) || metadata.bytes <= 0 || metadata.bytes > MAX_ASSET_BYTES) throw new Error('Verified Git blob, SHA-256 and valid byte length required');
  return { logicalPath: normalized, resourcePath, sourceSha: sourceSha.toLowerCase(), immutableUrl: firstPartyResourceUrl(normalized, metadata.sha256), metadata: { ...metadata, blobSha: metadata.blobSha.toLowerCase(), sha256: metadata.sha256.toLowerCase() } };
}

if (!/^[a-f0-9]{40}$/.test(RESOURCE_SOURCE_SHA) || !generated.entries.length) throw new Error('Run npm run assets:sync before compiling the application');
const latest = new Map<string, ResourceManifestEntry>();
const historical = new Map<string, ResourceManifestEntry>();
const byUrl = new Map<string, ResourceManifestEntry>();
for (const record of generated.entries) {
  const entry = createResourceManifestEntry(record.logicalPath, record.resourcePath, record.sourceSha, { blobSha: record.blobSha, sha256: record.sha256, bytes: record.bytes });
  if (entry.immutableUrl !== record.url) throw new Error('Invalid generated first-party URL');
  const key = entry.sourceSha + ':' + entry.logicalPath;
  if (historical.has(key)) throw new Error('Duplicate generated resource revision');
  historical.set(key, entry);
  byUrl.set(entry.immutableUrl, entry);
  if (entry.sourceSha === RESOURCE_SOURCE_SHA) latest.set(entry.logicalPath, entry);
}
export const RESOURCE_MANIFEST: Readonly<Record<string, ResourceManifestEntry>> = Object.freeze(Object.fromEntries(latest));

/** Logical paths follow the build's resource commit; authored or explicit commit pins keep their exact revision. */
export function resolveResourceAsset(value: string, sourceSha?: string): ResourceManifestEntry | null {
  const logicalPath = normalizeResourcePath(value);
  if (!logicalPath) return null;
  if (value.startsWith('/resource-assets/')) return byUrl.get(value) || null;
  const revision = sourceSha || historicalResourceSha(value);
  return revision ? historical.get(revision.toLowerCase() + ':' + logicalPath) || null : latest.get(logicalPath) || null;
}

export function resolveResourceUrl(value: string, sourceSha?: string): string | null {
  const entry = resolveResourceAsset(value, sourceSha);
  if (entry) return entry.immutableUrl;
  const logicalPath = normalizeResourcePath(value);
  return !sourceSha && logicalPath && KNOWN_MISSING_NON_BLOCKING.includes(logicalPath) ? RESOURCE_FALLBACK_IMAGE : null;
}

/** Application artwork pinned in source must be bundled; a missing record fails the static build. */
export function requireResourceUrl(logicalPath: string, sourceSha: string): string {
  const url = resolveResourceAsset(logicalPath, sourceSha)?.immutableUrl;
  if (!url) throw new Error(`Pinned resource is not in the verified first-party manifest: ${logicalPath}@${sourceSha}`);
  return url;
}
