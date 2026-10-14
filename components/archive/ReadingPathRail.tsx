'use client';

import { useReadingPath, decodeHtmlEntities } from "./ReadingPathContext";
import type { ContentHeading } from "@/types/content";

export default function ReadingPathRail({ headings, onNavigate }: { headings: ContentHeading[]; onNavigate?: () => void }) {
  const { activeId, setActiveId } = useReadingPath();

  if (!headings.length) return null;
  return (
    <nav aria-label="Reading path" className="archive-rail p-4">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Reading path</h2>
      <ol className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} aria-current={activeId === heading.id ? "location" : undefined}
              onClick={() => { setActiveId(heading.id); onNavigate?.(); }}
              className={`block rounded-lg py-2 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-blue-300 ${heading.level > 2 ? "pl-3" : "px-2"} ${activeId === heading.id ? "bg-blue-400/10 text-blue-200" : "text-slate-300 hover:text-white"}`}>
              {decodeHtmlEntities(heading.text)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
