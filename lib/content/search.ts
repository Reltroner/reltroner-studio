import { isPublicContent, MAX_SEARCHABLE_TEXT_LENGTH } from "./taxonomy";

export interface SearchableEntry {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  searchableText?: string;
  canonicalRoute: string;
  collection?: string;
  published?: boolean;
  draft?: boolean;
  private?: boolean;
  status?: string;
  visibility?: string;
}

export interface ContentSearchOptions {
  collection?: string;
  limit?: number;
  excludeIds?: readonly string[];
}

export function normalizeSearchText(value: string): string {
  return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreEntry(entry: SearchableEntry, query: string): number {
  if (!query) return 1;
  const title = normalizeSearchText(entry.title);
  const tags = (entry.tags || []).map(normalizeSearchText);
  const description = normalizeSearchText(entry.description || "");
  const body = normalizeSearchText((entry.searchableText || "").slice(0, MAX_SEARCHABLE_TEXT_LENGTH));
  const route = normalizeSearchText(entry.canonicalRoute);
  const tokens = query.split(" ").filter(Boolean).slice(0, 12);
  const haystack = [title, tags.join(" "), description, body, route].join(" ");
  if (!tokens.every((token) => haystack.includes(token))) return 0;
  let score = title === query ? 1000 : title.startsWith(query) ? 600 : title.includes(query) ? 350 : 0;
  score += tags.includes(query) ? 220 : tags.some((tag) => tag.includes(query)) ? 100 : 0;
  score += description.includes(query) ? 80 : 0;
  score += tokens.reduce((total, token) => total + (title.includes(token) ? 30 : tags.some((tag) => tag.includes(token)) ? 15 : description.includes(token) ? 8 : 1), 0);
  return score;
}

/** One ranking implementation for palette, collection, archive, navigation and related discovery. */
export function searchPublicContent<T extends SearchableEntry>(entries: readonly T[], query: string, options: ContentSearchOptions = {}): T[] {
  const normalized = normalizeSearchText(query).slice(0, 240);
  const excluded = new Set(options.excludeIds || []);
  const results = entries
    .filter((entry) => isPublicContent(entry as unknown as Record<string, unknown>) && !excluded.has(entry.id) && (!options.collection || entry.collection === options.collection))
    .map((entry) => ({ entry, score: scoreEntry(entry, normalized) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.entry.canonicalRoute.localeCompare(right.entry.canonicalRoute, "en") || left.entry.id.localeCompare(right.entry.id, "en"));
  return results.slice(0, options.limit == null ? results.length : Math.max(0, options.limit)).map(({ entry }) => entry);
}

/** Related content is shared search on explicit editorial topics, with collection fallback. */
export function discoverRelatedContent<T extends SearchableEntry>(entries: readonly T[], current: SearchableEntry, limit = 3): T[] {
  const topics = (current.tags || []).slice(0, 5);
  const matches = topics.flatMap((topic) => searchPublicContent(entries, topic, { excludeIds: [current.id] }));
  const fallback = searchPublicContent(entries, "", { collection: current.collection, excludeIds: [current.id] });
  const unique = new Map<string, T>();
  for (const entry of [...matches, ...fallback]) if (!unique.has(entry.id)) unique.set(entry.id, entry);
  return [...unique.values()].slice(0, limit);
}
