import { AI_DISCONNECTED_NOTICE } from '@/lib/assistant/types';

export default function AssistantStatus({ providerAvailable = false }: { providerAvailable?: boolean }) {
  return (
    <div className="rounded-xl border border-blue-300/20 bg-blue-950/60 p-3 text-xs leading-relaxed text-blue-100">
      <p className="font-semibold">{providerAvailable ? 'Public-source explanations' : 'Public navigation prototype'}</p>
      <p className="mt-1">{providerAvailable ? 'Explanations use only classified published sources. Check the source links and their epistemic labels.' : AI_DISCONNECTED_NOTICE}</p>
    </div>
  );
}
