'use client';

import { useState } from 'react';
import { MAX_ASSISTANT_INPUT, validateAssistantInput } from '@/lib/assistant/guardrails';
import type { AssistantIntent } from '@/lib/assistant/types';

export default function AssistantInput({ busy, providerAvailable, onSubmit }: { busy: boolean; providerAvailable: boolean; onSubmit: (query: string, intent: AssistantIntent) => Promise<void> }) {
  const [value, setValue] = useState('');
  const [intent, setIntent] = useState<AssistantIntent>('navigate');
  const [error, setError] = useState('');
  return (
    <form className="space-y-2 border-t border-slate-700 bg-slate-950 p-4" onSubmit={async (event) => {
      event.preventDefault();
      if (busy) return;
      const validation = validateAssistantInput(value);
      if (!validation.valid) { setError('error' in validation ? validation.error : 'Invalid input.'); return; }
      setError('');
      setValue('');
      await onSubmit(validation.query, intent);
    }}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="navigator-input" className="text-xs font-semibold text-slate-200">{intent === 'navigate' ? 'Search published knowledge' : 'Ask about published knowledge'}</label>
        <span className="text-[11px] text-slate-400" aria-hidden="true">{value.length}/{MAX_ASSISTANT_INPUT}</span>
      </div>
      <div className="flex items-start gap-2">
        <textarea id="navigator-input" data-autofocus value={value} onChange={(event) => { setValue(event.target.value); if (error) setError(''); }} rows={2} maxLength={MAX_ASSISTANT_INPUT} disabled={busy} aria-invalid={Boolean(error)} aria-describedby={error ? 'navigator-input-error navigator-input-help' : 'navigator-input-help'} placeholder="A topic, title, or tag…" className="min-w-0 flex-1 resize-none rounded-lg border border-slate-600 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-blue-300 disabled:opacity-60" />
        <button type="submit" disabled={busy || !value.trim()} className="min-h-12 rounded-lg bg-blue-700 px-3 py-3 text-xs font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Wait…' : intent === 'navigate' ? 'Search' : 'Ask'}</button>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <label className="flex items-center gap-1.5 text-slate-300"><input type="radio" name="navigator-intent" value="navigate" checked={intent === 'navigate'} onChange={() => setIntent('navigate')} disabled={busy} className="accent-blue-500" />Search</label>
        <label className="flex items-center gap-1.5 text-slate-300"><input type="radio" name="navigator-intent" value="explain" checked={intent === 'explain'} onChange={() => setIntent('explain')} disabled={busy || !providerAvailable} className="accent-blue-500" />AI explanation{!providerAvailable ? ' (not connected)' : ''}</label>
      </div>
      <p id="navigator-input-help" className="text-[11px] leading-relaxed text-slate-400">Search is local. {providerAvailable ? 'AI questions and bounded conversation are sent to the configured inference provider.' : 'No inference provider receives your input in this prototype.'}</p>
      {error ? <p id="navigator-input-error" role="alert" className="text-xs text-rose-200">{error}</p> : null}
    </form>
  );
}
