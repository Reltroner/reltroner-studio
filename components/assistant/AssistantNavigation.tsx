'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { ecosystemNavigation, knowledgeNavigation, topNavigation } from '@/lib/constants/navigation';

const linkClass = 'flex min-h-[44px] min-w-0 items-center rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-100 hover:border-blue-300 hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-blue-300';

export default function AssistantNavigation({ onNavigate, onOpenSearch }: { onNavigate: () => void; onOpenSearch: () => void }) {
  return (
    <nav aria-label="Compass global navigation" className="space-y-4">
      <button type="button" onClick={onOpenSearch} className={`${linkClass} w-full gap-3 border-blue-300/50 bg-blue-950/60`}>
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Search the archive</span><kbd className="ml-auto text-xs text-slate-400">Ctrl K</kbd>
      </button>
      <Link href="/" onClick={onNavigate} className={linkClass}>Reltroner Studio home</Link>
      <div className="grid grid-cols-2 gap-2">
        {topNavigation.filter(item => item.href !== '/').map(item => <Link key={item.href} href={item.href} onClick={onNavigate} className={linkClass}>{item.name}</Link>)}
        <Link href="/start/creators" onClick={onNavigate} className={linkClass}>For Creators</Link>
        <Link href="/start/readers" onClick={onNavigate} className={linkClass}>For Readers</Link>
        <Link href="/#roadmap" onClick={onNavigate} className={linkClass}>Roadmap</Link>
      </div>
      <details className="rounded-xl border border-slate-700 p-3">
        <summary className="flex min-h-[44px] cursor-pointer items-center font-medium">Knowledge Base collections</summary>
        <div className="mt-2 grid gap-2">
          {knowledgeNavigation.map(item => <Link key={item.href} href={item.href} onClick={onNavigate} className={linkClass}>{item.name}</Link>)}
        </div>
      </details>
      <details className="rounded-xl border border-slate-700 p-3">
        <summary className="flex min-h-[44px] cursor-pointer items-center font-medium">Apps and ecosystem</summary>
        <div className="mt-2 space-y-2">
          {ecosystemNavigation.map(app => app.status === 'planned' ? (
            <p key={app.name} className="rounded-lg border border-slate-800 p-3 text-sm text-slate-400">{app.name} · Planned</p>
          ) : app.type === 'external' ? (
            <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{app.name} ↗</a>
          ) : <Link key={app.name} href={app.href} onClick={onNavigate} className={linkClass}>{app.name}</Link>)}
        </div>
      </details>
    </nav>
  );
}
