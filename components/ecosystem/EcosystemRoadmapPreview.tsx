import React from 'react';

const ROADMAP = [
  { phase: 'Phase 1', title: 'Foundation', status: 'done' },
  { phase: 'Phase 2', title: 'Ecosystem Lobby', status: 'done' },
  { phase: 'Phase 3', title: 'Navigation Standardization', status: 'done' },
  { phase: 'Phase 4', title: 'Wiki UX Upgrade', status: 'done' },
  { phase: 'Phase 5', title: 'Future Apps', status: 'next' },
  { phase: 'Phase 6', title: 'Community Integration', status: 'planned' },
];

export default function EcosystemRoadmapPreview() {
  return (
    <section className="section-shell rs-panel p-6 md:p-10 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Roadmap Preview</h2>
        <p className="rs-muted">The progression of the Reltroner Studio gateway.</p>
      </div>
      <div className="flex flex-col gap-3 max-w-3xl mx-auto">
        {ROADMAP.map(r => (
          <div key={r.phase} className={`flex items-center justify-between p-4 rounded-lg border ${r.status === 'done' ? 'border-blue-500/30 bg-blue-900/20' : r.status === 'next' ? 'border-amber-500/30 bg-amber-900/20' : 'border-slate-700 bg-slate-800/30'}`}>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${r.status === 'done' ? 'text-blue-400' : r.status === 'next' ? 'text-amber-400' : 'text-slate-500'}`}>{r.phase}</span>
              <span className={r.status === 'planned' ? 'text-slate-400' : 'text-white'}>{r.title}</span>
            </div>
            <span className={`text-xs uppercase tracking-wider font-semibold ${r.status === 'done' ? 'text-blue-400' : r.status === 'next' ? 'text-amber-400' : 'text-slate-600'}`}>
              {r.status === 'done' ? 'Completed' : r.status === 'next' ? 'Next' : 'Planned'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
