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
  withReservation(
    request: { key: string; maxProviderOperations: number; signal: AbortSignal },
    work: () => Promise<SubscriptionResult>
  ): Promise<SubscriptionResult | null>;
}

export type NewsletterDiagnosticStage = 'provider_initialization' | 'hmac_reservation' | 'reservation_control'
  | 'contact_lookup' | 'contact_creation' | 'contact_readback' | 'segment_membership_verification'
  | 'segment_addition' | 'request_construction' | 'fetch_invocation' | 'provider_response'
  | 'response_parsing' | 'confirmation';
export type NewsletterDiagnosticOperation = 'initialize' | 'calculate_reservation' | 'reserve_capacity'
  | 'lookup_contact' | 'create_contact' | 'read_contact' | 'verify_membership' | 'add_membership';
export type NewsletterDiagnosticError = 'none' | 'initialization' | 'hmac' | 'request_construction' | 'fetch_rejected'
  | 'provider_authentication' | 'provider_rejected' | 'provider_quota' | 'provider_server'
  | 'response_json' | 'response_shape' | 'suppressed' | 'preferences' | 'timeout'
  | 'operation_quota' | 'reservation_denied' | 'indeterminate';
export type NewsletterDiagnosticOutcome = Failure | 'accepted' | 'duplicate' | 'quota-error';
export interface NewsletterDiagnostic {
  readonly scope: 'newsletter';
  readonly requestId: string;
  readonly stage: NewsletterDiagnosticStage;
  readonly operation: NewsletterDiagnosticOperation;
  readonly requestConstructed: boolean;
  readonly fetchEntered: boolean;
  readonly providerHttpStatus: number | null;
  readonly errorCategory: NewsletterDiagnosticError;
  readonly mutationAttempted: boolean;
  readonly evidenceConfirmed: boolean;
  readonly outcome: NewsletterDiagnosticOutcome;
}

export interface ResendProviderOptions {
  apiKey: string;
  segmentId: string;
  control?: NewsletterDeliveryControl;
  /** External enforcement, not an in-process limiter. Set only after the deployment's
   * WAF and provider Free hard stop are verified. */
  edgeProtection?: 'vercel-waf' | 'cloudflare-waf';
  transport?: (request: Request) => Promise<Response>;
  timeoutMilliseconds?: number;
  diagnostic?: (event: NewsletterDiagnostic) => void;
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
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const data: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new ProviderFailure('malformed');
    return data as Record<string, unknown>;
  } catch (error) {
    if (error instanceof ProviderFailure) throw error;
    throw new ProviderFailure('malformed');
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
}

async function computeReservationKey(apiKey: string, segmentId: string, email: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(apiKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(`reltroner-newsletter:${segmentId}:${email}`));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Real Contacts API transport. The runtime service separately enforces activation gates.
 * Worker-compatible (no Node-only modules or server-only markers). No email sending exists here.
 */
export function createResendNewsletterProvider(options?: ResendProviderOptions): NewsletterServiceAdapter {
  return {
    provider: 'resend',
    async subscribe(input, idempotencyKey) {
      const checked = validateSubscription(input);
      if (!checked.input || /[\u0000-\u001f\u007f]/.test(checked.input.email)) return result('invalid', 'Enter a valid email address and explicitly opt in.');
      const timeoutMilliseconds = options?.timeoutMilliseconds ?? 8000;
      const isEdgeProtected = options?.edgeProtection === 'vercel-waf' || options?.edgeProtection === 'cloudflare-waf';
      if (!options || typeof options.apiKey !== 'string' || !/^re_[a-zA-Z0-9_]{8,100}$/.test(options.apiKey)
        || /placeholder|your_|changeme/i.test(options.apiKey) || !UUID.test(options.segmentId || '')
        || (!isEdgeProtected && (options.control?.scope !== 'deployment' || options.control.enforcesFreePlanHardStop !== true
        || options.control.verifiedAbuseControls !== true || typeof options.control.withReservation !== 'function'))
        || !Number.isInteger(timeoutMilliseconds) || timeoutMilliseconds < 1 || timeoutMilliseconds > 8000) {
        return result('rejected', 'Newsletter provider configuration or approved abuse controls are unavailable. No subscription has been confirmed.');
      }
      const email = checked.input.email;
      let controller: AbortController;
      let requestId: string;
      try {
        controller = new AbortController();
        requestId = UUID.test(idempotencyKey || '') ? idempotencyKey : crypto.randomUUID();
      } catch (error) {
        // Preserve the original exception/public route behavior; log only an existing UUID.
        try {
          if (UUID.test(idempotencyKey || '')) options.diagnostic?.(Object.freeze({
            scope: 'newsletter', requestId: idempotencyKey, stage: 'provider_initialization', operation: 'initialize',
            requestConstructed: false, fetchEntered: false, providerHttpStatus: null, errorCategory: 'initialization',
            mutationAttempted: false, evidenceConfirmed: false, outcome: 'indeterminate',
          }));
        } catch {}
        throw error;
      }
      let operations = 0;
      let mutationAttempted = false;
      let workStarted = false;
      let evidenceConfirmed = false;
      let lastOperation = 0;
      let stage: NewsletterDiagnosticStage = 'provider_initialization';
      let operation: NewsletterDiagnosticOperation = 'initialize';
      let requestConstructed = false;
      let fetchEntered = false;
      let providerHttpStatus: number | null = null;
      let errorCategory: NewsletterDiagnosticError = 'none';
      const transport = options.transport ?? ((request: Request) => fetch(request));

      async function call(operationName: NewsletterDiagnosticOperation, operationStage: NewsletterDiagnosticStage,
        path: string, body?: Record<string, unknown>, post = Boolean(body)) {
        operation = operationName;
        stage = operationStage;
        requestConstructed = false;
        fetchEntered = false;
        providerHttpStatus = null;
        errorCategory = 'none';
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        if (++operations > 7) { errorCategory = 'operation_quota'; throw new ProviderFailure('quota'); }
        // Space native transport calls so we don't exceed Resend 2 req/s limit within a single invocation
        if (!options.transport && lastOperation) {
          await new Promise<void>((resolve, reject) => {
            const abort = () => { clearTimeout(pause); reject(new ProviderFailure('timeout')); };
            const pause = setTimeout(() => { controller.signal.removeEventListener('abort', abort); resolve(); }, Math.max(0, 600 - (Date.now() - lastOperation)));
            controller.signal.addEventListener('abort', abort, { once: true });
          });
        }
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        lastOperation = Date.now();
        let response: Response;
        try {
          stage = 'request_construction';
          const providerRequest = new Request(`https://api.resend.com${path}`, {
            method: post ? 'POST' : 'GET', cache: 'no-store', redirect: 'manual', signal: controller.signal,
            headers: { Authorization: `Bearer ${options.apiKey}`, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
            ...(body ? { body: JSON.stringify(body) } : {}),
          });
          requestConstructed = true;
          stage = 'fetch_invocation';
          fetchEntered = true;
          if (post) mutationAttempted = true;
          response = await transport(providerRequest);
        } catch {
          errorCategory = controller.signal.aborted ? 'timeout' : requestConstructed ? 'fetch_rejected' : 'request_construction';
          throw new ProviderFailure(controller.signal.aborted ? 'timeout' : 'network');
        }
        stage = 'provider_response';
        if (response instanceof Response && Number.isInteger(response.status) && response.status >= 100 && response.status <= 599) {
          providerHttpStatus = response.status;
        }
        if (controller.signal.aborted) throw new ProviderFailure('timeout');
        if (!(response instanceof Response) || response.redirected) { errorCategory = 'response_shape'; throw new ProviderFailure('malformed'); }
        // Never follow Location or parse redirect bodies; credentials stay on the original request.
        if (response.status >= 300 && response.status < 400) { errorCategory = 'provider_rejected'; throw new ProviderFailure('rejected'); }
        if (response.status === 429) { errorCategory = 'provider_quota'; throw new ProviderFailure('quota'); }
        if (response.status >= 500) { errorCategory = 'provider_server'; throw new ProviderFailure(mutationAttempted ? 'indeterminate' : 'network'); }
        if (!response.ok) errorCategory = response.status === 401 || response.status === 403 ? 'provider_authentication' : 'provider_rejected';
        stage = 'response_parsing';
        let data: Record<string, unknown>;
        try { data = await providerJson(response, controller.signal); }
        catch (error) {
          if (errorCategory === 'none') errorCategory = controller.signal.aborted ? 'timeout' : 'response_json';
          throw error;
        }
        if (!post && response.status === 404 && data.name === 'not_found') { errorCategory = 'none'; return null; }
        if (post && path === '/contacts' && response.status === 409) { errorCategory = 'none'; return null; }
        if (!response.ok) { stage = 'provider_response'; throw new ProviderFailure('rejected'); }
        return data;
      }

      function activeContact(data: Record<string, unknown> | null, expectedId?: string): string {
        stage = operation === 'read_contact' ? 'contact_readback' : 'contact_lookup';
        if (!data || data.object !== 'contact' || typeof data.id !== 'string' || !UUID.test(data.id)
          || (expectedId && data.id !== expectedId) || data.email !== email || typeof data.unsubscribed !== 'boolean') throw new ProviderFailure('malformed');
        if (data.unsubscribed) throw new ProviderFailure('suppressed');
        return data.id;
      }

      async function hasMembership(id: string) {
        const list = await call('verify_membership', 'segment_membership_verification', `/contacts/${id}/segments`);
        stage = 'segment_membership_verification';
        if (!list || list.object !== 'list' || !Array.isArray(list.data) || list.data.length > 100 || typeof list.has_more !== 'boolean'
          || list.data.some(item => !item || typeof item !== 'object' || typeof (item as Record<string, unknown>).id !== 'string' || !UUID.test((item as Record<string, unknown>).id as string))) throw new ProviderFailure('malformed');
        if ((list.data as Array<Record<string, unknown>>).some(item => item.id === options.segmentId)) return true;
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
        const added = await call('add_membership', 'segment_addition', `/contacts/${id}/segments/${options.segmentId}`, undefined, true);
        stage = 'segment_addition';
        if (!added || added.id !== options.segmentId) throw new ProviderFailure('malformed');
        activeContact(await call('read_contact', 'contact_readback', `/contacts/${id}`), id);
        if (!await hasMembership(id)) throw new ProviderFailure('indeterminate');
        evidenceConfirmed = true;
        return result('accepted', 'Your subscription was saved in Resend. No email was sent.');
      }

      const persist = async (): Promise<SubscriptionResult> => {
        if (workStarted) throw new ProviderFailure('quota');
        workStarted = true;
        const existing = await call('lookup_contact', 'contact_lookup', `/contacts/${encodeURIComponent(email)}`);
        if (existing) return reconcileExisting(existing);
        // Never set unsubscribed:false or patch a returning contact. A known suppressed
        // address needs a separately verified renewed-consent/re-subscription workflow.
        const created = await call('create_contact', 'contact_creation', '/contacts', { email, segments: [{ id: options.segmentId }] });
        stage = 'contact_creation';
        if (!created) {
          const concurrent = await call('lookup_contact', 'contact_lookup', `/contacts/${encodeURIComponent(email)}`);
          if (!concurrent) throw new ProviderFailure('indeterminate');
          return reconcileExisting(concurrent);
        }
        if (!created || created.object !== 'contact' || typeof created.id !== 'string' || !UUID.test(created.id)) throw new ProviderFailure('malformed');
        const id = activeContact(await call('read_contact', 'contact_readback', `/contacts/${created.id}`), created.id);
        if (!await hasMembership(id)) throw new ProviderFailure('indeterminate');
        evidenceConfirmed = true;
        return result('accepted', 'Your subscription was saved in Resend. No email was sent.');
      };

      let timer: ReturnType<typeof setTimeout>;
      const expired = new Promise<never>((_, reject) => {
        timer = setTimeout(() => { controller.abort(); reject(new ProviderFailure('timeout')); }, timeoutMilliseconds);
      });
      let feedback: SubscriptionResult;
      let outcome: NewsletterDiagnosticOutcome;
      try {
        stage = 'hmac_reservation';
        operation = 'calculate_reservation';
        const key = await computeReservationKey(options.apiKey, options.segmentId, email);
        stage = 'reservation_control';
        operation = 'reserve_capacity';
        const reserved = await Promise.race([
          isEdgeProtected ? persist() : options.control!.withReservation({ key, maxProviderOperations: 7, signal: controller.signal }, persist),
          expired,
        ]);
        feedback = reserved ?? result('quota-error', 'The newsletter request limit was reached. Subscription acceptance is not confirmed.');
        if (!feedback || !['accepted', 'duplicate', 'quota-error'].includes(feedback.status) || typeof feedback.message !== 'string'
          || feedback.delivered !== false || feedback.verified !== false) throw new ProviderFailure('malformed');
        if (feedback.status !== 'quota-error' && !evidenceConfirmed) throw new ProviderFailure('indeterminate');
        outcome = !reserved ? 'quota' : feedback.status === 'accepted' ? 'accepted' : feedback.status === 'duplicate' ? 'duplicate' : 'quota-error';
        if (feedback.status === 'quota-error') errorCategory = 'reservation_denied';
        else stage = 'confirmation';
      } catch (error) {
        const code = error instanceof ProviderFailure ? error.code : 'indeterminate';
        if (code === 'timeout') errorCategory = 'timeout';
        else if (errorCategory === 'none') errorCategory = stage === 'hmac_reservation' ? 'hmac'
          : code === 'malformed' ? 'response_shape' : code === 'quota' ? 'operation_quota'
          : code === 'suppressed' ? 'suppressed' : code === 'preferences' ? 'preferences' : 'indeterminate';
        outcome = code;
        feedback = code === 'quota' ? result('quota-error', 'The newsletter request limit was reached. Subscription acceptance is not confirmed.')
          : code === 'suppressed' || code === 'preferences' ? result('rejected', 'Existing subscription preferences require review. Subscription acceptance is not confirmed.')
          : result(code === 'network' || code === 'timeout' ? 'network-error' : 'rejected', 'Subscription acceptance could not be confirmed. Check your preferences before retrying.');
      } finally { controller.abort(); clearTimeout(timer!); }
      // Explicit primitive-only projection: never spread input, options, provider data or errors.
      // Construction/fetch/status describe the current operation; mutation/evidence are cumulative.
      try { options.diagnostic?.(Object.freeze({ scope: 'newsletter', requestId, stage, operation,
        requestConstructed, fetchEntered, providerHttpStatus, errorCategory, mutationAttempted, evidenceConfirmed, outcome })); } catch {}
      return { ...feedback };
    },
    async unsubscribe() {
      // A raw email/contact ID is not an authorized unsubscribe token.
      return result('rejected', 'Use the protected unsubscribe link in a Studio newsletter. This website does not change preferences from an email address or raw token.');
    },
  };
}
