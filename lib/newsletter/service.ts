import 'server-only';
import type { NewsletterServiceAdapter } from './types';
import { createResendNewsletterProvider, type ResendProviderOptions } from './resend-provider';

// Disabled mode performs no external requests and stores no subscriber records.
const prototypeService: NewsletterServiceAdapter = {
  provider: 'resend',
  async subscribe() {
    return { status: 'prototype', message: 'Local prototype: your input is valid. No subscription was created and no email was sent.', delivered: false, verified: false };
  },
  async unsubscribe() {
    return { status: 'prototype', message: 'Unsubscribe is not connected in this prototype. No subscription records are stored here.', delivered: false, verified: false };
  },
};

export interface NewsletterActivation {
  privacyDisclosuresApproved: boolean;
  unsubscribeVerified: boolean;
  costAndUsageApproved: boolean;
  authorizedSmokeTestPassed: boolean;
}

/** Trusted server composition only; credentials/flags alone never certify these gates. */
export function createNewsletterService(options?: {
  provider?: ResendProviderOptions;
  activation?: NewsletterActivation;
}): NewsletterServiceAdapter {
  const gate = options?.activation;
  if (!gate || gate.privacyDisclosuresApproved !== true || gate.unsubscribeVerified !== true
    || gate.costAndUsageApproved !== true || gate.authorizedSmokeTestPassed !== true) return prototypeService;
  return createResendNewsletterProvider(options?.provider);
}

/** RESEND_NEWSLETTER_ENABLED is an operator activation gate, not proof that WAF
 * exists. Before setting it: verify the Free plan/no overages, segment, Contacts
 * permissions, deployed privacy copy and managed Broadcast unsubscribe workflow.
 * Publish a POST /api/newsletter WAF rate rule across instances. No local counter
 * or database is used. See docs/newsletter-and-contact-release.md. */
export function createRuntimeNewsletterService(env: Record<string, string | undefined>, transport?: ResendProviderOptions['transport']): NewsletterServiceAdapter {
  if (env.RESEND_NEWSLETTER_ENABLED !== 'true') return prototypeService;
  return createResendNewsletterProvider({
    apiKey: env.RESEND_API_KEY || '', segmentId: env.RESEND_SEGMENT_ID || '',
    edgeProtection: 'vercel-waf', ...(transport ? { transport } : {}),
  });
}

export const newsletterService = createRuntimeNewsletterService(process.env);
