'use client';

import Link from 'next/link';
import { CLASSIFICATION_LABELS } from '@/lib/content/taxonomy';
import type { AssistantMessageRecord } from '@/lib/assistant/types';

const STATUS_LABELS: Record<string, string> = {
  navigation: 'Public search results',
  answer: 'AI explanation · verify sources',
  insufficient_evidence: 'Insufficient public evidence',
  disabled: 'AI explanations unavailable',
  rejected: 'Request unavailable',
  rate_limited: 'Rate limit reached',
  quota_exhausted: 'Explanation quota reached',
  error: 'Unable to complete request',
};

export default function AssistantMessage({ message, onNavigate }: { message: AssistantMessageRecord; onNavigate: () => void }) {
  const isUser = message.role === 'user';
  return (
    <article className={`min-w-0 rounded-xl border p-3 ${isUser ? 'ml-5 border-blue-400/20 bg-blue-950/70' : 'mr-2 border-slate-700 bg-slate-900/80'}`}>
      <p className="mb-2 text-xs font-semibold text-slate-300">{isUser ? 'You' : 'Reltroner Navigator'}{message.status ? ` · ${STATUS_LABELS[message.status] || message.status}` : ''}</p>
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-100">{message.content}</p>
      {message.sources?.length ? (
        <ol className="mt-3 space-y-2" aria-label={message.status === 'answer' ? 'Explanation sources' : 'Published sources'}>
          {message.sources.map((source, index) => (
            <li key={source.id} className="rounded-lg border border-slate-700 p-3">
              <Link href={source.route} onClick={onNavigate} className="block break-words text-sm font-semibold text-blue-200 underline decoration-blue-400/40 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">{index + 1}. {source.title}</Link>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{source.classification ? CLASSIFICATION_LABELS[source.classification] : 'Classification pending editorial review'} · {source.collection}</p>
              {source.classification === 'CROSS_DOMAIN_ANALOGY' ? <p className="mt-1 text-xs text-amber-200">Analogy; not empirical evidence.</p> : null}
              {source.needsEditorialReview ? <p className="mt-1 text-xs text-amber-200">Available for reading; excluded from AI evidence pending editorial review.</p> : null}
              <p className="mt-2 break-words text-xs leading-relaxed text-slate-300">{source.excerpt}</p>
              <span className="sr-only">Content revision {source.revision}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </article>
  );
}
