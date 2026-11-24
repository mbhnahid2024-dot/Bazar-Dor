import { getProducts } from "@/lib/api";
import { bn, unitName } from "@/lib/utils";
import { productEmoji } from "@/components/products/ProductCard";

export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return null;
  const items = products.slice(0, 30);
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-line bg-card text-sm" aria-label="দামের তালিকা">
      <div className="marquee flex py-2.5 whitespace-nowrap">
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-2 border-r border-line px-5">
            <span>{productEmoji(p)}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-stone-600">
              {bn(p.today)} টাকা{p.unit ? `/${unitName(p.unit)}` : ""}
            </span>
            <span
              className={`font-semibold ${
                p.dir === "up" ? "text-up" : p.dir === "down" ? "text-down" : "text-stone-500"
              }`}
            >
              {p.dir === "up" ? "▲" : p.dir === "down" ? "▼" : "—"} {bn(p.pct ?? 0)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}