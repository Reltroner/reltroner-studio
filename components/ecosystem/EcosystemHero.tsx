import React from 'react';

export default function EcosystemHero() {
  return (
    <section aria-labelledby="ecosystem-heading" className="section-shell flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center">
      <p className="mb-4 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
        Reltroner Ecosystem Gateway
      </p>
      <h1 id="ecosystem-heading" className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white drop-shadow-lg">
        Reltroner Studio
      </h1>
      <p className="rs-muted max-w-3xl text-lg md:text-xl mb-10">
        Creative practice, the fictional world of Asthortera, and the systems behind Reltroner Studio. Choose where to begin.
      </p>
      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2 text-left">
        <div className="rs-glass min-w-0 rounded-xl p-5 sm:p-6 flex flex-col">
          <h2 className="mb-3 text-2xl font-semibold text-white">For Creators</h2>
          <p className="rs-muted mb-4">
            Build a world that holds together. Start with a revision practice: refine drafts, check consistency, and maintain your canon as it grows.
          </p>
          <p className="rs-muted mb-6 text-sm">A guided starting point for your creative practice.</p>
          <a href="/start/creators" className="focus-visible:rs-focus-ring mt-auto block rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-500">
            Explore the Creator pathway
          </a>
        </div>
        <div className="rs-glass min-w-0 rounded-xl p-5 sm:p-6 flex flex-col">
          <h2 className="mb-3 text-2xl font-semibold text-white">For Readers</h2>
          <p className="rs-muted mb-4">
            New to Asthortera? Meet the core terms of this fictional universe through a short glossary before exploring the wider lore.
          </p>
          <p id="reader-lore-note" className="rs-muted mb-6 text-sm">
            Start with a gentle fiction introduction. You choose when to open spoiler-aware lore.
          </p>
          <a href="/start/readers" aria-describedby="reader-lore-note" className="focus-visible:rs-focus-ring mt-auto block rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-500">
            Explore the Reader pathway
          </a>
        </div>
      </div>
      <p className="rs-muted mt-6 text-sm">
        Looking to collaborate or recruit?{' '}
        <a href="/blog/for-recruiters" className="focus-visible:rs-focus-ring rounded-sm text-blue-300 underline underline-offset-4 hover:text-blue-200">
          Explore engineering work and case studies
        </a>
      </p>
      <div className="mt-8 flex w-full flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
        <a href="#app-dock" className="focus-visible:rs-focus-ring rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
          Explore Ecosystem
        </a>
        <a href="#knowledge-bridge" className="focus-visible:rs-focus-ring rounded-full rs-glass px-6 py-3 font-medium text-white transition hover:bg-slate-800/50">
          Browse Knowledge Base
        </a>
        <a href="https://lms.reltroner.com" target="_blank" rel="noreferrer" className="focus-visible:rs-focus-ring rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
          Open LMS ↗
        </a>
      </div>
    </section>
  );
}
