import "server-only";
import { cache } from "react";
import { COLLECTION_ORDER } from "@/lib/constants/collections";
import { getCollectionEntries } from "@/lib/utils/content";
import { isPublicContent, MAX_SEARCHABLE_TEXT_LENGTH, type PublicContentEntry } from "./taxonomy";
import type { ContentEntry } from "@/types/content";

export const PUBLIC_INDEX_VERSION = "reltroner-public-index-v1";

/** Public transport includes no filesystem location or arbitrary frontmatter fields. */
export function toPublicContentEntry(entry: ContentEntry): PublicContentEntry | null {
  if (!isPublicContent(entry as unknown as Record<string, unknown>)) return null;
  const id = `${entry.collection}:${entry.slug}`;
  const revision = entry.revision || "legacy-revision-unavailable";
  return {
    id, collection: entry.collection, slug: entry.slug,
    canonicalRoute: entry.route,
    aliases: entry.aliases.map((alias) => `${entry.route.slice(0, entry.route.lastIndexOf("/"))}/${alias}`),
    title: entry.title, description: entry.description || entry.summary,
    published: true, classification: entry.classification, classificationSource: entry.classificationSource, needsEditorialReview: entry.needsEditorialReview,
    tags: entry.tags.slice(0, 40), searchableText: (entry.searchableText || entry.summary).slice(0, MAX_SEARCHABLE_TEXT_LENGTH),
    revision, provenance: { source: "git-markdown", revision, modified: entry.modified },
  };
}

export const getPublicContentIndex = cache(async (): Promise<PublicContentEntry[]> => {
  const collections = await Promise.all(COLLECTION_ORDER.map((collection: string) => getCollectionEntries(collection)));
  return collections.flat().map(toPublicContentEntry).filter((entry): entry is PublicContentEntry => entry !== null)
    .sort((left, right) => left.canonicalRoute.localeCompare(right.canonicalRoute, "en"));
});
