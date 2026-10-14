import type { SubscriptionResult } from '@/lib/newsletter/types';

export default function SubscriptionFeedback({ result }: { result: SubscriptionResult | null }) {
  return <p id="newsletter-feedback" role={result && ['invalid', 'rejected', 'network-error', 'quota-error'].includes(result.status) ? 'alert' : 'status'} aria-live="polite" className="min-h-12 text-sm leading-6 text-sky-200">{result?.message}</p>;
}
