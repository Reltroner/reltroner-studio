'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PageEntry } from './CommandPaletteDialog';

const CommandPaletteDialog = dynamic(() => import('./CommandPaletteDialog'), {
  ssr: false,
});

export interface CommandPaletteProps {
  pages: PageEntry[];
}

export default function CommandPalette({ pages }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [shouldRenderDialog, setShouldRenderDialog] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const isOpen = useRef(false);

  const openPalette = useCallback(() => {
    if (!isOpen.current) opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    isOpen.current = true;
    setShouldRenderDialog(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const key = typeof event?.key === 'string' ? event.key.toLowerCase() : null;
      if (key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (isOpen.current) { isOpen.current = false; setOpen(false); }
        else openPalette();
      }
    };

    document.addEventListener('keydown', down);
    window.addEventListener('reltroner:command-palette:open', openPalette);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('reltroner:command-palette:open', openPalette);
    };
  }, [openPalette]);

  return (
    <>
      <button
        onClick={openPalette}
        aria-label="Search titles, tags, and archives"
        className="studio-search-button"
      >
        <span className="flex items-center gap-3">
          <span aria-hidden="true">⌕</span>
          Search
        </span>
        <kbd className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
          Ctrl K
        </kbd>
      </button>

      {shouldRenderDialog ? (
        <CommandPaletteDialog
          open={open}
          onOpenChange={(next) => { isOpen.current = next; setOpen(next); }}
          onReturnFocus={() => opener.current?.focus()}
          pages={pages}
        />
      ) : null}
    </>
  );
}
