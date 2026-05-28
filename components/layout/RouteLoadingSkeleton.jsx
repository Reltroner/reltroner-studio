export default function RouteLoadingSkeleton() {
  return (
    <div className="section-shell px-4 py-8">
      <div className="surface-glass p-6 sm:p-8">
        <div className="mb-8 h-3 w-28 animate-pulse rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
        <div className="mb-4 h-11 max-w-2xl animate-pulse rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
        <div className="mb-3 h-4 max-w-xl animate-pulse rounded-full bg-slate-200/90 dark:bg-slate-800/90" />
        <div className="h-4 max-w-3xl animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="surface-card overflow-hidden">
            <div className="h-48 animate-pulse bg-slate-200/80 dark:bg-slate-800/80" />
            <div className="space-y-3 p-5">
              <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
              <div className="h-4 w-full animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}