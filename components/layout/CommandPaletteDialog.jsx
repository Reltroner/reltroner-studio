'use client';

import { startTransition, useMemo } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import { COLLECTIONS, COLLECTION_ORDER } from '@/lib/constants/collections';

const GROUP_PRIORITY = new Map([
  ['Pages', 0],
  ['Journal', 1],
  ['Worldbuilding', 2],
  ...COLLECTION_ORDER.map((collection, index) => [COLLECTIONS[collection].title, index + 10]),
]);

function getGroupPriority(group) {
  return GROUP_PRIORITY.get(group) ?? 100;
}

function getPathDepth(path) {
  return String(path || '/')
    .split('/')
    .filter(Boolean).length;
}

function getPageSearchKeywords(page) {
  return [page.group, page.description, page.category, ...(page.tags || [])].filter(Boolean);
}

function scoreCommandMatch(value, search, keywords) {
  const normalizedSearch = String(search || '').trim().toLowerCase();

  if (!normalizedSearch) {
    return 1;
  }

  const normalizedValue = String(value || '').toLowerCase();
  const normalizedKeywords = (keywords || []).map((keyword) => String(keyword).toLowerCase());
  const haystack = [normalizedValue, ...normalizedKeywords].join(' ');

  if (normalizedValue === normalizedSearch) {
    return 5;
  }

  if (normalizedValue.startsWith(normalizedSearch)) {
    return 4;
  }

  if (normalizedValue.includes(normalizedSearch)) {
    return 3;
  }

  if (normalizedKeywords.some((keyword) => keyword.includes(normalizedSearch))) {
    return 2;
  }

  const searchTokens = normalizedSearch.split(/\s+/).filter(Boolean);

  if (searchTokens.length > 1 && searchTokens.every((token) => haystack.includes(token))) {
    return 1;
  }

  return 0;
}

export default function CommandPaletteDialog({ open, onOpenChange, pages }) {
  const router = useRouter();

  const groupedPages = useMemo(() => {
    const groups = pages.reduce((result, page) => {
      const key = page.group || 'Pages';

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(page);
      return result;
    }, {});

    return Object.entries(groups)
      .sort(([left], [right]) => getGroupPriority(left) - getGroupPriority(right) || left.localeCompare(right))
      .map(([group, items]) => ({
        group,
        items: [...items].sort((left, right) => {
          const depthDifference = getPathDepth(left.path) - getPathDepth(right.path);

          if (depthDifference !== 0) {
            return depthDifference;
          }

          return left.name.localeCompare(right.name);
        }),
      }));
  }, [pages]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global Command Menu"
      className="shell-command-dialog"
      filter={scoreCommandMatch}
    >
      <VisuallyHidden>
        <DialogTitle>Search Reltroner Studio</DialogTitle>
        <DialogDescription>
          Browse pages, collections, and archive entries from anywhere in the site.
        </DialogDescription>
      </VisuallyHidden>

      <div className="command-palette-header">
        <div className="min-w-0">
          <p className="command-palette-eyebrow">Archive Search</p>
          <p className="command-palette-summary">
            Search titles, descriptions, categories, and tags across the archive.
          </p>
        </div>

        <button
          type="button"
          className="command-palette-close"
          aria-label="Close command palette"
          onClick={() => onOpenChange(false)}
        >
          <span aria-hidden="true">X</span>
        </button>
      </div>

      <CommandInput placeholder="Type a page, archive, topic, or tag..." />
      <CommandList>
        <CommandEmpty>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-gray-900 dark:text-white">No records matched this search.</p>
            <p>Try a collection, topic, or archive signal like Astralis, Reltroner, philosophy, or law.</p>
          </div>
        </CommandEmpty>
        {groupedPages.map(({ group, items }) => (
          <CommandGroup key={group} heading={`${group} · ${items.length}`} className="pb-2">
            {items.map((page) => (
              <CommandItem
                key={page.path}
                value={page.name}
                keywords={getPageSearchKeywords(page)}
                className="group items-start gap-3"
                onSelect={() => {
                  onOpenChange(false);
                  startTransition(() => {
                    router.push(page.path);
                  });
                }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{page.name}</p>
                  {page.description ? (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{page.description}</p>
                  ) : null}
                  {page.category || (page.tags && page.tags.length > 0) ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {page.category ? <span className="archive-chip">{page.category}</span> : null}
                      {(page.tags || []).slice(0, 2).map((tag) => (
                        <span
                          key={`${page.path}-${tag}`}
                          className="archive-chip border-gray-300 bg-white/70 text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:border-gray-700 dark:text-gray-500">
                  Open
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}