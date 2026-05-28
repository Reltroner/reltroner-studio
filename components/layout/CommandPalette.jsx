'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CommandPaletteDialog = dynamic(() => import('./CommandPaletteDialog'), {
  ssr: false,
});

export default function CommandPalette({ pages }) {
  const [open, setOpen] = useState(false);
  const [shouldRenderDialog, setShouldRenderDialog] = useState(false);

  useEffect(() => {
    const openPalette = () => {
      setShouldRenderDialog(true);
      setOpen(true);
    };

    const down = (event) => {
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
        className="hidden min-w-[20rem] items-center justify-between gap-4 rounded-full px-5 py-3 text-sm text-gray-600 transition hover:bg-white/85 dark:text-gray-200 dark:hover:bg-gray-900/85 md:flex"
      >
        <span className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-blue-500/80" />
          Search titles, tags, and archives
        </span>
        <kbd className="rounded-full border border-gray-200 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-gray-500 dark:border-gray-700 dark:text-gray-400">
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