/** Compare the browser's origin with the actual HTTP authority.
 * Next's local server can reconstruct request.url with localhost even when the
 * browser requested 127.0.0.1. Do not trust forwarded-host headers for this check.
 */
export function isSameOriginRequest(request: Request): boolean {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return false;
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const target = new URL(request.url);
    const host = request.headers.get('host');
    const authority = host ? new URL(`${target.protocol}//${host}`) : target;
    if (authority.username || authority.password || (host && (authority.pathname !== '/' || authority.search || authority.hash))) return false;
    const source = new URL(origin);
    return origin === source.origin && source.origin === authority.origin;
  } catch { return false; }
}
