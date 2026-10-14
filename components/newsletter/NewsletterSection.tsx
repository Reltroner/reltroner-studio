import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

export default function NewsletterSection() {
  const enabled = process.env.RESEND_NEWSLETTER_ENABLED === 'true';
  return <section id="newsletter" aria-labelledby="newsletter-heading" className="section-shell scroll-mt-28 py-8 sm:py-12">
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Stay connected</p><h2 id="newsletter-heading" className="mt-3 text-3xl font-bold">Notes from the Studio</h2>
        <p className="mt-4 leading-7 text-slate-300">Occasional updates on creative practice, knowledge, and engineering. Publication frequency will be announced when the service opens.</p>
        <p id="newsletter-mode" className="mt-4 rounded-xl border border-amber-300/20 p-4 text-sm leading-6 text-amber-200">{enabled ? 'With your consent, your email is saved in Resend for Studio updates. Signing up does not send a welcome email. Every newsletter includes a protected unsubscribe link.' : 'Local prototype only. Resend is not connected. This form checks your input; it does not create a subscriber or deliver an email.'}</p>
        <p className="mt-4 text-sm text-slate-300"><Link href="/newsletter/unsubscribe" className="text-blue-300 underline">Unsubscribe and preferences</Link> · <Link href="/privacy" className="text-blue-300 underline">Privacy</Link></p>
      </div><SubscribeForm enabled={enabled} />
    </div>
  </section>;
}
