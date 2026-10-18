'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { ecosystemNavigation, knowledgeNavigation, topNavigation } from '@/lib/constants/navigation';

const linkClass = 'flex min-h-[44px] min-w-0 items-center rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-100 hover:border-blue-300 hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-blue-300';

export default function AssistantNavigation({ onNavigate, onOpenSearch }: { onNavigate: () => void; onOpenSearch: () => void }) {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  return (
    <nav aria-label="Compass global navigation" className="space-y-4">
      <button type="button" onClick={onOpenSearch} className={`${linkClass} w-full gap-3 border-blue-300/50 bg-blue-950/60`}>
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Search the archive</span><kbd className="ml-auto text-xs text-slate-400">Ctrl K</kbd>
      </button>
      <Link href="/" onClick={onNavigate} className={linkClass}>Reltroner Studio home</Link>
      <div className="grid grid-cols-2 gap-2">
        {topNavigation.filter(item => item.href !== '/').map(item => <Link key={item.href} href={item.href} onClick={onNavigate} className={linkClass}>{item.name}</Link>)}
        <Link href="/contact" onClick={onNavigate} className={linkClass}>Contact</Link>
      </div>
      <details
        className="group rounded-xl border border-slate-700 p-3"
        open={collectionsOpen}
        onToggle={(event) => setCollectionsOpen(event.currentTarget.open)}
      >
        <summary
          id="navigator-kb-collections-trigger"
          aria-expanded={collectionsOpen}
          aria-controls="navigator-kb-collections-panel"
          className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-1 font-medium focus-visible:outline-2 focus-visible:outline-blue-300 [&::-webkit-details-marker]:hidden"
        >
          <span>Knowledge Base collections</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-slate-300 transition-transform duration-200 ${collectionsOpen ? 'rotate-180' : ''}`}
          />
        </summary>
        <div id="navigator-kb-collections-panel" role="region" aria-labelledby="navigator-kb-collections-trigger" className="mt-2 grid gap-2">
          {knowledgeNavigation.map(item => <Link key={item.href} href={item.href} onClick={onNavigate} className={linkClass}>{item.name}</Link>)}
        </div>
      </details>
      <details
        className="group rounded-xl border border-slate-700 p-3"
        open={appsOpen}
        onToggle={(event) => setAppsOpen(event.currentTarget.open)}
      >
        <summary
          id="navigator-apps-ecosystem-trigger"
          aria-expanded={appsOpen}
          aria-controls="navigator-apps-ecosystem-panel"
          className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-1 font-medium focus-visible:outline-2 focus-visible:outline-blue-300 [&::-webkit-details-marker]:hidden"
        >
          <span>Apps and ecosystem</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-slate-300 transition-transform duration-200 ${appsOpen ? 'rotate-180' : ''}`}
          />
        </summary>
        <div id="navigator-apps-ecosystem-panel" role="region" aria-labelledby="navigator-apps-ecosystem-trigger" className="mt-2 space-y-2">
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
