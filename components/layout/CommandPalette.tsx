'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const openPalette = () => {
      setShouldRenderDialog(true);
      setOpen(true);
    };

    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShouldRenderDialog(true);
        setOpen((current) => !current);
      }
    };

    document.addEventListener('keydown', down);
    window.addEventListener('reltroner:command-palette:open', openPalette);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('reltroner:command-palette:open', openPalette);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setShouldRenderDialog(true);
          setOpen(true);
        }}
        className="hidden min-w-[20rem] items-center justify-between gap-4 rounded-full px-5 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white md:flex"
      >
        <span className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-blue-500/80" />
          Search titles, tags, and archives
        </span>
        <kbd className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
          Ctrl K
        </kbd>
      </button>

      {shouldRenderDialog ? (
        <CommandPaletteDialog
          open={open}
          onOpenChange={setOpen}
          pages={pages}
        />
      ) : null}
    </>
  );
}
