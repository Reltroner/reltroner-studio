'use client';

import { Compass } from 'lucide-react';
import type { RefObject } from 'react';

export default function AssistantLauncher({ open, onOpen, buttonRef }: { open: boolean; onOpen: () => void; buttonRef: RefObject<HTMLButtonElement | null> }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-label="Open Reltroner Navigator"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? 'reltroner-navigator-panel' : undefined}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', right: 'max(1rem, env(safe-area-inset-right))' }}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full border border-blue-400/40 bg-blue-700/90 backdrop-blur-md px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-950/50 hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 transition-all active:scale-95"
    >
      <Compass className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Navigator</span>
    </button>
  );
}
