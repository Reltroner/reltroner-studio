import Link from "next/link";
import Script from "next/script";
import Heading from "@/components/Heading";
import ReadingProgressBar from "@/components/worldbuilding/ReadingProgressBar";
import WikiBreadcrumbs, { BreadcrumbSegment } from "@/components/wiki/WikiBreadcrumbs";
import { resolveCdnImageUrl } from "@/lib/assets/image";
import { getCollectionConfig } from "@/lib/constants/collections";
import AdaptiveArchiveShell from "@/components/archive/AdaptiveArchiveShell";
import { CLASSIFICATION_LABELS, type PublicContentEntry } from "@/lib/content/taxonomy";
import type { ContentCollectionDefinition, ContentEntry, ContentHeading, RelatedContentEntry } from "@/types/content";
import ContentMediaFallback from "@/components/media/ContentMediaFallback";
import type { ArticleIntroduction } from "@/lib/content/editorial-typography";

function getArchiveTone(config: ContentCollectionDefinition) {
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

export interface ContentEntryPageProps {
  entry: ContentEntry;
  contentHtml: string;
  introduction?: ArticleIntroduction;
  headings?: ContentHeading[];
  relatedEntries?: RelatedContentEntry[];
  publicIndex: PublicContentEntry[];
  jsonLd?: unknown;
  jsonLdId?: string;
  analytics?: React.ReactNode;
}

const EMPTY_HEADINGS: ContentHeading[] = [];
const EMPTY_RELATED: RelatedContentEntry[] = [];

export default function ContentEntryPage({
  entry,
  contentHtml,
  introduction = { bodyHtml: contentHtml },
  headings = EMPTY_HEADINGS,
  relatedEntries = EMPTY_RELATED,
  publicIndex,
  jsonLd,
  jsonLdId,
  analytics,
}: ContentEntryPageProps) {
  const config = getCollectionConfig(entry.collection);
  const articleBodyId = `archive-article-body-${entry.collection}-${entry.slug}`;
  const entryImage = resolveCdnImageUrl(entry.image);

  const breadcrumbs: BreadcrumbSegment[] = [
    { label: "Explore", href: "/explore#collections" },
    { label: config?.title || "Archive", href: config?.route || "/" },
    { label: entry.title },
  ];

  const relatedSection = relatedEntries && relatedEntries.length ? (
    <section className="surface-glass p-6 sm:p-8">
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
  ) : null;

  return (
    <AdaptiveArchiveShell
      headings={headings}
      entries={publicIndex}
      currentId={`${entry.collection}:${entry.slug}`}
      collection={entry.collection}
      relatedContent={relatedSection}
    >
      {analytics}

      <ReadingProgressBar targetId={articleBodyId} />

      <article className="surface-card min-w-0 overflow-hidden p-4 sm:p-6 lg:p-8">
        <header className="article-introduction editorial-flow mb-10">
          <WikiBreadcrumbs segments={breadcrumbs} />

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span className="archive-chip">{config?.group || "Archive"}</span>
            <span className="archive-chip">{getArchiveTone(config)}</span>
            {entry.type ? <span className="archive-chip">{entry.type}</span> : null}
            {entry.classification ? <span className="archive-chip">{CLASSIFICATION_LABELS[entry.classification]}</span> : null}
          </div>
          {entry.needsEditorialReview ? <p className="editorial-scope-note">This legacy record is awaiting an explicit editorial scope label. Fiction, analogy and real-world claims require separate interpretation.</p> : null}

          <h1 id={introduction.titleId} className="article-title font-display"
            dangerouslySetInnerHTML={introduction.titleHtml ? { __html: introduction.titleHtml } : undefined}>
            {introduction.titleHtml ? undefined : introduction.titleText ?? entry.title}
          </h1>

          {introduction.leadHtml ? (
            <div className="article-summary" dangerouslySetInnerHTML={{ __html: introduction.leadHtml }} />
          ) : entry.description ? (
            <p className="article-summary">
              {entry.description}
            </p>
          ) : null}

          <div className="grid gap-4">
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
          <ContentMediaFallback>
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
          </ContentMediaFallback>
        ) : null}

        {entry.role ? (
          <div className="archive-rail mb-8 px-5 py-4 text-sm text-slate-300">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Archive role
            </p>
            <p className="text-base font-semibold text-white">{entry.role}</p>
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="min-w-0">
            <ContentMediaFallback><div
              id={articleBodyId}
              className="editorial-prose prose prose-slate prose-lg mx-auto dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: introduction.bodyHtml }}
            /></ContentMediaFallback>
            
            <div className="mt-12 pt-6 border-t border-slate-800">
               <Link href={config?.route || "/"} className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                 &larr; Back to {config?.title || "Archive"}
               </Link>
            </div>
          </div>

        </div>
      </article>

      {jsonLd ? (
        <Script
          id={jsonLdId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      ) : null}
    </AdaptiveArchiveShell>
  );
}
