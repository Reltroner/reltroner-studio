'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { submitContact } from '@/lib/contact/web3forms.client';
import { validateInquiry } from '@/lib/contact/schema';
import { INTENT_LABELS, type ContactIntent, type ContactResult } from '@/lib/contact/types';

export default function ContactInquiryForm({ intent }: { intent: ContactIntent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAcknowledged, setPrivacy] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);
  const [invalidField, setInvalidField] = useState('');
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lastPreview = useRef('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const checked = validateInquiry({ name, email, message, intent, privacyAcknowledged, website: new FormData(event.currentTarget).get('website') });
    if (!checked.input) {
      setInvalidField(checked.field || '');
      setResult({ status: 'invalid', message: checked.error! });
      formRef.current?.querySelector<HTMLElement>(`[name="${checked.field}"]`)?.focus();
      return;
    }
    const signature = JSON.stringify(checked.input);
    if (lastPreview.current === signature) { setResult(process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? { status: 'accepted', message: 'Web3Forms already accepted this inquiry in this session. No additional request was sent.' } : { status: 'prototype', message: 'This inquiry was already previewed. No message has been sent. Edit it to preview again.' }); return; }
    busy.current = true;
    setLoading(true); setInvalidField('');
    setResult({ status: 'loading', message: process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Submitting your inquiry…' : 'Validating your local inquiry…' });
    try {
      const response = await submitContact(checked.input, { signal: AbortSignal.timeout(10000) });
      setResult(await response.json() as ContactResult);
      if (response.ok) lastPreview.current = signature;
    } catch { setResult({ status: 'network-error', message: 'Inquiry acceptance could not be confirmed. Check before retrying or use the email link.' }); }
    finally { busy.current = false; setLoading(false); }
  }

  return <form ref={formRef} onSubmit={submit} noValidate aria-busy={loading} aria-describedby="contact-mode contact-feedback" className="space-y-5">
    <h2 className="text-xl font-semibold">Your {INTENT_LABELS[intent].toLowerCase()} inquiry</h2>
    <div><label htmlFor="contact-name" className="mb-2 block font-medium">Name</label><input id="contact-name" name="name" required autoComplete="name" maxLength={100} value={name} onChange={event => setName(event.target.value)} aria-invalid={invalidField === 'name'} aria-describedby="contact-feedback" className="rs-form-input" /></div>
    <div><label htmlFor="contact-email" className="mb-2 block font-medium">Reply email</label><input id="contact-email" name="email" required type="email" autoComplete="email" maxLength={254} value={email} onChange={event => setEmail(event.target.value)} aria-invalid={invalidField === 'email'} aria-describedby="contact-feedback" className="rs-form-input" /></div>
    <div><label htmlFor="contact-message" className="mb-2 block font-medium">What would you like to explore?</label><textarea id="contact-message" name="message" required rows={6} minLength={20} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} aria-invalid={invalidField === 'message'} aria-describedby="contact-feedback contact-message-help" className="rs-form-input" /><p id="contact-message-help" className="mt-2 text-xs text-slate-400">20–4,000 characters. Please omit passwords, private customer data, and confidential documents.</p></div>
    <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate-300"><input name="privacyAcknowledged" type="checkbox" required checked={privacyAcknowledged} onChange={event => setPrivacy(event.target.checked)} aria-invalid={invalidField === 'privacyAcknowledged'} className="mt-1 h-5 w-5 shrink-0" /><span>I understand my reply details would be used only to handle this inquiry. This does not opt me into a newsletter. <Link href="/privacy" className="text-blue-300 underline">Privacy details</Link>.</span></label>
    <button type="submit" disabled={loading} className="rs-action-primary">{loading ? 'Checking…' : (process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Send inquiry' : 'Preview inquiry locally')}</button>
    <p id="contact-feedback" role={result && ['invalid', 'rejected', 'network-error', 'quota-error'].includes(result.status) ? 'alert' : 'status'} aria-live="polite" className="min-h-12 text-sm leading-7 text-sky-200">{result?.message}</p>
  </form>;
}
