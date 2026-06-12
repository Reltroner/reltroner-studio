import React from 'react';

export default function EcosystemHero() {
  return (
    <section className="section-shell flex flex-col items-center justify-center py-24 text-center">
      <p className="mb-4 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
        Reltroner Ecosystem Gateway
      </p>
      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white drop-shadow-lg">
        Reltroner Studio
      </h1>
      <p className="rs-muted max-w-3xl text-lg md:text-xl mb-10">
        The official gateway to the Reltroner ecosystem — connecting knowledge, learning, operations, and future systems.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#app-dock" className="rs-focus-ring rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
          Explore Ecosystem
        </a>
        <a href="#knowledge-bridge" className="rs-focus-ring rounded-full rs-glass px-6 py-3 font-medium text-white transition hover:bg-slate-800/50">
          Browse Knowledge Base
        </a>
        <a href="https://lms.reltroner.com" target="_blank" rel="noreferrer" className="rs-focus-ring rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
          Open LMS ↗
        </a>
      </div>
    </section>
  );
}
