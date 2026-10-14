'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { ContentHeading } from '@/types/content';

export function decodeHtmlEntities(value: string): string {
  return String(value || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return '';
      }
    })
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try {
        return String.fromCodePoint(parseInt(dec, 10));
      } catch {
        return '';
      }
    })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

export function areHeadingsEqual(
  a: ContentHeading[] | undefined | null,
  b: ContentHeading[] | undefined | null
): boolean {
  if (a === b) return true;
  const listA = a || [];
  const listB = b || [];
  if (listA.length !== listB.length) return false;
  for (let i = 0; i < listA.length; i++) {
    const itemA = listA[i];
    const itemB = listB[i];
    if (
      itemA.id !== itemB.id ||
      itemA.text !== itemB.text ||
      itemA.level !== itemB.level
    ) {
      return false;
    }
  }
  return true;
}

const EMPTY_HEADINGS: ContentHeading[] = [];

interface ReadingPathContextValue {
  headings: ContentHeading[];
  setHeadings: (headings: ContentHeading[]) => void;
  clearHeadings: () => void;
  activeId: string;
  setActiveId: (id: string) => void;
}

const ReadingPathContext = createContext<ReadingPathContextValue>({
  headings: EMPTY_HEADINGS,
  setHeadings: () => {},
  clearHeadings: () => {},
  activeId: '',
  setActiveId: () => {},
});

export function ReadingPathProvider({ children }: { children: ReactNode }) {
  const [headings, setHeadingsState] = useState<ContentHeading[]>(EMPTY_HEADINGS);
  const [activeId, setActiveIdState] = useState<string>('');

  const setHeadings = useCallback((newHeadings: ContentHeading[]) => {
    setHeadingsState((prev) => {
      const incoming = newHeadings && newHeadings.length > 0 ? newHeadings : EMPTY_HEADINGS;
      if (areHeadingsEqual(prev, incoming)) {
        return prev;
      }
      return incoming;
    });
  }, []);

  const clearHeadings = useCallback(() => {
    setHeadingsState((prev) => (prev.length === 0 ? prev : EMPTY_HEADINGS));
    setActiveIdState((prev) => (prev === '' ? prev : ''));
  }, []);

  const setActiveId = useCallback((id: string) => {
    setActiveIdState((prev) => (prev === id ? prev : id));
  }, []);

  return (
    <ReadingPathContext.Provider
      value={{ headings, setHeadings, clearHeadings, activeId, setActiveId }}
    >
      {children}
    </ReadingPathContext.Provider>
  );
}

export function useReadingPath() {
  return useContext(ReadingPathContext);
}
