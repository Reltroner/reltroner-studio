export const RESOURCE_REPOSITORY = 'Reltroner/reltroner-studio-resource';
export const RESOURCE_ROOT = 'landing-page-resource';
export const KNOWN_MISSING_NON_BLOCKING = Object.freeze(['/images/skytropolis.webp', '/images/reltronland-map.webp']);
export const MAX_ASSET_BYTES = 25 * 1024 * 1024;
export const MAX_EXPORT_FILES = 20_000;

/** Shared by build tooling and runtime; parsing never grants permission to serve a file. */
export function normalizeResourcePath(value) {
  let candidate = String(value || '').trim();
  if (!candidate || /[\\\u0000-\u001f\u007f]/.test(candidate)) return null;
  try {
    const decoded = decodeURIComponent(candidate);
    if (/(^|\/)\.{1,2}(\/|$)/.test(decoded) || /[\\\u0000-\u001f\u007f]/.test(decoded)) return null;
  } catch { return null; }
  if (/^https?:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      if (url.protocol !== 'https:' || url.hostname !== 'cdn.jsdelivr.net' || url.port || url.username || url.password || url.search || url.hash) return null;
      const match = url.pathname.match(/^\/gh\/Reltroner\/reltroner-studio-resource@(?:main|master|latest|[a-f0-9]{40})\/landing-page-resource(\/(?:images|files|videos)\/.+)$/i);
      if (!match) return null;
      candidate = match[1];
    } catch { return null; }
  }
  if (candidate.startsWith('/resource-assets/')) {
    const match = candidate.match(/^\/resource-assets\/[a-f0-9]{64}(\/(?:images|files|videos)\/.+)$/);
    if (!match) return null;
    candidate = match[1];
  }
  try { candidate = decodeURIComponent(candidate); } catch { return null; }
  if (!/^\/(images|files|videos)\/[A-Za-z0-9_ .()/-]+$/.test(candidate)) return null;
  if (candidate.split('/').slice(1).some(part => !part || part === '.' || part === '..')) return null;
  if (candidate.startsWith('/images/') && !/\.(webp|png|jpe?g|gif|avif)$/i.test(candidate)) return null;
  if (candidate.startsWith('/files/') && !/\.pdf$/i.test(candidate)) return null;
  if (candidate.startsWith('/videos/') && !/\.mp4$/i.test(candidate)) return null;
  return candidate;
}

export function historicalResourceSha(value) {
  return String(value).match(/^https:\/\/cdn\.jsdelivr\.net\/gh\/Reltroner\/reltroner-studio-resource@([a-f0-9]{40})\/landing-page-resource\//i)?.[1].toLowerCase();
}

export function firstPartyResourceUrl(logicalPath, sha256) {
  if (normalizeResourcePath(logicalPath) !== logicalPath || !/^[a-f0-9]{64}$/i.test(sha256)) throw new Error('Invalid immutable resource identity');
  return `/resource-assets/${sha256.toLowerCase()}${logicalPath.split('/').map(encodeURIComponent).join('/')}`;
}
