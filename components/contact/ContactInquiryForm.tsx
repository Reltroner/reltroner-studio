'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { submitContact } from '@/lib/contact/web3forms.client';
import { validateInquiry } from '@/lib/contact/schema';
import { CONTACT_EMAIL, type ContactResult } from '@/lib/contact/types';
import ContactIntentTabs, { type ContactTopic } from './ContactIntentTabs';

export default function ContactInquiryForm({ topic, onTopicChange }: { topic: ContactTopic; onTopicChange: (topic: ContactTopic) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contextUrl, setContextUrl] = useState('');
  const [privacyAcknowledged, setPrivacy] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);
  const [invalidField, setInvalidField] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lastPreview = useRef('');
  const providerEnabled = process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true';

  function invalid(field: string, error: string) {
    setInvalidField(field); setResult({ status: 'invalid', message: error });
    const input = formRef.current?.querySelector<HTMLElement>('[name="' + field + '"]');
    const details = input?.closest('details');
    if (details) details.open = true;
    input?.focus();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    let relatedLink = '';
    if (contextUrl.trim()) {
      try {
        const url = new URL(contextUrl.trim());
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || contextUrl.trim().length > 600) throw new Error('URL');
        relatedLink = '\n\nRelated link: ' + url.href;
      } catch { invalid('context_url', 'Enter a valid public HTTP or HTTPS URL without credentials.'); return; }
    }
    // The optional context remains part of the bounded message; provider fields stay unchanged.
    const checked = validateInquiry({ name, email, message: message.trim() + relatedLink, intent: topic.intent, privacyAcknowledged, website: new FormData(event.currentTarget).get('website') });
    if (!checked.input) { invalid(checked.field || '', checked.error!); return; }
    if (message.trim().length < 20) { invalid('message', 'Describe your inquiry in at least 20 characters before adding a related link.'); return; }
    const signature = JSON.stringify(checked.input);
    if (lastPreview.current === signature) {
      setResult(providerEnabled ? { status: 'accepted', message: 'Web3Forms already accepted this inquiry in this session. No additional request was sent.' } : { status: 'prototype', message: 'This inquiry was already previewed. No message has been sent. Edit it to preview again.' });
      return;
    }
    busy.current = true; setLoading(true); setInvalidField('');
    setResult({ status: 'loading', message: providerEnabled ? 'Submitting your inquiry…' : 'Validating your local inquiry…' });
    try {
      const response = await submitContact(checked.input, { signal: AbortSignal.timeout(10000) });
      const feedback = await response.json() as ContactResult;
      setResult(feedback);
      if (response.ok) {
        lastPreview.current = signature;
        if (feedback.status === 'prototype') {
          setCopyStatus('');
          setDraft('Topic: ' + topic.title + '\nName: ' + checked.input.name + '\nReply email: ' + checked.input.email + '\n\n' + checked.input.message);
        }
      }
    } catch { setResult({ status: 'network-error', message: 'Inquiry acceptance could not be confirmed. Check before retrying or use the email link.' }); }
    finally { busy.current = false; setLoading(false); }
  }

  return <>
    <form ref={formRef} onSubmit={submit} noValidate aria-busy={loading} aria-describedby="contact-mode contact-feedback" className="space-y-5">
      <ContactIntentTabs topic={topic} onChange={onTopicChange} />
      <p id="contact-topic-hint" className="studio-hint" role="status">{topic.hint}</p>
      <div className="studio-grid-two">
        <div><label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Your name</label><input id="contact-name" name="name" required autoComplete="name" maxLength={100} placeholder="How should I address you?" value={name} onChange={event => setName(event.target.value)} aria-invalid={invalidField === 'name'} aria-describedby="contact-feedback" className="rs-form-input" /></div>
        <div><label htmlFor="contact-email" className="mb-2 block text-sm font-medium">Reply email</label><input id="contact-email" name="email" required type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} aria-invalid={invalidField === 'email'} aria-describedby="contact-feedback" className="rs-form-input" /></div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">{topic.prompt}</label>
        <textarea id="contact-message" name="message" required rows={6} minLength={20} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} aria-invalid={invalidField === 'message'} aria-describedby="contact-topic-hint contact-feedback contact-message-help" className="rs-form-input" />
        <p id="contact-message-help" className="mt-2 text-right text-xs text-slate-400">{message.length} / 4,000 characters · Minimum 20 · Including a related link</p>
      </div>
      <details className="rounded-xl border border-slate-700 p-3">
        <summary className="min-h-8 cursor-pointer text-sm">Have a related link? Add it here (optional)</summary>
        <label htmlFor="contact-url" className="mb-2 mt-4 block text-sm">Project, story, or reference URL</label>
        <input id="contact-url" name="context_url" type="url" inputMode="url" maxLength={600} placeholder="https://..." value={contextUrl} onChange={event => setContextUrl(event.target.value)} aria-invalid={invalidField === 'context_url'} aria-describedby="contact-feedback contact-url-help" className="rs-form-input" />
        <p id="contact-url-help" className="studio-small mt-2">Only share a link that’s safe for someone else to open. No files or credentials.</p>
      </details>
      <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300"><input name="privacyAcknowledged" type="checkbox" required checked={privacyAcknowledged} onChange={event => setPrivacy(event.target.checked)} aria-invalid={invalidField === 'privacyAcknowledged'} aria-describedby="contact-feedback" className="mt-1 h-5 w-5 shrink-0 accent-blue-500" /><span>I understand my reply details would be used only to handle this inquiry. This does not opt me into a newsletter. <Link href="/privacy" className="text-blue-300 underline">Privacy details</Link>.</span></label>
      <p className="studio-small">Please leave out passwords, confidential records, financial details, and other sensitive information. Keep the first message high-level.</p>
      <div className="studio-actions"><button type="submit" disabled={loading} className="studio-button">{loading ? 'Checking…' : (process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Send inquiry' : 'Preview inquiry locally')}</button><a href={'mailto:' + CONTACT_EMAIL} className="studio-text-link">Or use your email app </a></div>
      <p id="contact-feedback" role={result && ['invalid', 'rejected', 'network-error', 'quota-error'].includes(result.status) ? 'alert' : 'status'} aria-live="polite" className="min-h-12 text-sm leading-7 text-sky-200">{result?.message}</p>
    </form>
    <Dialog open={draft !== null} onClose={() => setDraft(null)} className="relative z-[10000]">
      <div className="fixed inset-0 bg-slate-950/85" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-5">
        <Dialog.Panel className="studio-panel studio-draft-panel max-h-[90dvh] w-full max-w-2xl p-6 text-slate-100">
          <Dialog.Title className="text-2xl font-semibold">Your local message preview</Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-7 text-slate-300">Nothing was sent, uploaded, or stored. Review your draft below.</Dialog.Description>
          <pre className="my-5 whitespace-pre-wrap break-words rounded-xl border border-slate-700 p-4 font-sans text-sm">{draft}</pre>
          <div className="studio-actions"><button type="button" className="studio-button" onClick={async () => { try { await navigator.clipboard.writeText(draft || ''); setCopyStatus('Draft copied. Nothing was sent.'); } catch { setCopyStatus('Clipboard unavailable. You can select the draft and copy it manually.'); } }}>Copy draft</button><button type="button" className="studio-button secondary" onClick={() => setDraft(null)}>Close preview</button></div>
          <p role="status" className="mt-4 text-sm text-slate-300">{copyStatus}</p>
        </Dialog.Panel>
      </div>
    </Dialog>
  </>;
}
