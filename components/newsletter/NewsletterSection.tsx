'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const APPROVED_HOSTNAMES = new Set([
  'www.reltroner.com',
  'reltroner.com',
  'localhost',
  '127.0.0.1',
]);

export default function NewsletterSection({
  activationVerified = false,
}: {
  activationVerified?: boolean;
}) {
  // Neutral, truthful initial static-render state (prototype) avoids misleading pre-hydration claims on *.pages.dev
  const [activeMode, setActiveMode] = useState<'prototype' | 'pages-dev' | 'live'>('prototype');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.includes('.pages.dev')) {
      setActiveMode('pages-dev');
    } else if (activationVerified && APPROVED_HOSTNAMES.has(hostname)) {
      setActiveMode('live');
    } else {
      setActiveMode('prototype');
    }
  }, [activationVerified]);

  const isLive = activeMode === 'live';

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="studio-panel studio-conversation scroll-mt-28">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Stay connected</p>
          <h2 id="newsletter-heading" className="mt-3 text-3xl font-bold">Keep a little curiosity in your inbox.</h2>
          <p className="mt-4 leading-7 text-slate-300">Occasional updates on creative practice, knowledge, and engineering. Publication frequency will be announced when the service opens.</p>
          <p id="newsletter-mode" className="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-6 text-amber-200">
            {activeMode === 'live'
              ? 'With your consent, your email is saved in Resend for Studio updates. Signing up does not send a welcome email. Every newsletter includes a protected unsubscribe link.'
              : activeMode === 'pages-dev'
              ? 'Preview deployment (*.pages.dev). Resend live subscriptions require custom-domain WAF protection on www.reltroner.com. This form validates input locally without creating a subscriber.'
              : 'Local prototype only. Resend is not connected. This form checks your input; it does not create a subscriber or deliver an email.'}
          </p>
          <p className="mt-4 text-sm text-slate-300">
            <Link href="/newsletter/unsubscribe" className="text-blue-300 underline">Unsubscribe and preferences</Link> · <Link href="/privacy" className="text-blue-300 underline">Privacy</Link>
          </p>
        </div>
        <SubscribeForm live={isLive} isPagesDev={activeMode === 'pages-dev'} />
      </div>
    </section>
  );
}
