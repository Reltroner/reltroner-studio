'use client';
import { CONTACT_INTENTS, INTENT_LABELS, type ContactIntent } from '@/lib/contact/types';

export default function ContactIntentTabs({ intent, onChange }: { intent: ContactIntent; onChange: (intent: ContactIntent) => void }) {
  return <fieldset className="mb-8"><legend className="mb-3 text-lg font-semibold">What would you like to discuss?</legend>
    <div className="grid gap-3 md:grid-cols-3">{CONTACT_INTENTS.map(value => <label key={value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${intent === value ? 'border-blue-400 bg-blue-950/60 text-white' : 'border-slate-700 text-slate-300'}`}>
      <input type="radio" name="inquiry-intent" value={value} checked={intent === value} onChange={() => onChange(value)} className="mt-1 h-4 w-4 shrink-0" />{INTENT_LABELS[value]}
    </label>)}</div>
  </fieldset>;
}
