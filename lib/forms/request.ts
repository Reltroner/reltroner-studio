import { isSameOriginRequest } from '@/lib/security/request-origin';

/** Small local API boundary shared by the two independent forms. */
export async function readFormRequest(request: Request): Promise<unknown> {
  if (!isSameOriginRequest(request)) throw new Error('ORIGIN');
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new Error('FORMAT');
  if (Number(request.headers.get('content-length') || 0) > 12000) throw new Error('SIZE');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('FORMAT');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.byteLength;
    if (size > 12000) { await reader.cancel(); throw new Error('SIZE'); }
    chunks.push(next.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
