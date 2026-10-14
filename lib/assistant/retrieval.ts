import { searchPublicContent } from '@/lib/content/search';
import type { PublicContentEntry } from '@/lib/content/taxonomy';
import type { AssistantResponse, AssistantSource } from './types';

/** Uses the same ranking as Ctrl+K, collection search, and Archive Explorer. */
export function retrievePublicSources(entries: readonly PublicContentEntry[], query: string, options: { approvedEvidenceOnly?: boolean; limit?: number } = {}): AssistantSource[] {
  const publicEntries = entries.filter((entry) => entry.published === true && (
    !options.approvedEvidenceOnly || (entry.classification !== null && !entry.needsEditorialReview)
  ));
  return searchPublicContent(publicEntries, query, { limit: Math.min(options.limit || 5, 5) }).map((entry) => ({
    id: entry.id,
    title: entry.title,
    route: entry.canonicalRoute,
    collection: entry.collection,
    classification: entry.classification,
    needsEditorialReview: entry.needsEditorialReview,
    excerpt: (entry.description || entry.searchableText).replace(/\s+/g, ' ').slice(0, 600),
    revision: entry.revision,
  }));
}

export function createNavigationResponse(entries: readonly PublicContentEntry[], query: string): AssistantResponse {
  const sources = retrievePublicSources(entries, query);
  return {
    status: sources.length ? 'navigation' : 'insufficient_evidence',
    message: sources.length
      ? `Public navigation results for “${query}”. These are search results, not an AI explanation.`
      : `No published sources matched “${query}”. Try a shorter topic, title, or tag. There is not enough public evidence to explain this question.`,
    sources,
  };
}
