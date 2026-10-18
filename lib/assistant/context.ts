import type { PublicContentEntry } from '@/lib/content/taxonomy';
import type { AssistantContext } from './types';

/** Context is resolved from the public index, never trusted from client document IDs. */
export function resolveAssistantContext(pathname: string, entries: readonly PublicContentEntry[]): AssistantContext {
  const safePath = /^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(pathname || '') ? pathname : '/';
  const entry = entries.find((candidate) => candidate.published === true && (
    candidate.canonicalRoute === safePath || candidate.aliases.includes(safePath)
  ));
  if (entry) {
    return {
      pathname: entry.canonicalRoute,
      documentId: entry.id,
      collection: entry.collection,
      title: entry.title,
      classification: entry.classification,
    };
  }

  const knownPages: Record<string, string> = {
    '/': 'Reltroner Studio',
    '/creators': 'Creator pathway',
    '/readers': 'Reader pathway',
    '/contact': 'Contact Reltroner',
  };
  const collection = entries.find((candidate) => candidate.published === true && `/${candidate.collection}` === safePath)?.collection;
  return { pathname: safePath, title: knownPages[safePath] || (collection ? `${collection} archive` : 'Public knowledge'), classification: null, collection };
}
