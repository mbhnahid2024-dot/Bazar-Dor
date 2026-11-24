import { getProducts } from "@/lib/api";
import Hero from "@/components/home/Hero";
import PriceMovement from "@/components/home/PriceMovement";
import ProductBrowser from "@/components/products/ProductBrowser";

export default async function Home() {
  const products = await getProducts();
  const byPct = (a: { pct: number | null }, b: { pct: number | null }) => (b.pct ?? 0) - (a.pct ?? 0);
  const risers = products.filter((p) => p.dir === "up").sort(byPct).slice(0, 6);
  const fallers = products.filter((p) => p.dir === "down").sort(byPct).slice(0, 6);

  return (
    <>
      <Hero />
      <PriceMovement title="আজ দাম বেড়েছে" dir="up" products={risers} />
      <PriceMovement title="আজ দাম কমেছে" dir="down" products={fallers} />
      <section id="সব-পণ্য" className="mx-auto mt-10 max-w-6xl scroll-mt-6 px-4">
        <h2 className="mb-1 text-2xl font-bold">সব পণ্য</h2>
        <ProductBrowser products={products} showSearch />
      </section>
    </>
  );
}