import React from 'react';

export interface StatusBadgeProps {
  status: 'live' | 'planned';
  type: 'core' | 'external' | 'coming-soon';
}

export default function StatusBadge({ status, type }: StatusBadgeProps) {
  let styleClass = '';
  let label = '';

  if (status === 'live') {
    styleClass = 'bg-blue-900/30 border border-blue-500/30 text-blue-300';
    label = type === 'external' ? 'External / Live' : 'Core / Live';
  } else {
    styleClass = 'bg-slate-800/50 border border-slate-700/50 text-slate-400';
    label = 'Coming Soon';
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass}`}>
      {label}
    </span>
  );
}
