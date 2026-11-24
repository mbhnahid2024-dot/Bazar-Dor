import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import { bn } from "@/lib/utils";
import ProductBrowser from "@/components/products/ProductBrowser";
import EmptyState from "@/components/ui/EmptyState";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-stone-100 text-2xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-stone-500">{bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      {products.length === 0 ? (
        <EmptyState title="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।" showHome />
      ) : (
        <ProductBrowser products={products} showSort />
      )}
    </div>
  );
}