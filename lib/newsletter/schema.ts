import type { SubscriptionInput } from './types';

export function validateSubscription(value: unknown): { input?: SubscriptionInput; error?: string } {
  if (!value || typeof value !== 'object') return { error: 'Please enter your email address.' };
  const data = value as Record<string, unknown>;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email) return { error: 'Please enter your email address.' };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (data.consent !== true) return { error: "Please confirm that you'd like to receive Studio updates." };
  return { input: { email, consent: true, source: 'website-newsletter' } };
}
