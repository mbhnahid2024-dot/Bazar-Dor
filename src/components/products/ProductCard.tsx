import Link from "next/link";
import type { Dir, Product } from "@/types/product";
import { bn, unitName } from "@/lib/utils";

export function ChangeBadge({ dir, pct }: { dir: Dir; pct: number | null }) {
  const style =
    dir === "up"
      ? "bg-red-50 text-up"
      : dir === "down"
        ? "bg-green-50 text-down"
        : "bg-stone-100 text-stone-500";
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      {icon} {bn(pct ?? 0)}%
    </span>
  );
}

export function productEmoji(p: Product) {
  return p.image && !/^https?:/.test(p.image) && [...p.image].length <= 4
    ? p.image
    : p.categoryIcon;
}

export function ProductTile({ p, size = "h-12 w-12 text-2xl" }: { p: Product; size?: string }) {
  const isUrl = /^https?:/.test(p.image);
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden rounded-xl bg-stone-100 ${size}`}>
      {isUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={p.nameBn} className="h-full w-full object-cover" />
      ) : (
        productEmoji(p)
      )}
    </span>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <ProductTile p={p} />
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.nameBn}</h3>
          <p className="text-sm text-stone-500">{p.unit ? `প্রতি ${unitName(p.unit)}` : "একক তথ্য নেই"}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-stone-500">আজকের দাম</p>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <p>
          <b className="text-xl">{bn(p.today)}</b> টাকা
        </p>
        <ChangeBadge dir={p.dir} pct={p.pct} />
      </div>
    </Link>
  );
}