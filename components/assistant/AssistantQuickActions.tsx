'use client';

import Link from 'next/link';
import type { AssistantContext } from '@/lib/assistant/types';

const actionClass = 'rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-100 hover:border-blue-300 hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300';

export default function AssistantQuickActions({ context, onNavigate, onSearch }: { context: AssistantContext; onNavigate: () => void; onSearch: (query: string) => void }) {
  return (
    <nav aria-label="Navigator quick actions" className="flex flex-wrap gap-2">
      <Link href="/start/creators" onClick={onNavigate} className={actionClass}>Creator pathway</Link>
      <Link href="/start/readers" onClick={onNavigate} className={actionClass}>Reader pathway</Link>
      <Link href="/blog" onClick={onNavigate} className={actionClass}>Browse the journal</Link>
      <button type="button" className={actionClass} onClick={() => onSearch(context.documentId ? context.title : 'worldbuilding')}>{context.documentId ? 'Find related sources' : 'Find worldbuilding sources'}</button>
      {context.collection ? <Link href={`/${context.collection}`} onClick={onNavigate} className={actionClass}>Open {context.collection} archive</Link> : null}
    </nav>
  );
}
