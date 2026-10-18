import type { SubscriptionResult } from '@/lib/newsletter/types';

export default function SubscriptionFeedback({ result }: { result: SubscriptionResult | null }) {
  const isError = Boolean(result && ['invalid', 'rejected', 'network-error', 'quota-error'].includes(result.status));
  return (
    <p
      id="newsletter-feedback"
      role={isError ? 'alert' : 'status'}
      aria-live="polite"
      className={
        result
          ? `rounded-xl border px-3.5 py-2.5 text-sm leading-6 ${
              isError
                ? 'border-rose-400/35 bg-rose-950/35 text-rose-200'
                : 'border-sky-400/30 bg-sky-950/30 text-sky-200'
            }`
          : 'sr-only'
      }
    >
      {result?.message}
    </p>
  );
}
