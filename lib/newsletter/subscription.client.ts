'use client';
import { validateSubscription } from './schema';
import type { SubscriptionInput, SubscriptionResult } from './types';

/** Where the browser-observed outcome came from. `application-result` is the only
 * category whose body was produced (and validated) as this site's JSON contract.
 */
export type SubscriptionResponseCategory = 'application-result' | 'platform-error' | 'platform-rate-limit'
  | 'invalid-response' | 'timeout' | 'network' | 'not-sent';

/** Primitive-only correlation record: never the address, body, provider data or exception text. */
export interface SubscriptionClientDiagnostic {
  readonly scope: 'newsletter-client';
  readonly category: SubscriptionResponseCategory;
  readonly requestSent: boolean;
  readonly httpStatus: number | null;
  readonly contentType: 'json' | 'html' | 'other' | 'none';
  readonly retryAfterSeconds: number | null;
  readonly rayId: string | null;
  readonly requestId: string | null;
}

export interface SubscriptionAttempt {
  /** True only for a 2xx JSON result whose status is a provider-confirmed (or prototype) outcome. */
  confirmed: boolean;
  result: SubscriptionResult;
  diagnostic: SubscriptionClientDiagnostic;
}

interface SubscriptionClientOptions {
  fetcher?: typeof fetch;
  now?: () => number;
  timeoutMilliseconds?: number;
}

const STATUSES = ['invalid', 'prototype', 'accepted', 'subscribed', 'duplicate', 'rejected', 'network-error', 'quota-error'];
const CONFIRMED = ['prototype', 'accepted', 'subscribed', 'duplicate'];
const MAX_RESPONSE_BYTES = 16_384;
// Matches the 10s browser request bound, beyond the provider's 8s server deadline,
// so an earlier invocation has settled before a manual recheck is sent.
const UNCERTAIN_HOLD_SECONDS = 10;
const MAX_HOLD_SECONDS = 3600;
const RAY = /^[a-f0-9]{16}(-[A-Z]{3})?$/;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const unconfirmed = 'Your address may or may not have been saved, and no automatic retry was made.';

class Interrupted extends Error {}

function result(status: SubscriptionResult['status'], message: string): SubscriptionResult {
  return { status, message, delivered: false, verified: false };
}

function retryAfter(value: string | null, now: number): number | null {
  const text = value?.trim() || '';
  if (!text) return null;
  const seconds = /^\d{1,7}$/.test(text) ? Number(text) : Math.ceil((Date.parse(text) - now) / 1000);
  return Number.isFinite(seconds) && seconds >= 0 ? Math.min(seconds, MAX_HOLD_SECONDS) : null;
}

/** Same-origin browser transport for POST /api/newsletter. Sends at most one POST per
 * call, never retries, never parses a non-JSON body, and holds further submissions
 * after any unconfirmed outcome until Retry-After (or the request bound) elapses.
 */
export function createSubscriptionClient(options: SubscriptionClientOptions = {}) {
  const now = options.now ?? Date.now;
  const timeoutMilliseconds = options.timeoutMilliseconds ?? 10000;
  let inFlight = false;
  let holdUntil = 0;
  let held: SubscriptionResult | null = null;

  function notSent(status: SubscriptionResult['status'], message: string): SubscriptionAttempt {
    return { confirmed: false, result: result(status, message), diagnostic: Object.freeze({
      scope: 'newsletter-client', category: 'not-sent', requestSent: false, httpStatus: null,
      contentType: 'none', retryAfterSeconds: null, rayId: null, requestId: null,
    }) };
  }

  async function submit(input: SubscriptionInput): Promise<SubscriptionAttempt> {
    const checked = validateSubscription(input);
    if (!checked.input) return notSent('invalid', checked.error!);
    if (inFlight) return notSent('loading', 'A subscription request is already in progress. No additional request was sent.');
    const remaining = Math.ceil((holdUntil - now()) / 1000);
    if (held && remaining > 0) {
      return notSent(held.status, `The previous subscription request was not confirmed, so no additional request was sent. Please wait about ${remaining} seconds, then check your preferences before trying again.`);
    }
    inFlight = true;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const interrupted = new Promise<never>((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new Interrupted()); }, timeoutMilliseconds);
    });
    let category: SubscriptionResponseCategory = 'network';
    let httpStatus: number | null = null;
    let contentType: SubscriptionClientDiagnostic['contentType'] = 'none';
    let retryAfterSeconds: number | null = null;
    let rayId: string | null = null;
    let requestId: string | null = null;
    let confirmed = false;
    let feedback: SubscriptionResult;
    try {
      const response = await Promise.race([(options.fetcher ?? fetch)('/api/newsletter', {
        method: 'POST', credentials: 'same-origin', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(checked.input),
      }), interrupted]);
      httpStatus = response.status;
      const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() || '';
      contentType = type === 'application/json' ? 'json' : type === 'text/html' ? 'html' : type ? 'other' : 'none';
      retryAfterSeconds = retryAfter(response.headers.get('retry-after'), now());
      const ray = response.headers.get('cf-ray')?.trim() || '';
      rayId = RAY.test(ray) ? ray : null;
      const id = response.headers.get('x-request-id')?.trim() || '';
      requestId = UUID.test(id) ? id : null;
      if (contentType !== 'json' || response.redirected) {
        // Platform responses (e.g. Cloudflare HTML 502) are never parsed or trusted as a result.
        void response.body?.cancel().catch(() => {});
        if (response.status === 429) {
          category = 'platform-rate-limit';
          feedback = result('quota-error', 'The newsletter request limit was reached (HTTP 429). Subscription acceptance is not confirmed, and no automatic retry was made. Please wait before trying again.');
        } else {
          category = response.redirected ? 'invalid-response' : 'platform-error';
          feedback = result('network-error', `Subscription status could not be confirmed: the website returned HTTP ${response.status} instead of a subscription result. ${unconfirmed} Please wait, then check your preferences before trying again.`);
        }
      } else {
        const text = await Promise.race([response.text(), interrupted]);
        let data: unknown;
        try { data = text.length > MAX_RESPONSE_BYTES ? null : JSON.parse(text); } catch { data = null; }
        const value = data && typeof data === 'object' && !Array.isArray(data) ? data as Record<string, unknown> : null;
        // Success needs HTTP 2xx; delivery/verification may never be claimed by this endpoint.
        if (!value || typeof value.message !== 'string' || typeof value.status !== 'string' || !STATUSES.includes(value.status)
          || ('delivered' in value && value.delivered !== false) || ('verified' in value && value.verified !== false)
          || (!response.ok && CONFIRMED.includes(value.status))) {
          category = 'invalid-response';
          feedback = result('network-error', `Subscription status could not be confirmed: the response was not a valid subscription result (HTTP ${response.status}). ${unconfirmed} Please check your preferences before trying again.`);
        } else {
          category = 'application-result';
          confirmed = response.ok && CONFIRMED.includes(value.status);
          feedback = result(value.status as SubscriptionResult['status'], value.message);
        }
      }
    } catch (error) {
      category = error instanceof Interrupted || controller.signal.aborted ? 'timeout' : 'network';
      feedback = result('network-error', category === 'timeout'
        ? `Subscription status could not be confirmed before the request timed out. ${unconfirmed} Please check your preferences before trying again.`
        : `Subscription status could not be confirmed because the connection failed. ${unconfirmed} Please check your preferences before trying again.`);
    } finally {
      clearTimeout(timer);
      controller.abort();
      inFlight = false;
    }
    if (confirmed || feedback.status === 'invalid') { held = null; holdUntil = 0; }
    else { held = feedback; holdUntil = now() + Math.max(retryAfterSeconds ?? 0, UNCERTAIN_HOLD_SECONDS) * 1000; }
    return { confirmed, result: feedback, diagnostic: Object.freeze({
      scope: 'newsletter-client', category, requestSent: true, httpStatus, contentType, retryAfterSeconds, rayId, requestId,
    }) };
  }

  return { submit };
}
