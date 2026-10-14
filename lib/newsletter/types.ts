export type SubscriptionStatus = 'idle' | 'loading' | 'invalid' | 'prototype' | 'accepted' | 'subscribed' | 'duplicate' | 'rejected' | 'network-error' | 'quota-error';

export interface SubscriptionInput { email: string; consent: boolean; source: 'website-newsletter' }
export interface SubscriptionResult { status: SubscriptionStatus; message: string; delivered: boolean; verified: boolean }

/** Implement in a protected server boundary after account, suppression and quota verification. */
export interface NewsletterServiceAdapter {
  provider: 'resend';
  subscribe(input: SubscriptionInput, idempotencyKey: string): Promise<SubscriptionResult>;
  unsubscribe(token: string): Promise<SubscriptionResult>;
}
