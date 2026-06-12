import React from 'react';
import { ECOSYSTEM_APPS } from '@/lib/constants/apps';
import StatusBadge from '../ui/StatusBadge';

export default function AppDock() {
  return (
    <section id="app-dock" className="section-shell rs-panel p-6 md:p-10 mb-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Reltroner Ecosystem</h2>
        <p className="rs-muted max-w-2xl mx-auto">
          Explore and launch active portals or preview future expansions.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ECOSYSTEM_APPS.map((app) => (
          <div key={app.name} className="rs-glass flex flex-col p-6 rounded-xl relative group transition hover:border-blue-500/40">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{app.name}</h3>
              <StatusBadge status={app.status} type={app.type} />
            </div>
            <p className="rs-muted text-sm flex-grow mb-6">{app.description}</p>
            
            {app.status === 'live' ? (
              <a
                href={app.url}
                target={app.type === 'external' ? '_blank' : undefined}
                rel={app.type === 'external' ? 'noreferrer' : undefined}
                className="mt-auto text-sm font-medium text-blue-400 hover:text-blue-300 transition flex items-center"
              >
                {app.type === 'external' ? 'Open Portal ↗' : 'Explore Platform →'}
              </a>
            ) : (
              <span className="mt-auto text-sm font-medium text-slate-500 cursor-not-allowed">
                In Development
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
