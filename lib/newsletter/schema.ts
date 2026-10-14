import type { SubscriptionInput } from './types';

export function validateSubscription(value: unknown): { input?: SubscriptionInput; error?: string } {
  if (!value || typeof value !== 'object') return { error: 'Enter an email address and choose whether to opt in.' };
  const data = value as Record<string, unknown>;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (data.consent !== true) return { error: 'Newsletter opt-in is required. It is separate from a contact inquiry.' };
  return { input: { email, consent: true, source: 'website-newsletter' } };
}
