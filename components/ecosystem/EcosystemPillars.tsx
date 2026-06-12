import React from 'react';

const PILLARS = [
  { name: 'Knowledge', desc: 'Centralized wiki, lore, and documentation.' },
  { name: 'Learning', desc: 'Structured courses and curriculum paths.' },
  { name: 'Operations', desc: 'Human resource and management portals.' },
  { name: 'Brand Memory', desc: 'Design systems and architectural records.' },
  { name: 'Future Systems', desc: 'Reserved protocols for emerging tech.' },
];

export default function EcosystemPillars() {
  return (
    <section className="section-shell rs-panel p-6 md:p-10 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Ecosystem Pillars</h2>
        <p className="rs-muted">The core foundations of the Reltroner network.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {PILLARS.map(p => (
          <div key={p.name} className="rs-glass p-5 rounded-lg text-center flex flex-col items-center justify-center">
            <h3 className="font-semibold mb-2">{p.name}</h3>
            <p className="text-xs rs-muted">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
