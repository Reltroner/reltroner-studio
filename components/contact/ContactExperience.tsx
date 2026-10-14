'use client';
import { useState } from 'react';
import type { ContactIntent } from '@/lib/contact/types';
import ContactIntentTabs from './ContactIntentTabs';
import ContactInquiryForm from './ContactInquiryForm';
import ContactNextSteps from './ContactNextSteps';
import ContactFAQ from './ContactFAQ';

export default function ContactExperience() {
  const [intent, setIntent] = useState<ContactIntent>('engineering');
  return <div className="section-shell px-4 py-10 sm:px-8 sm:py-14"><header className="mb-9 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Reltroner Studio</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Start a conversation.</h1><p className="mt-5 text-lg leading-8 text-slate-300">Choose a direction and share a short overview. Engineering, creative work, and learning each have a place here.</p>
    <p id="contact-mode" className="mt-5 rounded-xl border border-amber-300/20 p-4 text-sm leading-7 text-amber-200">{process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Submitting sends your inquiry directly to Web3Forms for forwarding to the Studio. Provider acceptance does not confirm inbox delivery. Contact inquiries never subscribe you to the newsletter.' : 'Local prototype. Real provider submission is disabled. You can validate an inquiry here or choose the email link to reach out yourself.'}</p></header>
    <ContactIntentTabs intent={intent} onChange={setIntent} />
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]"><ContactInquiryForm intent={intent} /><ContactNextSteps /></div>
    <ContactFAQ />
  </div>;
}
