import { CONTACT_INTENTS, type ContactInput, type ContactIntent } from './types';

export function validateInquiry(value: unknown): { input?: ContactInput; error?: string; field?: 'name' | 'email' | 'message' | 'privacyAcknowledged' } {
  if (!value || typeof value !== 'object') return { error: 'Enter the inquiry details.' };
  const data = value as Record<string, unknown>;
  if (!CONTACT_INTENTS.includes(data.intent as ContactIntent)) return { error: 'Choose an inquiry intent.' };
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 100 || /[\r\n\u0000]/.test(name)) return { error: 'Enter a name between 1 and 100 characters.', field: 'name' };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid reply email.', field: 'email' };
  if (message.length < 20 || message.length > 4000 || message.includes('\u0000')) return { error: 'Describe your inquiry in 20–4,000 characters.', field: 'message' };
  if (data.privacyAcknowledged !== true) return { error: 'Acknowledge how your inquiry would be handled.', field: 'privacyAcknowledged' };
  if (data.website) return { error: 'This inquiry could not be validated.' };
  return { input: { intent: data.intent as ContactIntent, name, email, message, privacyAcknowledged: true, website: '' } };
}
