import { createHash } from 'node:crypto';
import { getPublicContentIndex } from '@/lib/content/public-index';
import { MAX_ASSISTANT_REQUEST_BYTES, createAssistantRateLimiter, parseAssistantRequest } from '@/lib/assistant/guardrails';
import { createAssistantService, getConfiguredAssistantProvider } from '@/lib/assistant/provider.server';
import { AI_DISCONNECTED_NOTICE } from '@/lib/assistant/types';
import { isSameOriginRequest } from '@/lib/security/request-origin';

export const dynamic = 'force-static';
const rateLimit = createAssistantRateLimiter();
const respond = createAssistantService(getConfiguredAssistantProvider());
const headers = { 'Cache-Control': 'no-store' };

export function GET() {
  return Response.json({ available: false, status: 'disabled', message: AI_DISCONNECTED_NOTICE }, { headers });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ status: 'rejected', message: 'Use Navigator on this website.', sources: [] }, { status: 403, headers });
  }
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (!request.headers.get('content-type')?.startsWith('application/json') || declaredLength > MAX_ASSISTANT_REQUEST_BYTES) {
    return Response.json({ status: 'rejected', message: 'Use a small JSON request.', sources: [] }, { status: 413, headers });
  }
  const anonymousKey = createHash('sha256').update(request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local').digest('hex');
  const limit = rateLimit(anonymousKey);
  if (!limit.allowed) {
    return Response.json({ status: 'rate_limited', message: 'Too many requests. Try again shortly, or use public archive search.', sources: [], retryAfterSeconds: limit.retryAfterSeconds }, { status: 429, headers: { ...headers, 'Retry-After': String(limit.retryAfterSeconds) } });
  }
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Missing body');
    let length = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > MAX_ASSISTANT_REQUEST_BYTES) {
        await reader.cancel();
        return Response.json({ status: 'rejected', message: 'The request is too large.', sources: [] }, { status: 413, headers });
      }
      chunks.push(chunk.value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return Response.json({ status: 'rejected', message: 'Invalid JSON request.', sources: [] }, { status: 400, headers });
  }
  const parsed = parseAssistantRequest(body);
  if (!parsed.valid) return Response.json({ status: 'rejected', message: 'error' in parsed ? parsed.error : 'Invalid request.', sources: [] }, { status: 400, headers });
  const result = await respond(parsed.request, await getPublicContentIndex());
  const status = result.status === 'disabled' ? 503 : result.status === 'rejected' ? 400 : result.status === 'quota_exhausted' || result.status === 'rate_limited' ? 429 : result.status === 'error' ? 502 : 200;
  return Response.json(result, { status, headers });
}
