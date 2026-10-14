import snapshot from "./resource-snapshot.json";

export const RESOURCE_REPOSITORY = "Reltroner/reltroner-studio-resource";
export const RESOURCE_ROOT = "landing-page-resource";
export const RESOURCE_SOURCE_SHA = snapshot.sourceSha;
export { RESOURCE_FALLBACK_IMAGE } from "./fallback";
import { RESOURCE_FALLBACK_IMAGE } from "./fallback";

export interface ResourceManifestEntry {
  logicalPath: string;
  resourcePath: string;
  sourceSha: string;
  immutableUrl: string;
  metadata?: { blobSha?: string; bytes?: number; alt?: string; width?: number; height?: number };
}

/** Construct a release entry. A full Git commit and a confined resource path are required. */
export function createResourceManifestEntry(
  logicalPath: string,
  resourcePath: string,
  sourceSha: string,
  metadata?: ResourceManifestEntry["metadata"],
): ResourceManifestEntry {
  if (!/^[a-f0-9]{40}$/i.test(sourceSha)) throw new Error("A full resource commit SHA is required");
  const normalized = normalizeResourcePath(logicalPath);
  if (!normalized || resourcePath !== `${RESOURCE_ROOT}${normalized}`) {
    throw new Error("Resource path must match its confined logical path");
  }
  return {
    logicalPath: normalized,
    resourcePath,
    sourceSha: sourceSha.toLowerCase(),
    immutableUrl: `https://cdn.jsdelivr.net/gh/${RESOURCE_REPOSITORY}@${sourceSha.toLowerCase()}/${resourcePath.split("/").map(encodeURIComponent).join("/")}`,
    metadata,
  };
}

export function normalizeResourcePath(value: string): string | null {
  let candidate = String(value || "").trim().replace(/\\/g, "/");
  if (!candidate || /[\u0000-\u001f\u007f]/.test(candidate)) return null;
  if (/^https?:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      const prefix = `/gh/${RESOURCE_REPOSITORY}@`;
      if (url.protocol !== "https:" || url.hostname !== "cdn.jsdelivr.net" || url.username || url.password || !url.pathname.startsWith(prefix)) return null;
      const root = `/${RESOURCE_ROOT}/`;
      const rootPosition = url.pathname.indexOf(root, prefix.length);
      if (rootPosition < 0) return null;
      candidate = url.pathname.slice(rootPosition + RESOURCE_ROOT.length + 1);
    } catch { return null; }
  }
  try { candidate = decodeURIComponent(candidate); } catch { return null; }
  if (!/^\/(images|files|videos)\//.test(candidate) || candidate.includes("?") || candidate.includes("#")) return null;
  const segments = candidate.split("/").slice(1);
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || segment.includes(":"))) return null;
  return candidate;
}

export const RESOURCE_MANIFEST: Readonly<Record<string, ResourceManifestEntry>> = Object.freeze(
  Object.fromEntries(snapshot.resources.map((resource) => {
    const logicalPath = resource.path.slice(RESOURCE_ROOT.length);
    const entry = createResourceManifestEntry(logicalPath, resource.path, snapshot.sourceSha, {
      blobSha: resource.blobSha,
      bytes: resource.bytes,
    });
    return [logicalPath, entry];
  })),
);

export function resolveResourceAsset(value: string): ResourceManifestEntry | null {
  const logicalPath = normalizeResourcePath(value);
  const entry = logicalPath ? RESOURCE_MANIFEST[logicalPath] || null : null;
  if (!entry) return null;
  // An authored immutable reference is intentional historical provenance. Only
  // logical paths and mutable references follow the current reviewed snapshot.
  const explicitSha = String(value).match(/@([a-f0-9]{40})\/landing-page-resource\//i)?.[1];
  return explicitSha && explicitSha.toLowerCase() !== entry.sourceSha
    ? createResourceManifestEntry(entry.logicalPath, entry.resourcePath, explicitSha)
    : entry;
}

/** Missing images have an accessible local placeholder; missing downloads never invent a URL. */
export function resolveResourceUrl(value: string): string | null {
  const logicalPath = normalizeResourcePath(value);
  return resolveResourceAsset(value)?.immutableUrl || (logicalPath?.startsWith("/images/") ? RESOURCE_FALLBACK_IMAGE : null);
}
