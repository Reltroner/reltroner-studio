import { notFound, redirect } from "next/navigation";
import BlogAnalytics from "@/components/BlogAnalytics";
import DwellTimeTracker from "@/components/DwellTimeTracker";
import PhilosophyAnalytics from "@/components/PhilosophyAnalytics";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import ContentEntryPage from "@/components/worldbuilding/ContentEntryPage";
import { getCollectionConfig } from "@/lib/constants/collections";
import { buildContentJsonLd } from "@/lib/seo/jsonld";
import { buildEntryMetadata } from "@/lib/seo/metadata";
import {
  getCollectionEntry,
  getCollectionStaticParams,
} from "@/lib/utils/content";

function renderAnalytics(mode, entry) {
  switch (mode) {
    case "blog":
      return (
        <>
          <BlogAnalytics slug={entry.slug} title={entry.title} />
          <ScrollDepthTracker slug={entry.slug} category="blog" />
          <DwellTimeTracker slug={entry.slug} />
        </>
      );
    case "philosophy":
      return <PhilosophyAnalytics philosophy={{ slug: entry.slug }} />;
    default:
      return null;
  }
}

export function createCollectionRoute(collection, options = {}) {
  const config = getCollectionConfig(collection);

  return {
    async generateMetadata({ params }) {
      const { slug } = await params;
      const result = await getCollectionEntry(collection, slug);

      if (!result) {
        return notFound();
      }

      return buildEntryMetadata(config, result.entry);
    },

    async generateStaticParams() {
      return getCollectionStaticParams(collection);
    },

    async Page({ params }) {
      const { slug } = await params;
      const result = await getCollectionEntry(collection, slug);

      if (!result) {
        return notFound();
      }

      if (result.redirectTo) {
        redirect(result.redirectTo);
      }

      return (
        <ContentEntryPage
          entry={result.entry}
          contentHtml={result.contentHtml}
          headings={result.headings}
          relatedEntries={result.relatedEntries}
          analytics={renderAnalytics(options.analyticsMode, result.entry)}
          jsonLd={buildContentJsonLd(config, result.entry)}
          jsonLdId={`structured-data-${collection}`}
        />
      );
    },
  };
}