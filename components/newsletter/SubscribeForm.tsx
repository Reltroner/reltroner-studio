'use client';

import { useRef, useState } from 'react';
import { validateSubscription } from '@/lib/newsletter/schema';
import type { SubscriptionResult } from '@/lib/newsletter/types';
import SubscriptionFeedback from './SubscriptionFeedback';

export default function SubscribeForm({ enabled = false }: { enabled?: boolean }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);
  const busy = useRef(false);
  const [loading, setLoading] = useState(false);
  const lastPreview = useRef('');
  const emailRef = useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const checked = validateSubscription({ email, consent });
    if (!checked.input) {
      setResult({ status: 'invalid', message: checked.error!, delivered: false, verified: false });
      if (!email.trim()) emailRef.current?.focus();
      return;
    }
    if (lastPreview.current === checked.input.email) {
      setResult({ status: 'duplicate', message: enabled ? 'This address was already confirmed in this session. No additional request was sent.' : 'You already previewed this address in this session. No subscription exists in this prototype.', delivered: false, verified: false });
      return;
    }
    busy.current = true;
    setLoading(true);
    setResult({ status: 'loading', message: enabled ? 'Saving your subscription…' : 'Validating the local form…', delivered: false, verified: false });
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checked.input), signal: AbortSignal.timeout(10000) });
      const feedback = await response.json() as SubscriptionResult;
      if (!feedback || typeof feedback.message !== 'string' || !['invalid', 'prototype', 'accepted', 'subscribed', 'duplicate', 'rejected', 'network-error', 'quota-error'].includes(feedback.status)
        || (!response.ok && ['accepted', 'subscribed', 'duplicate', 'prototype'].includes(feedback.status))) throw new Error('RESPONSE');
      setResult(feedback);
      if (response.ok && ['prototype', 'accepted', 'subscribed', 'duplicate'].includes(feedback.status)) lastPreview.current = checked.input.email;
    } catch {
      setResult({ status: 'network-error', message: 'Subscription status could not be confirmed. Please check your preferences before retrying.', delivered: false, verified: false });
    } finally { busy.current = false; setLoading(false); }
  }

  return <form onSubmit={submit} noValidate className="space-y-4" aria-describedby="newsletter-mode newsletter-feedback" aria-busy={loading}>
    <div><label htmlFor="newsletter-email" className="mb-2 block font-medium">Email address</label>
      <input ref={emailRef} id="newsletter-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} className="rs-form-input" aria-invalid={result?.status === 'invalid' && !validateSubscription({ email, consent: true }).input} /></div>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-300"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 h-5 w-5 shrink-0" />I choose to receive Studio updates about creative practice, public knowledge, and engineering. Contact inquiries do not subscribe me.</label>
    <button disabled={loading} className="rs-action-primary w-full sm:w-auto" type="submit">{loading ? 'Checking…' : enabled ? 'Subscribe to Studio updates' : 'Preview newsletter opt-in'}</button>
    <SubscriptionFeedback result={result} />
  </form>;
}
