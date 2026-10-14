'use client';

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Compass, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { useReadingPath, decodeHtmlEntities } from '@/components/archive/ReadingPathContext';
import type { AssistantContext, AssistantIntent, AssistantMessageRecord } from '@/lib/assistant/types';
import AssistantConversation from './AssistantConversation';
import AssistantInput from './AssistantInput';
import AssistantQuickActions from './AssistantQuickActions';
import AssistantStatus from './AssistantStatus';
import AssistantWelcome from './AssistantWelcome';
import AssistantNavigation from './AssistantNavigation';

interface AssistantPanelProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  context: AssistantContext;
  messages: AssistantMessageRecord[];
  busy: boolean;
  providerAvailable: boolean;
  onSubmit: (query: string, intent: AssistantIntent) => Promise<void>;
  onOpenSearch: () => void;
  onReadingNavigate: (id: string) => void;
}

export default function AssistantPanel({ open, onClose, onReset, context, messages, busy, providerAvailable, onSubmit, onOpenSearch, onReadingNavigate }: AssistantPanelProps) {
  const [tab, setTab] = useState('navigate');
  const { headings, activeId, setActiveId } = useReadingPath();
  const hasReadingPath = Boolean(context.documentId && headings.length);
  const activeTab = tab === 'reading' && !hasReadingPath ? 'navigate' : tab;
  const tabs = [{ id: 'navigate', label: 'Navigate' }, ...(hasReadingPath ? [{ id: 'reading', label: 'Reading Path' }] : []), { id: 'conversation', label: 'Conversation' }];
  return (
    <Dialog open={open} onClose={onClose} className="relative z-[250]">
      <div className="fixed inset-0 bg-slate-950/75" aria-hidden="true" />
      <div className="fixed inset-0 flex items-end justify-center p-3 md:justify-end md:p-6">
        <DialogPanel id="reltroner-navigator-panel" className="flex h-[min(42rem,calc(100dvh-1.5rem))] w-full min-w-0 max-w-md flex-col overflow-hidden rounded-2xl border border-blue-300/30 bg-slate-950 text-white shadow-2xl md:h-[min(42rem,calc(100dvh-3rem))]">
          <div className="flex items-center gap-3 border-b border-slate-700 p-4">
            <Compass aria-hidden="true" className="h-6 w-6 shrink-0 text-blue-300" />
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-semibold">Reltroner Navigator</DialogTitle>
              <Description className="mt-1 text-xs text-slate-300">Your guide to published knowledge</Description>
            </div>
            <button type="button" onClick={onReset} disabled={busy || !messages.length} aria-label="Reset Navigator conversation" className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-blue-300 disabled:opacity-40"><RotateCcw className="h-4 w-4" aria-hidden="true" /></button>
            <button type="button" onClick={onClose} aria-label="Close Reltroner Navigator" className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-blue-300"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div role="tablist" aria-label="Navigator views" className="flex shrink-0 border-b border-slate-700 px-2">
            {tabs.map((item, index) => <button key={item.id} id={`navigator-tab-${item.id}`} type="button" role="tab" aria-selected={activeTab === item.id} aria-controls={`navigator-view-${item.id}`} tabIndex={activeTab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
                setTab(tabs[next].id);
                document.getElementById(`navigator-tab-${tabs[next].id}`)?.focus();
              }}
              className={`min-h-[44px] min-w-0 flex-1 rounded-t-lg px-2 py-2 text-xs font-medium ${activeTab === item.id ? 'border-b-2 border-blue-300 bg-blue-950 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>{item.label}</button>)}
          </div>
          <div id="navigator-view-navigate" role="tabpanel" aria-labelledby="navigator-tab-navigate" hidden={activeTab !== 'navigate'} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
            <AssistantNavigation onNavigate={onClose} onOpenSearch={onOpenSearch} />
          </div>
          {hasReadingPath ? <div id="navigator-view-reading" role="tabpanel" aria-labelledby="navigator-tab-reading" hidden={activeTab !== 'reading'} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
            <nav aria-label="Article Reading Path">
              <p className="mb-3 text-sm font-medium text-slate-300">{context.title}</p>
              <ol className="space-y-1">
                {headings.map(heading => <li key={heading.id}>
                  <a href={`#${heading.id}`} data-heading-level={heading.level} aria-current={activeId === heading.id ? 'location' : undefined}
                    style={{ paddingLeft: `${12 + Math.max(0, heading.level - 1) * 12}px` }}
                    onClick={event => { event.preventDefault(); setActiveId(heading.id); onReadingNavigate(heading.id); }}
                    className={`flex min-h-[44px] items-center rounded-lg py-2 pr-3 text-sm leading-6 ${heading.level > 2 ? 'pl-6' : 'pl-3 font-medium'} ${activeId === heading.id ? 'bg-blue-950 text-blue-200' : 'text-slate-200 hover:bg-slate-800'}`}>
                    {decodeHtmlEntities(heading.text)}
                  </a>
                </li>)}
              </ol>
            </nav>
          </div> : null}
          <div id="navigator-view-conversation" role="tabpanel" aria-labelledby="navigator-tab-conversation" hidden={activeTab !== 'conversation'} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4">
            <AssistantStatus providerAvailable={providerAvailable} />
            <AssistantWelcome context={context} />
            <AssistantQuickActions context={context} onNavigate={onClose} onSearch={(query) => { if (!busy) void onSubmit(query, 'navigate'); }} />
            <AssistantConversation messages={messages} busy={busy} onNavigate={onClose} />
          </div>
          {activeTab === 'conversation' ? <AssistantInput busy={busy} providerAvailable={providerAvailable} onSubmit={onSubmit} /> : null}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
