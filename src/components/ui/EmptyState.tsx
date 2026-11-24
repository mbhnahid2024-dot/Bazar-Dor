import Link from "next/link";

export default function EmptyState({
  title,
  description,
  showHome = false,
}: {
  title: string;
  description?: string;
  showHome?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-10 text-center">
      <div className="text-5xl">🧺</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      {description && <p className="mt-1 text-stone-500">{description}</p>}
      {showHome && (
        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-brand px-6 py-2.5 font-medium text-white shadow-md shadow-green-900/20 hover:bg-brand-dark"
        >
          হোম পেজে ফিরে যান
        </Link>
      )}
    </div>
  );
}