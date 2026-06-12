'use client';

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import Heading from "@/components/Heading";
import ArchiveCardMedia from "@/components/media/ArchiveCardMedia";
import HoverDepth from "@/components/motion/HoverDepth";
import WikiBreadcrumbs, { BreadcrumbSegment } from "@/components/wiki/WikiBreadcrumbs";

const numberFormatter = new Intl.NumberFormat("en-US");

function normalizeSignals(values: any[]) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function getSearchValues(item: any) {
  return [
    item.title,
    item.description,
    item.summary,
    item.role,
    item.quote,
    item.slug,
    item.category,
    item.type,
    ...normalizeSignals(item.tags || []),
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
}

function getReadingLabel(item: any) {
  if (item.readingTime) {
    return `${item.readingTime} min read`;
  }

  if (item.wordCount) {
    return `${numberFormatter.format(item.wordCount)} words`;
  }

  return null;
}

export interface CollectionPageClientProps {
  collection: any;
  items: any[];
}

export default function CollectionPageClient({ collection, items }: CollectionPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const archiveInsights = useMemo(() => {
    const signalCounts = new Map<string, number>();
    let totalWords = 0;

    items.forEach((item) => {
      totalWords += item.wordCount || 0;

      const recordSignals = normalizeSignals([
        item.category,
        item.type,
        ...(item.tags || []),
      ]);

      recordSignals.forEach((signal) => {
        signalCounts.set(signal, (signalCounts.get(signal) || 0) + 1);
      });
    });

    const featuredSignals = [...signalCounts.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 6)
      .map(([label, count]) => ({ label, count }));

    return {
      featuredSignals,
      totalSignals: signalCounts.size,
      totalWords,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      return getSearchValues(item).some((value) => value.includes(normalizedQuery));
    });
  }, [items, normalizedQuery]);

  const isFiltering = normalizedQuery.length > 0;

  const breadcrumbs: BreadcrumbSegment[] = [
    { label: "Knowledge Base", href: "/#knowledge" },
    { label: collection.title }
  ];

  return (
    <div className="section-shell px-4 py-6 dark:text-white">
      <WikiBreadcrumbs segments={breadcrumbs} />

      <div className="mb-6 text-center mt-4">
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          <span className="archive-chip">{collection.group || "Archive"}</span>
          <span className="archive-chip">{numberFormatter.format(items.length)} records</span>
        </div>
        <Heading className="pb-2">{collection.title}</Heading>
        <p className="mx-auto max-w-3xl text-center font-medium text-slate-300">
          {collection.description}
        </p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.95fr)]">
        <section className="surface-glass flex flex-col gap-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Archive Search
              </p>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Search by title, role, tag, category, quote, or record type. Keep it lightweight and local to the archive.
              </p>
            </div>
            {isFiltering ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="archive-chip transition hover:brightness-110"
              >
                Clear Search
              </button>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor={`${collection.key}-search`} className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
              Search:
            </label>
            <input
              type="text"
              id={`${collection.key}-search`}
              placeholder={`Search ${collection.title.toLowerCase()} by signal, topic, or record name...`}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white/80 px-4 py-2 shadow-sm transition focus:outline-hidden focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span>
              {isFiltering
                ? `${numberFormatter.format(filteredItems.length)} matching records`
                : `${numberFormatter.format(items.length)} total records`}
            </span>
            <span className="text-slate-500">/</span>
            <span>
              {isFiltering
                ? `Filtering by “${searchQuery.trim()}”`
                : "Jump into a theme with an archive signal below."}
            </span>
          </div>

          {archiveInsights.featuredSignals.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {archiveInsights.featuredSignals.map((signal) => {
                const isActive = normalizedQuery === signal.label.toLowerCase();

                return (
                  <button
                    type="button"
                    key={signal.label}
                    onClick={() => setSearchQuery(signal.label)}
                    className={`archive-chip transition ${
                      isActive
                        ? "border-blue-500/70 bg-blue-500/10 text-blue-200"
                        : "hover:brightness-110"
                    }`}
                  >
                    <span>{signal.label}</span>
                    <span className="text-[0.65rem] text-slate-500">{signal.count}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <aside className="archive-rail p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Archive Briefing
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Records</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {numberFormatter.format(items.length)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Signals</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {numberFormatter.format(archiveInsights.totalSignals)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Reading Volume</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {numberFormatter.format(archiveInsights.totalWords)}
              </p>
              <p className="mt-1 text-sm text-slate-300">Words indexed across this collection.</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Archive Index
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {isFiltering ? "Matching records" : `All ${collection.title} records`}
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-right">
          Every record stays lightweight and static, but the archive surface now exposes the signals already present in the editorial metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const readingLabel = getReadingLabel(item);
            const recordSignals = normalizeSignals([item.category, item.type]);
            const tags = normalizeSignals(item.tags || []).slice(0, 3);
            const summary = item.description || item.summary || "Explore this archive record.";

            return (
              <Link href={`${collection.route}/${item.slug}`} key={item.slug} className="block h-full">
                <HoverDepth className="h-full">
                  <article className="archive-link-card group flex h-full min-h-[20rem] flex-col overflow-hidden dark:text-white">
                    <ArchiveCardMedia
                      image={item.image}
                      title={item.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="flex grow flex-col gap-4 p-5">
                      <div className="flex flex-wrap gap-2">
                        {recordSignals.map((signal) => (
                          <span key={signal} className="archive-chip">
                            {signal}
                          </span>
                        ))}
                        {readingLabel ? <span className="archive-chip">{readingLabel}</span> : null}
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                          {item.title}
                        </h2>
                        {item.role ? (
                          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {item.role}
                          </p>
                        ) : null}
                      </div>

                      <p className="grow text-slate-300">{summary}</p>

                      {item.quote ? (
                        <blockquote className="border-l-3 border-blue-300 pl-3 text-sm italic text-blue-900 dark:text-blue-200">
                          “{item.quote}”
                        </blockquote>
                      ) : null}

                      {tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span key={tag} className="archive-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400/80 transition-colors group-hover:text-blue-300">
                        Open Record
                      </div>
                    </div>
                  </article>
                </HoverDepth>
              </Link>
            );
          })
        ) : (
          <div className="archive-rail col-span-full p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              No Matching Records
            </p>
            <p className="mt-3 text-base text-slate-300">
              No {collection.key} records matched “{searchQuery}”. Try a broader signal, a title fragment, or one of the archive chips above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
