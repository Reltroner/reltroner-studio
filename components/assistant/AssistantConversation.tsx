'use client';

import { useEffect, useRef } from 'react';
import type { AssistantMessageRecord } from '@/lib/assistant/types';
import AssistantMessage from './AssistantMessage';

export default function AssistantConversation({ messages, busy, onNavigate }: { messages: AssistantMessageRecord[]; busy: boolean; onNavigate: () => void }) {
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }, [messages.length, busy]);

  return (
    <div role="log" aria-label="Navigator conversation" aria-live="polite" aria-relevant="additions text" className="space-y-3">
      {messages.map((message) => <AssistantMessage key={message.id} message={message} onNavigate={onNavigate} />)}
      {busy ? <p role="status" className="rounded-lg bg-slate-900 p-3 text-sm text-slate-300">Finding public sources…</p> : null}
      <div ref={endRef} />
    </div>
  );
}
