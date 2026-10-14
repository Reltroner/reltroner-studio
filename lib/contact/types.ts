export const CONTACT_INTENTS = ['engineering', 'creative', 'learning'] as const;
export type ContactIntent = typeof CONTACT_INTENTS[number];
export type ContactStatus = 'idle' | 'loading' | 'invalid' | 'prototype' | 'accepted' | 'rejected' | 'network-error' | 'quota-error';
export interface ContactInput { intent: ContactIntent; name: string; email: string; message: string; privacyAcknowledged: boolean; website: string }
export interface ContactResult { status: ContactStatus; message: string; reference?: string }
export interface ContactServiceAdapter { provider: 'web3forms'; submit(input: ContactInput): Promise<ContactResult> }
export const CONTACT_EMAIL = 'studio@reltroner.com';
export const INTENT_LABELS: Record<ContactIntent, string> = { engineering: 'Collaboration / engineering', creative: 'Creative work / worldbuilding', learning: 'Learning / knowledge' };
