import CollectionPageClient from "@/components/worldbuilding/CollectionPageClient";
import { getCollectionConfig } from "@/lib/constants/collections";
import { buildCollectionMetadata } from "@/lib/seo/metadata";
import { getCollectionEntries } from "@/lib/utils/content";
import { getPublicContentIndex } from "@/lib/content/public-index";

export function getCollectionPageMetadata(collection) {
  const config = getCollectionConfig(collection);
  return buildCollectionMetadata(config);
}

export function createCollectionPage(collection) {
  const config = getCollectionConfig(collection);

  return async function CollectionPage() {
    const items = await getCollectionEntries(collection);
    const publicItems = items.map((entry) => ({
      collection: entry.collection, slug: entry.slug, title: entry.title, route: entry.route,
      description: entry.description, summary: entry.summary, image: entry.image,
      role: entry.role, quote: entry.quote, category: entry.category, type: entry.type,
      tags: entry.tags, readingTime: entry.readingTime, wordCount: entry.wordCount,
      date: entry.date, modified: entry.modified, classification: entry.classification,
      needsEditorialReview: entry.needsEditorialReview,
    }));
    return <CollectionPageClient collection={config} items={publicItems} publicIndex={await getPublicContentIndex()} />;
  };
}
