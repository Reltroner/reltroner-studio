'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { PLATFORM_ECOSYSTEM } from '@/lib/constants/platform-ecosystem';

const MENU_ID = 'platform-ecosystem-menu';
const MENU_HEADING_ID = 'platform-ecosystem-menu-heading';

interface PlatformEcosystemListProps {
  ariaLabelledBy?: string;
  onNavigate?: () => void;
}

export function PlatformEcosystemList({
  ariaLabelledBy,
  onNavigate,
}: PlatformEcosystemListProps) {
  return (
    <ul className="grid gap-1.5" aria-labelledby={ariaLabelledBy}>
      {PLATFORM_ECOSYSTEM.map((entry) => (
        <li key={entry.id}>
          {entry.current ? (
            <div
              aria-current="true"
              data-ecosystem-current="true"
              className="rounded-xl border border-sky-400/35 bg-sky-500/15 px-3.5 py-3 shadow-[inset_3px_0_0_var(--rs-accent)]"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-white">
                  {entry.label}
                </span>
                <span className="inline-flex items-center rounded-full border border-sky-300/50 bg-sky-400/20 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-sky-100 whitespace-nowrap">
                  You are here
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-200">
                {entry.description}
              </p>
            </div>
          ) : (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="group block rounded-xl border border-transparent px-3.5 py-3 no-underline transition-colors hover:border-sky-300/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 motion-reduce:transition-none"
            >
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-100 group-hover:text-white">
                <span>{entry.label}</span>
                <ExternalLink
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-sky-300/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-200 motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-300">
                {entry.description}
              </span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function PlatformEcosystemMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }

      const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
      if (key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(false);
      }
    };

    const handlePaletteOpen = () => {
      setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('reltroner:command-palette:open', handlePaletteOpen);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('reltroner:command-palette:open', handlePaletteOpen);
    };
  }, [isOpen]);

  const handleContainerBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const nextFocused = event.relatedTarget as Node | null;
      if (isOpen && nextFocused && !event.currentTarget.contains(nextFocused)) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={handleContainerBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label="Platform ecosystem"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((prev) => !prev)}
        className="studio-ecosystem-button"
        data-ecosystem-toggle="true"
      >
        <span>Ecosystem</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-sky-300/85 transition-transform duration-150 motion-reduce:transition-none ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={MENU_ID}
        hidden={!isOpen}
        role="group"
        aria-labelledby={MENU_HEADING_ID}
        data-ecosystem-menu="true"
        className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--rs-border-strong)] bg-[var(--rs-bg-panel-strong)] p-2 text-slate-100 shadow-[0_24px_60px_-16px_rgba(0,8,20,0.88),0_0_32px_rgba(23,168,255,0.16)] backdrop-blur-xl"
      >
        <p
          id={MENU_HEADING_ID}
          className="px-3.5 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-300"
        >
          Platform Ecosystem
        </p>
        <PlatformEcosystemList
          ariaLabelledBy={MENU_HEADING_ID}
          onNavigate={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
