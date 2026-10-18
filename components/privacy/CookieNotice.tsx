'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export const COOKIE_NOTICE_STORAGE_KEY = 'reltroner.cookie-notice.v1';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY);
      if (stored !== 'dismissed') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function acknowledge() {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, 'dismissed');
    } catch {
      // Storage unavailable; still dismiss for the active session.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      id="cookie-notice"
      aria-label="Cookie notice"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className="fixed left-1/2 z-50 w-[min(42rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-[var(--rs-border-strong)] bg-[var(--rs-bg-panel-strong)]/95 p-4 text-slate-200 shadow-2xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-white">
            Essential Cookies Only
          </p>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            We use only the essentials needed to keep this site working. No unnecessary tracking or advertising cookies.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Link
            href="/privacy"
            className="inline-flex min-h-[40px] items-center rounded-lg px-2 text-xs font-medium text-blue-300 underline underline-offset-4 hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-sky-300 sm:text-sm"
          >
            Privacy &amp; preferences
          </Link>
          <button
            type="button"
            onClick={acknowledge}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-blue-400 bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-sky-300 sm:text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </aside>
  );
}
