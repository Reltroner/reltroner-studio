'use client';

import { useEffect, useRef, useState } from 'react';
import { validateSubscription } from '@/lib/newsletter/schema';
import { createSubscriptionClient } from '@/lib/newsletter/subscription.client';
import type { SubscriptionResult } from '@/lib/newsletter/types';
import SubscriptionFeedback from './SubscriptionFeedback';

// Page-wide transport: concurrent or held submissions never send another POST.
const subscriptionClient = createSubscriptionClient();

export default function SubscribeForm({
  enabled = false,
  live = false,
  isPagesDev = false,
}: {
  enabled?: boolean;
  live?: boolean;
  isPagesDev?: boolean;
}) {
  // Client-detected state to guarantee truthful consistency even if used standalone
  const [runtimeState, setRuntimeState] = useState<'initial' | 'pages-dev' | 'live'>('initial');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);
  const busy = useRef(false);
  const [loading, setLoading] = useState(false);
  const lastPreview = useRef('');
  const emailRef = useRef<HTMLInputElement>(null);

const APPROVED_HOSTNAMES = new Set([
  'www.reltroner.com',
  'reltroner.com',
  'localhost',
  '127.0.0.1',
]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.includes('.pages.dev') || isPagesDev) {
      setRuntimeState('pages-dev');
    } else if ((live || enabled) && APPROVED_HOSTNAMES.has(hostname)) {
      setRuntimeState('live');
    } else {
      setRuntimeState('initial');
    }
  }, [live, enabled, isPagesDev]);

  const isLiveActive = runtimeState === 'live' || (live && runtimeState !== 'pages-dev');
  const isPagesPreview = runtimeState === 'pages-dev' || isPagesDev;

  const consentRef = useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const checked = validateSubscription({ email, consent });
    if (!checked.input) {
      setResult({ status: 'invalid', message: checked.error!, delivered: false, verified: false });
      const emailValid = Boolean(validateSubscription({ email, consent: true }).input);
      if (!emailValid) {
        emailRef.current?.focus();
      } else {
        consentRef.current?.focus();
      }
      return;
    }
    if (lastPreview.current === checked.input.email) {
      setResult({
        status: 'duplicate',
        message: isLiveActive
          ? 'This address was already confirmed in this session. No additional request was sent.'
          : 'Your email looks valid. This is a preview, so no subscription has been created.',
        delivered: false,
        verified: false,
      });
      return;
    }

    // On *.pages.dev, validate locally without POST to guarantee zero live Resend mutations
    if (isPagesPreview) {
      lastPreview.current = checked.input.email;
      setResult({
        status: 'prototype',
        message: 'Your email looks valid. This is a preview, so no subscription has been created.',
        delivered: false,
        verified: false,
      });
      return;
    }

    // In local prototype mode (not live), validate locally without network call
    if (!isLiveActive) {
      lastPreview.current = checked.input.email;
      setResult({
        status: 'prototype',
        message: 'Your email looks valid. This is a preview, so no subscription has been created.',
        delivered: false,
        verified: false,
      });
      return;
    }

    busy.current = true;
    setLoading(true);
    setResult({
      status: 'loading',
      message: 'Saving your subscription…',
      delivered: false,
      verified: false,
    });
    try {
      const attempt = await subscriptionClient.submit(checked.input);
      setResult(attempt.result);
      if (attempt.confirmed) lastPreview.current = checked.input.email;
      // Safe correlation only (category, HTTP status, CF-Ray, X-Request-Id); never the address or body.
      else if (attempt.diagnostic.requestSent) console.warn(JSON.stringify(attempt.diagnostic));
    } catch {
      setResult({
        status: 'network-error',
        message: 'Subscription status could not be confirmed. Please check your preferences before retrying.',
        delivered: false,
        verified: false,
      });
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  const emailInvalid = result?.status === 'invalid' && !validateSubscription({ email, consent: true }).input;
  const consentInvalid = result?.status === 'invalid' && !consent && Boolean(validateSubscription({ email, consent: true }).input);

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-4"
      aria-describedby="newsletter-mode newsletter-feedback"
      aria-busy={loading}
    >
      <div>
        <label htmlFor="newsletter-email" className="mb-2 block font-medium">
          Email address
        </label>
        <input
          ref={emailRef}
          id="newsletter-email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rs-form-input"
          aria-invalid={emailInvalid}
          aria-describedby="newsletter-feedback"
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          ref={consentRef}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0"
          aria-invalid={consentInvalid}
          aria-describedby="newsletter-feedback"
        />
        I choose to receive Studio updates about creative practice, public knowledge, and engineering. Contact
        inquiries do not subscribe me.
      </label>
      <button disabled={loading} className="rs-action-primary w-full sm:w-auto" type="submit">
        {loading ? 'Checking…' : isLiveActive ? 'Subscribe to Studio updates' : 'Preview newsletter opt-in'}
      </button>
      <SubscriptionFeedback result={result} />
    </form>
  );
}
