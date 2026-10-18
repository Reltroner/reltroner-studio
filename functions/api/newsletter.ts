import { validateSubscription } from '../../lib/newsletter/schema';
import { readFormRequest } from '../../lib/forms/request';
import { createResendNewsletterProvider, type ResendProviderOptions } from '../../lib/newsletter/resend-provider';
import type { NewsletterServiceAdapter, SubscriptionResult } from '../../lib/newsletter/types';

export interface CloudflareNewsletterEnv {
  RESEND_API_KEY?: string;
  RESEND_SEGMENT_ID?: string;
  RESEND_NEWSLETTER_ENABLED?: string;
  CLOUDFLARE_WAF_PROTECTION_VERIFIED?: string;
  RESEND_HARD_STOP_VERIFIED?: string;
  RESEND_UNSUBSCRIBE_VERIFIED?: string;
  NEWSLETTER_DIAGNOSTICS_ENABLED?: string;
  [key: string]: unknown;
}

export type ActivationCheck =
  | { ok: true }
  | { ok: false; reason: 'DISABLED' | 'INVALID_API_KEY' | 'INVALID_SEGMENT_ID' | 'PAGES_DEV_UNPROTECTED' | 'UNAUTHORIZED_HOSTNAME' | 'WAF_PROTECTION_UNVERIFIED' | 'RESEND_HARD_STOP_UNVERIFIED' | 'UNSUBSCRIBE_UNVERIFIED' };

export function verifyCloudflareNewsletterActivation(
  env: CloudflareNewsletterEnv,
  request?: Request
): ActivationCheck {
  if (env.RESEND_NEWSLETTER_ENABLED !== 'true') {
    return { ok: false, reason: 'DISABLED' };
  }
  const apiKey = env.RESEND_API_KEY || '';
  if (!/^re_[a-zA-Z0-9_]{8,100}$/.test(apiKey) || /placeholder|your_|changeme/i.test(apiKey)) {
    return { ok: false, reason: 'INVALID_API_KEY' };
  }
  const segmentId = env.RESEND_SEGMENT_ID || '';
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(segmentId)) {
    return { ok: false, reason: 'INVALID_SEGMENT_ID' };
  }
  // Host verification: Check request URL hostname and Host header consistently.
  // Permit live Resend mutations only on explicitly approved, WAF-protected hostnames.
  if (request) {
    let urlHostname = '';
    try {
      urlHostname = new URL(request.url).hostname.toLowerCase();
    } catch {}
    const rawHostHeader = request.headers.get('host');
    const hostHeader = (rawHostHeader ? rawHostHeader.split(':')[0] : urlHostname).trim().toLowerCase();

    // *.pages.dev is explicitly unprotected by custom-domain Cloudflare WAF
    if (
      urlHostname.endsWith('.pages.dev') ||
      urlHostname.includes('.pages.dev') ||
      hostHeader.endsWith('.pages.dev') ||
      hostHeader.includes('.pages.dev')
    ) {
      return { ok: false, reason: 'PAGES_DEV_UNPROTECTED' };
    }

    const isApprovedHost = (h: string) =>
      h === 'www.reltroner.com' ||
      h === 'reltroner.com' ||
      h === 'localhost' ||
      h === '127.0.0.1';

    if (
      !urlHostname ||
      !hostHeader ||
      !isApprovedHost(urlHostname) ||
      !isApprovedHost(hostHeader) ||
      urlHostname !== hostHeader
    ) {
      return { ok: false, reason: 'UNAUTHORIZED_HOSTNAME' };
    }
  }
  // Cloudflare Free WAF rule `reltroner-newsletter-protection` (3 req/10s/IP) is currently Disabled
  if (env.CLOUDFLARE_WAF_PROTECTION_VERIFIED !== 'true') {
    return { ok: false, reason: 'WAF_PROTECTION_UNVERIFIED' };
  }
  // Resend Free plan hard stop / no paid overages must be verified in account billing
  if (env.RESEND_HARD_STOP_VERIFIED !== 'true') {
    return { ok: false, reason: 'RESEND_HARD_STOP_UNVERIFIED' };
  }
  // Resend Broadcast template managed unsubscribe and privacy disclosures must be verified
  if (env.RESEND_UNSUBSCRIBE_VERIFIED !== 'true') {
    return { ok: false, reason: 'UNSUBSCRIBE_UNVERIFIED' };
  }
  return { ok: true };
}

export function createCloudflareNewsletterService(
  env: CloudflareNewsletterEnv,
  request?: Request,
  options?: Partial<ResendProviderOptions> & { skipGateVerification?: boolean }
): NewsletterServiceAdapter {
  if (env.RESEND_NEWSLETTER_ENABLED !== 'true') {
    return {
      provider: 'resend',
      async subscribe() {
        return {
          status: 'prototype',
          message: 'Local prototype: your input is valid. No subscription was created and no email was sent.',
          delivered: false,
          verified: false,
        };
      },
      async unsubscribe() {
        return {
          status: 'prototype',
          message: 'Unsubscribe is not connected in this prototype. No subscription records are stored here.',
          delivered: false,
          verified: false,
        };
      },
    };
  }

  const gate = verifyCloudflareNewsletterActivation(env, request);
  if (!gate.ok && !options?.skipGateVerification) {
    return {
      provider: 'resend',
      async subscribe() {
        return {
          status: 'rejected',
          message: 'Newsletter provider configuration or approved abuse controls are unavailable. No subscription has been confirmed.',
          delivered: false,
          verified: false,
        };
      },
      async unsubscribe() {
        return {
          status: 'rejected',
          message: 'Newsletter provider configuration or approved abuse controls are unavailable. No subscription has been confirmed.',
          delivered: false,
          verified: false,
        };
      },
    };
  }

  return createResendNewsletterProvider({
    apiKey: env.RESEND_API_KEY || '',
    segmentId: env.RESEND_SEGMENT_ID || '',
    edgeProtection: 'cloudflare-waf',
    transport: options?.transport,
    timeoutMilliseconds: options?.timeoutMilliseconds,
    diagnostic: env.NEWSLETTER_DIAGNOSTICS_ENABLED === 'true'
      ? options?.diagnostic ?? ((event) => { console.log(JSON.stringify(event)); })
      : undefined,
  });
}

export async function handleNewsletterRequest(
  request: Request,
  service: NewsletterServiceAdapter
): Promise<Response> {
  try {
    // Browser-only same-origin form: missing Origin is not an automation bypass.
    if (!request.headers.get('origin')) throw new Error('ORIGIN');
    const result = validateSubscription(await readFormRequest(request));
    if (!result.input) {
      return Response.json({ status: 'invalid', message: result.error }, { status: 422 });
    }

    const requestId = crypto.randomUUID();
    const feedback: SubscriptionResult = await service.subscribe(result.input, requestId);

    const status = feedback.status === 'quota-error' ? 429
      : feedback.status === 'network-error' ? 503
      : feedback.status === 'rejected' ? 502
      : feedback.status === 'invalid' ? 422
      : 200;

    return Response.json(feedback, {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'X-Request-Id': requestId,
      },
    });
  } catch (error) {
    return Response.json(
      { status: 'rejected', message: 'The request could not be validated. Try again from this website.' },
      { status: error instanceof Error && error.message === 'ORIGIN' ? 403 : 400 }
    );
  }
}

export async function onRequestPost(context: { request: Request; env: CloudflareNewsletterEnv }): Promise<Response> {
  const service = createCloudflareNewsletterService(context.env || {}, context.request);
  return handleNewsletterRequest(context.request, service);
}

export async function onRequest(context: { request: Request; env: CloudflareNewsletterEnv }): Promise<Response> {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return new Response(JSON.stringify({ status: 'rejected', message: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
}

let activeNewsletterService: NewsletterServiceAdapter | null = null;

export function setNewsletterService(service: NewsletterServiceAdapter | null) {
  activeNewsletterService = service;
}

// Node test runner & Next compatibility export
export async function POST(request: Request, service?: NewsletterServiceAdapter): Promise<Response> {
  const effectiveService = service || activeNewsletterService || createCloudflareNewsletterService(typeof process !== 'undefined' && process.env ? (process.env as CloudflareNewsletterEnv) : {}, request);
  return handleNewsletterRequest(request, effectiveService);
}
