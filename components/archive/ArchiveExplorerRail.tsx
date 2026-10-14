"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { COLLECTIONS, COLLECTION_ORDER } from "@/lib/constants/collections";
import { discoverRelatedContent, searchPublicContent } from "@/lib/content/search";
import { CLASSIFICATION_LABELS, type PublicContentEntry } from "@/lib/content/taxonomy";
export default function ArchiveExplorerRail({ entries = [], currentId, initialCollection = "", onNavigate }: {
  entries?: PublicContentEntry[]; currentId?: string; initialCollection?: string; onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState(initialCollection);
  const deferredQuery = useDeferredValue(query);
  const id = useId();
  const matches = useMemo(() => searchPublicContent(entries, deferredQuery, { collection: collection || undefined, limit: 8 }), [entries, deferredQuery, collection]);
  const current = entries.find((entry) => entry.id === currentId);
  const related = useMemo(() => current ? discoverRelatedContent(entries, current, 3) : [], [entries, current]);
  const EntryLink = ({ entry }: { entry: PublicContentEntry }) => (
    <Link href={entry.canonicalRoute} onClick={onNavigate} aria-current={entry.id === currentId ? "page" : undefined}
      className="block rounded-lg px-2 py-3 text-sm text-slate-200 hover:bg-blue-400/10 focus-visible:outline-2 focus-visible:outline-blue-300">
      <span className="block font-medium">{entry.title}</span>
      <span className="mt-1 block text-xs text-slate-400">{entry.classification ? CLASSIFICATION_LABELS[entry.classification] : "Scope awaiting editorial review"}</span>
    </Link>
  );

  return (
    <nav aria-label="Archive explorer" className="archive-rail p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Archive explorer</h2>
      <p className="mt-2 text-xs leading-5 text-slate-400">The same public index and ranking as Ctrl+K. Choose all collections to broaden discovery.</p>
      <label htmlFor={`${id}-query`} className="mt-4 block text-sm text-slate-200">Search public knowledge</label>
      <input id={`${id}-query`} value={query} onChange={(event) => setQuery(event.target.value)} maxLength={240} type="search"
        className="mt-2 w-full min-w-0 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-blue-300" />
      <label htmlFor={`${id}-collection`} className="mt-3 block text-sm text-slate-200">Collection</label>
      <select id={`${id}-collection`} value={collection} onChange={(event) => setCollection(event.target.value)}
        className="mt-2 w-full min-w-0 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-blue-300">
        <option value="">All public collections</option>
        {COLLECTION_ORDER.map((key) => <option key={key} value={key}>{COLLECTIONS[key].title}</option>)}
      </select>
      <p className="mt-3 text-xs text-slate-400" aria-live="polite">{matches.length ? `Showing up to ${matches.length} public records` : "No public records match. Try all collections or a broader topic."}</p>
      <ul className="mt-2 divide-y divide-slate-800">{matches.map((entry) => <li key={entry.id}><EntryLink entry={entry} /></li>)}</ul>
      {related.length > 0 ? <section className="mt-5 border-t border-slate-700 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Related public reading</h3>
        <ul className="mt-2">{related.map((entry) => <li key={entry.id}><EntryLink entry={entry} /></li>)}</ul>
      </section> : null}
    </nav>
  );
}
