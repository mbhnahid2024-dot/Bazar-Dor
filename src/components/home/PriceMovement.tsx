import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

export default function PriceMovement({
  title,
  dir,
  products,
}: {
  title: string;
  dir: "up" | "down";
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="mx-auto mt-10 max-w-6xl px-4">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <span className={`text-lg ${dir === "up" ? "text-up" : "text-down"}`}>{dir === "up" ? "▲" : "▼"}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}