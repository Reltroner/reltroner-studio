import React from 'react';

const PATHWAYS = [
  { target: 'For creators', action: 'Enter the Creator pathway to explore creative practice, worldbuilding structure, and revision.', url: '/start/creators', external: false },
  { target: 'For readers', action: 'Begin with a spoiler-aware introduction to the fictional world of Asthortera.', url: '/start/readers', external: false },
  { target: 'For learners', action: 'Open LMS and structured knowledge.', url: 'https://lms.reltroner.com', external: true },
  { target: 'For builders', action: 'Understand architecture, principles, and systems.', url: '/principles', external: false },
  { target: 'For HR/admins', action: 'Open HRM portal.', url: 'https://hrm.reltroner.com', external: true },
  { target: 'For lore explorers', action: 'Browse the wider wiki collections after the glossary; deeper lore may contain spoilers.', url: '#knowledge-bridge', external: false },
  { target: 'For partners/recruiters', action: 'Explore engineering experience, systems work, and case studies for collaboration.', url: '/blog/for-recruiters', external: false },
];

export default function UseCasePathways() {
  return (
    <section aria-labelledby="pathways-heading" className="section-shell rs-panel p-6 md:p-10 mb-12">
      <div className="text-center mb-8">
        <h2 id="pathways-heading" className="text-2xl font-semibold mb-2">Use-Case Pathways</h2>
        <p className="rs-muted">Quick navigation based on your role or objective.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PATHWAYS.map(p => (
          <a key={p.target} href={p.url} target={p.external ? '_blank' : undefined} rel={p.external ? 'noreferrer' : undefined} className="focus-visible:rs-focus-ring rs-glass min-w-0 p-5 rounded-lg block hover:border-blue-500/30 transition">
            <h3 className="font-semibold text-blue-300 mb-1">{p.target}</h3>
            <p className="text-sm rs-muted">{p.action}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
