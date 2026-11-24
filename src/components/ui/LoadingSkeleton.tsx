export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="লোড হচ্ছে...">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-line bg-card p-4">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-xl bg-stone-200" />
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-stone-200" />
              <div className="h-3 w-16 rounded bg-stone-200" />
            </div>
          </div>
          <div className="mt-5 h-5 w-24 rounded bg-stone-200" />
        </div>
      ))}
    </div>
  );
}