'use client';
import { validateInquiry } from '@/lib/contact/schema';
import type { ContactInput, ContactResult } from '@/lib/contact/types';

interface Web3FormsOptions {
  accessKey?: string;
  enabled?: boolean;
  signal?: AbortSignal;
  fetcher?: typeof fetch;
  timeoutMilliseconds?: number;
  subject?: string;
}

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const prototypeMessage = 'Local prototype: your inquiry is valid. It has not been sent or accepted by Web3Forms. Use the email link to contact the Studio.';
function reply(status: ContactResult['status'], message: string, httpStatus: number) {
  return Response.json({ status, message } satisfies ContactResult, { status: httpStatus });
}

/** Approved browser-direct Free-tier boundary. Key is a public identifier.
 * Enable only after recipient/site/free quota/privacy configuration is verified.
 * The provider's botcheck receives the existing validated honeypot; no CAPTCHA is added.
 */
export async function submitContact(input: ContactInput, options: Web3FormsOptions = {}): Promise<Response> {
  const checked = validateInquiry(input);
  if (!checked.input) return reply('invalid', checked.error!, 422);
  if (new TextEncoder().encode(JSON.stringify(checked.input)).byteLength > 12000) return reply('rejected', 'The inquiry could not be validated. Please try again from this website.', 400);
  const enabled = options.enabled ?? (process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true');
  if (!enabled) return reply('prototype', prototypeMessage, 200);
  const accessKey = options.accessKey ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';
  if (typeof window === 'undefined' || !UUID.test(accessKey)) return reply('rejected', 'Browser contact delivery or form configuration is unavailable.', 503);
  const timeoutMilliseconds = options.timeoutMilliseconds ?? 10000;
  if (!Number.isInteger(timeoutMilliseconds) || timeoutMilliseconds < 1 || timeoutMilliseconds > 10000) return reply('rejected', 'Contact delivery configuration is unavailable.', 503);
  const controller = new AbortController();
  let cancelled: () => void;
  let timer: ReturnType<typeof setTimeout>;
  const interrupted = new Promise<never>((_, reject) => {
    cancelled = () => { controller.abort(); reject(new Error('INTERRUPTED')); };
    timer = setTimeout(cancelled, timeoutMilliseconds);
  });
  options.signal?.addEventListener('abort', cancelled!, { once: true });
  const run = async () => {
    if (options.signal?.aborted || controller.signal.aborted) throw new Error('INTERRUPTED');
    const value = checked.input!;
    const payload: Record<string, unknown> = {
      access_key: accessKey,
      name: value.name,
      email: value.email,
      message: value.message,
      intent: value.intent,
      botcheck: value.website,
    };
    if (typeof options.subject === 'string' && options.subject.trim()) {
      payload.subject = options.subject.trim();
    }
    const response = await (options.fetcher ?? fetch)('https://api.web3forms.com/submit', {
      method: 'POST', credentials: 'omit', redirect: 'error', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (controller.signal.aborted) throw new Error('INTERRUPTED');
    if (response.status === 429) return reply('quota-error', 'The contact provider request limit was reached. Acceptance is not confirmed.', 429);
    if (!(response instanceof Response) || response.redirected || response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply('rejected', 'The contact provider returned an invalid response. Acceptance is not confirmed.', 502);
    const reader = response.body?.getReader();
    if (!reader) return reply('rejected', 'The contact provider returned an invalid response. Acceptance is not confirmed.', 502);
    const cancelBody = () => { void reader.cancel().catch(() => {}); };
    controller.signal.addEventListener('abort', cancelBody, { once: true });
    const decoder = new TextDecoder();
    let body = '';
    let size = 0;
    try {
      while (true) {
        if (controller.signal.aborted) throw new Error('INTERRUPTED');
        const chunk = await reader.read();
        if (chunk.done) break;
        size += chunk.value.byteLength;
        if (size > 32768) { cancelBody(); return reply('rejected', 'The contact provider returned an invalid response. Acceptance is not confirmed.', 502); }
        body += decoder.decode(chunk.value, { stream: true });
      }
      if (controller.signal.aborted) throw new Error('INTERRUPTED');
      body += decoder.decode();
      let data: unknown;
      try { data = JSON.parse(body); } catch { return reply('rejected', 'The contact provider returned an invalid response. Acceptance is not confirmed.', 502); }
      if (!response.ok || !data || typeof data !== 'object' || Array.isArray(data) || (data as { success?: unknown }).success !== true) return reply('rejected', 'The contact provider did not confirm acceptance. Use the email link before retrying.', 502);
      return reply('accepted', 'The contact provider accepted your inquiry. This does not confirm that a person has read it.', 200);
    } finally { controller.signal.removeEventListener('abort', cancelBody); reader.releaseLock(); }
  };
  try { return await Promise.race([run(), interrupted]); }
  catch { return reply('network-error', 'Contact acceptance could not be confirmed. Use the email link before retrying.', 503); }
  finally { clearTimeout(timer!); controller.abort(); options.signal?.removeEventListener('abort', cancelled!); }
}
