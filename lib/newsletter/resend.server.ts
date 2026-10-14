import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import { validateSubscription } from './schema';
import type { NewsletterServiceAdapter, SubscriptionInput, SubscriptionResult } from './types';

type Outcome = 'accepted' | 'duplicate' | 'invalid' | 'configuration' | 'suppressed' | 'preferences'
  | 'quota' | 'rate_limited' | 'rejected' | 'unavailable' | 'timeout' | 'network' | 'malformed' | 'indeterminate';

export interface ResendContractDiagnostic {
  scope: 'newsletter';
  mode: 'contract-test';
  provider: 'resend';
  requestId: string;
  outcome: Outcome;
  durationMs: number;
}

export interface ResendContractOptions {
  mode: 'contract-test';
  /** Inject a synthetic fixture transport. There is deliberately no default fetch. */
  transport: (request: Request) => Promise<Response>;
  apiKey: string;
  segmentId: string;
  timeoutMilliseconds?: number;
  maxProviderRequestsPerWindow?: number;
  windowMilliseconds?: number;
  now?: () => number;
  diagnostic?: (event: ResendContractDiagnostic) => void;
}

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const MAX_RESPONSE_BYTES = 16_384;
const MAX_DUPLICATE_KEYS = 128;

class ContractFailure extends Error {
  constructor(readonly outcome: Outcome) { super(outcome); }
}

function feedback(outcome: Outcome): SubscriptionResult {
  const status = outcome === 'accepted' || outcome === 'duplicate' ? outcome
    : outcome === 'invalid' ? 'invalid'
    : outcome === 'quota' || outcome === 'rate_limited' ? 'quota-error'
    : outcome === 'network' || outcome === 'timeout' || outcome === 'unavailable' ? 'network-error' : 'rejected';
  const message = outcome === 'accepted' ? 'The provider accepted the subscription. No welcome email was sent; address verification is not confirmed.'
    : outcome === 'duplicate' ? 'The provider already accepted this subscription. No welcome email was sent.'
    : outcome === 'invalid' ? 'Enter a valid email address and explicitly opt in.'
    : outcome === 'configuration' ? 'Newsletter provider configuration is unavailable. No subscription has been confirmed.'
    : outcome === 'suppressed' || outcome === 'preferences' ? 'Existing subscription preferences require review. No preferences were changed.'
    : outcome === 'quota' || outcome === 'rate_limited' ? 'The newsletter request limit was reached. Subscription acceptance is not confirmed.'
    : 'Subscription acceptance could not be confirmed. Check your preferences before retrying.';
  // Resend contact acceptance is neither inbox delivery nor address verification.
  return { status, message, delivered: false, verified: false };
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ContractFailure('malformed');
  return value as Record<string, unknown>;
}

async function readProviderJson(response: Response, signal: AbortSignal): Promise<Record<string, unknown>> {
  if (!response.headers.get('content-type')?.split(';')[0].trim().toLowerCase().endsWith('/json')
    || Number(response.headers.get('content-length') || 0) > MAX_RESPONSE_BYTES) throw new ContractFailure('malformed');
  const reader = response.body?.getReader();
  if (!reader) throw new ContractFailure('malformed');
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      if (signal.aborted) throw new ContractFailure('timeout');
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_RESPONSE_BYTES) {
        void reader.cancel().catch(() => {});
        throw new ContractFailure('malformed');
      }
      chunks.push(chunk.value);
    }
    if (signal.aborted) throw new ContractFailure('timeout');
    return record(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  } catch (error) {
    if (error instanceof ContractFailure) throw error;
    throw new ContractFailure('malformed');
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
}

/**
 * Isolated HTTP contract rehearsal, NOT a production-enabled provider.
 * Production is refused; no env var selects this adapter; native fetch is refused.
 * The current newsletterService remains disconnected. Activation needs a separate
 * reviewed secret boundary, durable abuse/quota controls and unsubscribe/privacy contract.
 */
export function createResendContractAdapter(options?: ResendContractOptions): NewsletterServiceAdapter {
  const deadline = options?.timeoutMilliseconds ?? 8000;
  const limit = options?.maxProviderRequestsPerWindow ?? 16;
  const windowMilliseconds = options?.windowMilliseconds ?? 60_000;
  const now = options?.now ?? Date.now;
  // These memory counters/coalescing keys bound a test instance, never serverless-wide usage.
  const submissions = new Map<string, { expiresAt: number; result: Promise<SubscriptionResult> }>();
  let windowEnds = 0;
  let calls = 0;

  function configured(): boolean {
    return process.env.NODE_ENV !== 'production' && options?.mode === 'contract-test'
      && typeof options.transport === 'function' && options.transport !== globalThis.fetch
      && typeof options.apiKey === 'string' && /^re_[a-zA-Z0-9_]{8,100}$/.test(options.apiKey)
      && !/placeholder|your_|changeme/i.test(options.apiKey)
      && typeof options.segmentId === 'string' && UUID.test(options.segmentId)
      && Number.isInteger(deadline) && deadline >= 1 && deadline <= 8000
      && Number.isInteger(limit) && limit >= 1 && limit <= 100
      && Number.isInteger(windowMilliseconds) && windowMilliseconds >= 1000 && windowMilliseconds <= 86_400_000;
  }

  function diagnose(requestId: string, outcome: Outcome, startedAt: number) {
    // Never include addresses, tokens, provider messages/bodies, exception text or request URLs.
    try { options?.diagnostic?.({ scope: 'newsletter', mode: 'contract-test', provider: 'resend', requestId, outcome, durationMs: Math.max(0, now() - startedAt) }); } catch {}
  }

  async function perform(input: SubscriptionInput): Promise<SubscriptionResult> {
    const requestId = randomUUID();
    const startedAt = now();
    const controller = new AbortController();
    let mutationAttempted = false;
    let timeout: ReturnType<typeof setTimeout>;

    async function call(path: string, body?: Record<string, unknown>): Promise<Record<string, unknown> | null> {
      if (controller.signal.aborted) throw new ContractFailure('timeout');
      const time = now();
      if (time >= windowEnds) { windowEnds = time + windowMilliseconds; calls = 0; }
      if (calls >= limit) throw new ContractFailure('quota');
      calls++;
      if (body) mutationAttempted = true;
      let response: Response;
      try {
        response = await options!.transport(new Request(`https://api.resend.com${path}`, {
          method: body ? 'POST' : 'GET', redirect: 'error', cache: 'no-store', signal: controller.signal,
          headers: { Authorization: `Bearer ${options!.apiKey}`, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
          ...(body ? { body: JSON.stringify(body) } : {}),
        }));
      } catch { throw new ContractFailure(controller.signal.aborted ? 'timeout' : 'network'); }
      if (controller.signal.aborted) throw new ContractFailure('timeout');
      if (!(response instanceof Response) || response.redirected) throw new ContractFailure('malformed');
      if (response.status === 429) throw new ContractFailure('rate_limited');
      if (response.status >= 500) throw new ContractFailure(mutationAttempted ? 'indeterminate' : 'unavailable');
      const data = await readProviderJson(response, controller.signal);
      if (!body && response.status === 404 && data.name === 'not_found') return null;
      if (!response.ok) throw new ContractFailure('rejected');
      return data;
    }

    function contact(data: Record<string, unknown> | null, expectedId?: string) {
      if (!data || data.object !== 'contact' || typeof data.id !== 'string' || !UUID.test(data.id)
        || (expectedId && data.id !== expectedId) || data.email !== input.email || typeof data.unsubscribed !== 'boolean') throw new ContractFailure('malformed');
      if (data.unsubscribed) throw new ContractFailure('suppressed');
      return data.id;
    }

    async function hasSegment(id: string): Promise<boolean> {
      const data = await call(`/contacts/${id}/segments`);
      if (!data || data.object !== 'list' || !Array.isArray(data.data) || data.data.length > 100 || typeof data.has_more !== 'boolean') throw new ContractFailure('malformed');
      const ids = data.data.map((item) => {
        const segment = record(item);
        if (typeof segment.id !== 'string' || !UUID.test(segment.id)) throw new ContractFailure('malformed');
        return segment.id;
      });
      if (ids.includes(options!.segmentId)) return true;
      if (data.has_more) throw new ContractFailure('indeterminate');
      return false;
    }

    const run = async (): Promise<Outcome> => {
      const existing = await call(`/contacts/${encodeURIComponent(input.email)}`);
      if (existing) {
        const id = contact(existing);
        // Never update/reactivate returning contacts or infer membership from their existence.
        if (!await hasSegment(id)) throw new ContractFailure('preferences');
        return 'duplicate';
      }
      const created = await call('/contacts', { email: input.email, segments: [{ id: options!.segmentId }] });
      // No unsubscribed:false override and no welcome email. Contacts POST idempotency
      // is not assumed. A concurrent suppression/create race still blocks live activation.
      if (!created || created.object !== 'contact' || typeof created.id !== 'string' || !UUID.test(created.id)) throw new ContractFailure('malformed');
      contact(await call(`/contacts/${created.id}`), created.id);
      if (!await hasSegment(created.id)) throw new ContractFailure('indeterminate');
      return 'accepted';
    };

    const expired = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => { controller.abort(); reject(new ContractFailure('timeout')); }, deadline);
    });
    let outcome: Outcome;
    try { outcome = await Promise.race([run(), expired]); }
    catch (error) { outcome = error instanceof ContractFailure ? error.outcome : 'malformed'; }
    finally { controller.abort(); clearTimeout(timeout!); }
    diagnose(requestId, outcome, startedAt);
    return feedback(outcome);
  }

  return {
    provider: 'resend',
    async subscribe(input, _idempotencyKey) {
      const checked = validateSubscription(input);
      if (!checked.input || /[\u0000-\u001f\u007f]/.test(checked.input.email)) return feedback('invalid');
      if (!configured()) return feedback('configuration');
      const time = now();
      for (const [key, value] of submissions) if (value.expiresAt <= time) submissions.delete(key);
      // Bind coalescing to normalized payload, not the prototype route's constant key.
      // Cache uncertain failures too, so an immediate duplicate never repeats a POST.
      const key = createHash('sha256').update(JSON.stringify(checked.input)).digest('hex');
      const previous = submissions.get(key);
      if (previous) {
        const result = await previous.result;
        return result.status === 'accepted' ? feedback('duplicate') : { ...result };
      }
      if (submissions.size >= MAX_DUPLICATE_KEYS) return feedback('quota');
      const result = perform(checked.input);
      submissions.set(key, { expiresAt: time + Math.max(windowMilliseconds, deadline), result });
      return { ...await result };
    },
    async unsubscribe() {
      return { status: 'prototype', message: 'Unsubscribe is not connected in this prototype. No subscription records are stored here.', delivered: false, verified: false };
    },
  };
}
