
"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { Product } from "@/types/product";
import { bn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import EmptyState from "@/components/ui/EmptyState";

type Sort = "default" | "asc" | "desc";

export default function ProductBrowser({
  products,
  showSearch = false,
  showSort = false,
}: {
  products: Product[];
  showSearch?: boolean;
  showSort?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const deferred = useDeferredValue(query);

  const list = useMemo(() => {
    const q = deferred.trim().toLowerCase();

    const out = q
      ? products.filter((p) =>
          `${p.nameBn} ${p.categoryNameBn}`.toLowerCase().includes(q)
        )
      : [...products];

    if (sort !== "default") {
      const dir = sort === "asc" ? 1 : -1;

      out.sort((a, b) => {
        if (a.today === null) return 1;
        if (b.today === null) return -1;

        return (a.today - b.today) * dir;
      });
    }

    return out;
  }, [products, deferred, sort]);

  return (
    <div>
      {(showSearch || showSort) && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card p-4">
          {showSearch && (
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">পণ্য খুঁজুন</span>

              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন (যেমন: মসুর ডাল)"
                className="w-full rounded-lg border border-line bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand"
              />
            </label>
          )}

          {showSort && (
            <label className="relative flex w-full items-center justify-between gap-2 text-sm text-stone-600 sm:ml-auto sm:w-auto">
              <span>সাজান</span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none rounded-lg border border-line bg-white py-1.5 pl-3 pr-8 text-sm text-stone-800 outline-none focus:border-brand"
              >
                <option value="default">ডিফল্ট</option>
                <option value="asc">দাম: কম থেকে বেশি</option>
                <option value="desc">দাম: বেশি থেকে কম</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4" />
            </label>
          )}
        </div>
      )}

      <p className="mb-4 text-sm text-stone-500">
        মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {list.length === 0 ? (
        <EmptyState
          title="কোনো পণ্য পাওয়া যায়নি।"
          description="অন্য কিছু লিখে খুঁজে দেখুন।"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={`${p.id}-${p.slug}`} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
