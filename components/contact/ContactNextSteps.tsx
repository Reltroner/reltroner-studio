import { CONTACT_EMAIL } from '@/lib/contact/types';

export default function ContactNextSteps() {
  return <aside className="space-y-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-6"><h2 className="text-xl font-semibold">What happens next?</h2>
    <p className="text-sm leading-7 text-slate-300">Contact is asynchronous and email-first. When provider submission is available, acceptance confirms receipt by the service; it does not confirm delivery or a personal response.</p>
    <p className="text-sm leading-7 text-slate-300">The Studio reviews inquiries individually. No response deadline, call, or service engagement is promised.</p>
    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center break-all text-blue-300 underline">{CONTACT_EMAIL}</a>
    <p className="text-xs leading-6 text-slate-400">This email address is listed in the public engineering portfolio. Inbox monitoring must be confirmed before production acceptance.</p>
  </aside>;
}
