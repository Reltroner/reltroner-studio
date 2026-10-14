import 'server-only';
import { createHmac, randomUUID } from 'node:crypto';
import { validateSubscription } from './schema';
import type { NewsletterServiceAdapter, SubscriptionResult } from './types';

/** Implement only with an owner-approved shared boundary, never a per-instance Map.
 * Reserve global free-plan capacity, apply abuse limits, and serialize/reconcile
 * identical payloads across instances. A denial returns null without calling work.
 */
export interface NewsletterDeliveryControl {
  scope: 'deployment';
  enforcesFreePlanHardStop: true;
  verifiedAbuseControls: true;
  withReservation(request: { key: string; maxProviderOperations: number; signal: AbortSignal }, work: () => Promise<SubscriptionResult>): Promise<SubscriptionResult | null>;
}

export interface ResendProviderOptions {
  apiKey: string;
  segmentId: string;
  control?: NewsletterDeliveryControl;
  /** External enforcement, not an in-process limiter. Set only by the server
   * composition after the deployment's WAF and provider Free hard stop are verified. */
  edgeProtection?: 'vercel-waf';
  transport?: (request: Request) => Promise<Response>;
  timeoutMilliseconds?: number;
  diagnostic?: (event: { scope: 'newsletter'; requestId: string; outcome: string; mutationAttempted: boolean }) => void;
}

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const MAX_RESPONSE_BYTES = 16_384;
type Failure = 'configuration' | 'quota' | 'rejected' | 'network' | 'timeout' | 'malformed' | 'suppressed' | 'preferences' | 'indeterminate';
class ProviderFailure extends Error { constructor(readonly code: Failure) { super(code); } }

function result(status: SubscriptionResult['status'], message: string): SubscriptionResult {
  return { status, message, delivered: false, verified: false };
}

async function providerJson(response: Response, signal: AbortSignal): Promise<Record<string, unknown>> {
  if (response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json'
    || Number(response.headers.get('content-length') || 0) > MAX_RESPONSE_BYTES) throw new ProviderFailure('malformed');
  const reader = response.body?.getReader();
  if (!reader) throw new ProviderFailure('malformed');
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      if (signal.aborted) throw new ProviderFailure('timeout');
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_RESPONSE_BYTES) { cancel(); throw new ProviderFailure('malformed'); }
      chunks.push(chunk.value);
    }
    if (signal.aborted) throw new ProviderFailure('timeout');
    const data: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new ProviderFailure('malformed');
    return data as Record<string, unknown>;
  } catch (error) {
    if (error instanceof ProviderFailure) throw error;
    throw new ProviderFailure('malformed');
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
}

/** Real Contacts API transport. The runtime service separately enforces activation gates.
 * RC-API-01's contract-only adapter is preserved unchanged. No email sending exists here.
 */
export function createResendNewsletterProvider(options?: ResendProviderOptions): NewsletterServiceAdapter {
  return {
    provider: 'resend',
    async subscribe(input, idempotencyKey) {
      const checked = validateSubscription(input);
      if (!checked.input || /[\u0000-\u001f\u007f]/.test(checked.input.email)) return result('invalid', 'Enter a valid email address and explicitly opt in.');
      const timeoutMilliseconds = options?.timeoutMilliseconds ?? 8000;
      if (!options || typeof options.apiKey !== 'string' || !/^re_[a-zA-Z0-9_]{8,100}$/.test(options.apiKey)
        || /placeholder|your_|changeme/i.test(options.apiKey) || !UUID.test(options.segmentId || '')
        || (options.edgeProtection !== 'vercel-waf' && (options.control?.scope !== 'deployment' || options.control.enforcesFreePlanHardStop !== true
        || options.control.verifiedAbuseControls !== true || typeof options.control.withReservation !== 'function'))
        || !Number.isInteger(timeoutMilliseconds) || timeoutMilliseconds < 1 || timeoutMilliseconds > 8000) {
        return result('rejected', 'Newsletter provider configuration or approved abuse controls are unavailable. No subscription has been confirmed.');
      }
      const email = checked.input.email;
      const controller = new AbortController();
      const requestId = UUID.test(idempotencyKey || '') ? idempotencyKey : randomUUID();
      let operations = 0;
      let mutationAttempted = false;
      let workStarted = false;
      let evidenceConfirmed = false;
      let lastOperation = 0;
      const transport = options.transport ?? ((request: Request) => fetch(request));

      async function call(path: string, body?: Record<string, unknown>, post = Boolean(body)) {
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        if (++operations > 7) throw new ProviderFailure('quota');
        // The default Resend team limit is 2 requests/second. Space this request's
        // calls; only the external WAF limits traffic across serverless instances.
        if (!options.transport && lastOperation) {
          await new Promise<void>((resolve, reject) => {
            const abort = () => { clearTimeout(pause); reject(new ProviderFailure('timeout')); };
            const pause = setTimeout(() => { controller.signal.removeEventListener('abort', abort); resolve(); }, Math.max(0, 600 - (Date.now() - lastOperation)));
            controller.signal.addEventListener('abort', abort, { once: true });
          });
        }
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        lastOperation = Date.now();
        if (post) mutationAttempted = true;
        let response: Response;
        try {
          response = await transport(new Request(`https://api.resend.com${path}`, {
            method: post ? 'POST' : 'GET', cache: 'no-store', redirect: 'error', signal: controller.signal,
            headers: { Authorization: `Bearer ${options.apiKey}`, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
            ...(body ? { body: JSON.stringify(body) } : {}),
          }));
        } catch { throw new ProviderFailure(controller.signal.aborted ? 'timeout' : 'network'); }
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        if (!(response instanceof Response) || response.redirected) throw new ProviderFailure('malformed');
        if (response.status === 429) throw new ProviderFailure('quota');
        if (response.status >= 500) throw new ProviderFailure(mutationAttempted ? 'indeterminate' : 'network');
        const data = await providerJson(response, controller.signal);
        if (!post && response.status === 404 && data.name === 'not_found') return null;
        if (post && path === '/contacts' && response.status === 409) return null;
        if (!response.ok) throw new ProviderFailure('rejected');
        return data;
      }

      function activeContact(data: Record<string, unknown> | null, expectedId?: string): string {
        if (!data || data.object !== 'contact' || typeof data.id !== 'string' || !UUID.test(data.id)
          || (expectedId && data.id !== expectedId) || data.email !== email || typeof data.unsubscribed !== 'boolean') throw new ProviderFailure('malformed');
        if (data.unsubscribed) throw new ProviderFailure('suppressed');
        return data.id;
      }

      async function hasMembership(id: string) {
        const list = await call(`/contacts/${id}/segments`);
        if (!list || list.object !== 'list' || !Array.isArray(list.data) || list.data.length > 100 || typeof list.has_more !== 'boolean'
          || list.data.some(item => !item || typeof item !== 'object' || typeof item.id !== 'string' || !UUID.test(item.id))) throw new ProviderFailure('malformed');
        if (list.data.some(item => item.id === options.segmentId)) return true;
        if (list.has_more) throw new ProviderFailure('indeterminate');
        return false;
      }

      async function reconcileExisting(existing: Record<string, unknown>): Promise<SubscriptionResult> {
        const id = activeContact(existing);
        if (await hasMembership(id)) {
          evidenceConfirmed = true;
          return result('duplicate', 'Resend confirms this address is already on the Studio newsletter list. No email was sent.');
        }
        // Fresh explicit opt-in may add an active global contact to this segment.
        // Never PATCH unsubscribed or Topics, including during concurrent signups.
        const added = await call(`/contacts/${id}/segments/${options.segmentId}`, undefined, true);
        if (!added || added.id !== options.segmentId) throw new ProviderFailure('malformed');
        activeContact(await call(`/contacts/${id}`), id);
        if (!await hasMembership(id)) throw new ProviderFailure('indeterminate');
        evidenceConfirmed = true;
        return result('accepted', 'Your subscription was saved in Resend. No email was sent.');
      }

      const persist = async (): Promise<SubscriptionResult> => {
        if (workStarted) throw new ProviderFailure('quota');
        workStarted = true;
        const existing = await call(`/contacts/${encodeURIComponent(email)}`);
        if (existing) return reconcileExisting(existing);
        // Never set unsubscribed:false or patch a returning contact. A known suppressed
        // address needs a separately verified renewed-consent/re-subscription workflow.
        const created = await call('/contacts', { email, segments: [{ id: options.segmentId }] });
        if (!created) {
          const concurrent = await call(`/contacts/${encodeURIComponent(email)}`);
          if (!concurrent) throw new ProviderFailure('indeterminate');
          return reconcileExisting(concurrent);
        }
        if (!created || created.object !== 'contact' || typeof created.id !== 'string' || !UUID.test(created.id)) throw new ProviderFailure('malformed');
        const id = activeContact(await call(`/contacts/${created.id}`), created.id);
        if (!await hasMembership(id)) throw new ProviderFailure('indeterminate');
        evidenceConfirmed = true;
        return result('accepted', 'Your subscription was saved in Resend. No email was sent.');
      };

      let timer: ReturnType<typeof setTimeout>;
      const expired = new Promise<never>((_, reject) => {
        timer = setTimeout(() => { controller.abort(); reject(new ProviderFailure('timeout')); }, timeoutMilliseconds);
      });
      let feedback: SubscriptionResult;
      let outcome: string;
      try {
        const key = createHmac('sha256', options.apiKey).update(`reltroner-newsletter:${options.segmentId}:${email}`).digest('hex');
        const reserved = await Promise.race([
          options.edgeProtection === 'vercel-waf' ? persist() : options.control!.withReservation({ key, maxProviderOperations: 7, signal: controller.signal }, persist), expired,
        ]);
        feedback = reserved ?? result('quota-error', 'The newsletter request limit was reached. Subscription acceptance is not confirmed.');
        if (!feedback || !['accepted', 'duplicate', 'quota-error'].includes(feedback.status) || typeof feedback.message !== 'string'
          || feedback.delivered !== false || feedback.verified !== false) throw new ProviderFailure('malformed');
        if (feedback.status !== 'quota-error' && !evidenceConfirmed) throw new ProviderFailure('indeterminate');
        outcome = reserved ? feedback.status : 'quota';
      } catch (error) {
        const code = error instanceof ProviderFailure ? error.code : 'indeterminate';
        outcome = code;
        feedback = code === 'quota' ? result('quota-error', 'The newsletter request limit was reached. Subscription acceptance is not confirmed.')
          : code === 'suppressed' || code === 'preferences' ? result('rejected', 'Existing subscription preferences require review. Subscription acceptance is not confirmed.')
          : result(code === 'network' || code === 'timeout' ? 'network-error' : 'rejected', 'Subscription acceptance could not be confirmed. Check your preferences before retrying.');
      } finally { controller.abort(); clearTimeout(timer!); }
      try { options.diagnostic?.({ scope: 'newsletter', requestId, outcome, mutationAttempted }); } catch {}
      return { ...feedback };
    },
    async unsubscribe() {
      // A raw email/contact ID is not an authorized unsubscribe token.
      return result('rejected', 'Use the protected unsubscribe link in a Studio newsletter. This website does not change preferences from an email address or raw token.');
    },
  };
}
