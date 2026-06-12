import Link from "next/link";
import Script from "next/script";
import Heading from "@/components/Heading";
import ReadingProgressBar from "@/components/worldbuilding/ReadingProgressBar";
import WikiBreadcrumbs, { BreadcrumbSegment } from "@/components/wiki/WikiBreadcrumbs";
import { resolveCdnImageUrl } from "@/lib/assets/image";
import { getCollectionConfig } from "@/lib/constants/collections";

function getArchiveTone(config: any) {
  if (!config) {
    return "Civilization archive";
  }

  if (config.key === "blog") {
    return "Journal dossier";
  }

  if (config.group === "Engineering") {
    return "Systems archive";
  }

  return `${config.title} archive`;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function ReadingPath({ headings, className = "" }: { headings: HeadingItem[]; className?: string }) {
  if (!headings || !headings.length) {
    return null;
  }

  return (
    <nav className={className} aria-label="Reading path">
      <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        Reading path
      </p>
      <ol className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm leading-6 text-slate-300 transition hover:text-white ${
                heading.level > 2 ? "pl-3" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface ContentEntryPageProps {
  entry: any;
  contentHtml: string;
  headings?: HeadingItem[];
  relatedEntries?: any[];
  jsonLd?: any;
  jsonLdId?: string;
  analytics?: React.ReactNode;
}

export default function ContentEntryPage({
  entry,
  contentHtml,
  headings = [],
  relatedEntries = [],
  jsonLd,
  jsonLdId,
  analytics,
}: ContentEntryPageProps) {
  const config = getCollectionConfig(entry.collection);
  const articleBodyId = `archive-article-body-${entry.collection}-${entry.slug}`;
  const showReadingPath = headings.length >= 2;
  const entryImage = resolveCdnImageUrl(entry.image);

  const breadcrumbs: BreadcrumbSegment[] = [
    { label: "Knowledge Base", href: "/#knowledge" },
    { label: config?.title || "Archive", href: config?.route || "/" },
    { label: entry.title }
  ];

  return (
    <div className="editorial-shell py-8 sm:py-10">
      {analytics}

      <ReadingProgressBar targetId={articleBodyId} />

      <article className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
        <header className="editorial-flow mb-10">
          <WikiBreadcrumbs segments={breadcrumbs} />

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span className="archive-chip">{config?.group || "Archive"}</span>
            <span className="archive-chip">{getArchiveTone(config)}</span>
            {entry.type ? <span className="archive-chip">{entry.type}</span> : null}
          </div>

          <Heading className="pb-0 text-left text-4xl sm:text-5xl">
            {entry.title}
          </Heading>

          {entry.description ? (
            <p className="max-w-[76ch] text-base leading-8 text-slate-300 sm:text-lg">
              {entry.description}
            </p>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),18rem]">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span className="archive-chip">{entry.date}</span>
              {entry.modified && entry.modified !== entry.date ? (
                <span className="archive-chip">Updated {entry.modified}</span>
              ) : null}
              {entry.readingTime ? (
                <span className="archive-chip">{entry.readingTime} min read</span>
              ) : null}
              {entry.author ? (
                <span className="archive-chip">{entry.author}</span>
              ) : null}
              {typeof entry.published === 'boolean' ? (
                <span className="archive-chip">{entry.published ? "Published" : "Draft"}</span>
              ) : null}
            </div>

            <aside className="archive-rail p-4 text-sm text-slate-300">
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Archive signal
              </p>
              <dl className="grid gap-3">
                <div className="grid grid-cols-[auto,1fr] gap-3">
                  <dt className="text-slate-400">Collection</dt>
                  <dd className="font-medium text-white">{config?.title || "Archive"}</dd>
                </div>
                {entry.category ? (
                  <div className="grid grid-cols-[auto,1fr] gap-3">
                     <dt className="text-slate-400">Category</dt>
                     <dd className="font-medium text-white">{entry.category}</dd>
                  </div>
                ) : null}
                <div className="grid grid-cols-[auto,1fr] gap-3">
                  <dt className="text-slate-400">Sections</dt>
                  <dd className="font-medium text-white">{headings.length || "Continuous"}</dd>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-3">
                  <dt className="text-slate-400">Length</dt>
                  <dd className="font-medium text-white">{entry.wordCount || 0} words</dd>
                </div>
              </dl>
            </aside>
          </div>

          {entry.tags && entry.tags.length ? (
            <ul className="flex flex-wrap gap-2 text-sm text-slate-400">
              {entry.tags.slice(0, 8).map((tag: string) => (
                <li key={tag} className="archive-chip">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {entry.quote ? (
            <blockquote className="archive-rail px-5 py-4 text-lg italic leading-8 text-slate-300">
              “{entry.quote}”
            </blockquote>
          ) : null}
        </header>

        {entryImage ? (
          <figure className="media-frame mb-10 border border-slate-700">
            <img
              src={entryImage}
              alt={entry.title}
              loading="eager"
              className="h-auto w-full object-cover"
            />
            <figcaption className="border-t border-slate-700 px-4 py-3 text-sm text-slate-400">
              {config?.title || "Archive"} illustration
            </figcaption>
          </figure>
        ) : null}

        {entry.role ? (
          <div className="archive-rail mb-8 px-5 py-4 text-sm text-slate-300">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Archive role
            </p>
            <p className="text-base font-semibold text-white">{entry.role}</p>
          </div>
        ) : null}

        {showReadingPath ? (
          <ReadingPath headings={headings} className="archive-rail mb-8 p-4 lg:hidden" />
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),18rem] lg:items-start">
          <div className="min-w-0">
            <div
              id={articleBodyId}
              className="editorial-prose prose prose-slate prose-lg max-w-[76ch] dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            
            <div className="mt-12 pt-6 border-t border-slate-800">
               <Link href={config?.route || "/"} className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                 &larr; Back to {config?.title || "Archive"}
               </Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            {showReadingPath ? (
              <ReadingPath headings={headings} className="archive-rail sticky top-28 p-4" />
            ) : null}
          </aside>
        </div>
      </article>

      {relatedEntries && relatedEntries.length ? (
        <section className="surface-glass mt-8 p-6 sm:p-8">
          <div className="editorial-flow mb-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Continue through the archive
            </p>
            <Heading as="h2" className="pb-0 text-left text-2xl sm:text-3xl">
              Associated records
            </Heading>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Nearby entries linked by shared topics, category echoes, or archive lineage.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {relatedEntries.map((relatedEntry) => (
              <Link
                key={relatedEntry.route}
                href={relatedEntry.route}
                className="archive-link-card p-5 transition hover:-translate-y-0.5 hover:border-blue-400/40"
              >
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {relatedEntry.collectionTitle}
                </p>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">
                  {relatedEntry.title}
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  {relatedEntry.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  <span>{relatedEntry.relationshipLabel}</span>
                  {relatedEntry.date ? <span>{relatedEntry.date}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {jsonLd ? (
        <Script
          id={jsonLdId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </div>
  );
}
