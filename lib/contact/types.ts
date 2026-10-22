/** Canonical Contact topics: each selected UI title is sent verbatim as the Web3Forms `intent`. */
export const CONTACT_INTENT_BY_TOPIC = {
  worldbuilding: 'Worldbuilding & ideas',
  story: 'Asthortera & stories',
  learning: 'Learning & LMS',
  professional: 'Collaboration & engineering',
} as const;
export type ContactIntent = typeof CONTACT_INTENT_BY_TOPIC[keyof typeof CONTACT_INTENT_BY_TOPIC];
export const CONTACT_INTENTS: readonly ContactIntent[] = Object.freeze(Object.values(CONTACT_INTENT_BY_TOPIC));
export type ContactStatus = 'idle' | 'loading' | 'invalid' | 'prototype' | 'accepted' | 'rejected' | 'network-error' | 'quota-error';
export interface ContactInput { intent: ContactIntent; name: string; email: string; message: string; privacyAcknowledged: boolean; website: string }
export interface ContactResult { status: ContactStatus; message: string; reference?: string }
export interface ContactServiceAdapter { provider: 'web3forms'; submit(input: ContactInput): Promise<ContactResult> }
export const CONTACT_EMAIL = 'studio@reltroner.com';
