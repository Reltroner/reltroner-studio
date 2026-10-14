import type { AssistantContext } from '@/lib/assistant/types';

export default function AssistantWelcome({ context }: { context: AssistantContext }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-300">
      <p className="text-base font-semibold text-white">Find your next reading path.</p>
      <p>Search published Reltroner knowledge, follow the Creator or Reader pathway, and inspect original sources.</p>
      <p className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs"><span className="font-semibold text-slate-100">Current page:</span> {context.title}</p>
      <p className="text-xs text-slate-400">History stays in this tab until you reset or refresh. Public search runs locally. Avoid entering personal or confidential information.</p>
    </div>
  );
}
