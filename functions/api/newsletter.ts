import { validateSubscription } from '../../lib/newsletter/schema';
import { readFormRequest } from '../../lib/forms/request';
import type { NewsletterServiceAdapter, SubscriptionResult } from '../../lib/newsletter/types';

interface Env {
  RESEND_API_KEY?: string;
  RESEND_SEGMENT_ID?: string;
  RESEND_NEWSLETTER_ENABLED?: string;
  [key: string]: unknown;
}

export function createCloudflareNewsletterService(env: Env): NewsletterServiceAdapter {
  // Fail-closed requirement:
  // Existing code trusts edgeProtection: 'vercel-waf'.
  // Under Cloudflare Pages Free, Cloudflare WAF rate limiting rules, Free-plan hard-stop behavior,
  // and unsubscribe acceptance are not verified.
  // We do NOT copy 'vercel-waf' or pretend a Cloudflare WAF rule exists.
  // Therefore, live Contacts mutations must not be performed on Cloudflare until verified.
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

  // Operator activation gate BLOCKED: until Cloudflare abuse controls are verified, fail closed.
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

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const service = createCloudflareNewsletterService(context.env || {});
  return handleNewsletterRequest(context.request, service);
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
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
  const effectiveService = service || activeNewsletterService || createCloudflareNewsletterService(typeof process !== 'undefined' && process.env ? (process.env as Env) : {});
  return handleNewsletterRequest(request, effectiveService);
}
