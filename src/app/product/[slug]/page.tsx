
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getProductBySlug, marketMid, priceStats } from "@/lib/api";
import { bn, takaAuto, taka, unitName } from "@/lib/utils";
import { ChangeBadge, ProductTile } from "@/components/products/ProductCard";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?reason=protected&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const stats = priceStats(p.markets);
  const markets = [...p.markets].sort(
    (a, b) => (marketMid(a) ?? 0) - (marketMid(b) ?? 0)
  );

  const diff =
    p.today !== null && p.yesterday !== null
      ? Math.abs(p.today - p.yesterday)
      : null;

  const verb =
    p.dir === "up" ? "বেড়েছে" : p.dir === "down" ? "কমেছে" : null;

  const unit = p.unit ? unitName(p.unit) : "";

  const boxes = [
    {
      label: "সর্বনিম্ন দাম",
      value: stats.min,
      hint: "সবচেয়ে কম দামের বাজার",
      color: "text-down",
    },
    {
      label: "সর্বাধিক দাম",
      value: stats.max,
      hint: "সবচেয়ে বেশি দামের বাজার",
      color: "text-up",
    },
    {
      label: "গড় দাম",
      value: stats.avg,
      hint: unit ? `প্রতি ${unit}-এর হিসাবে` : "গড় হিসাব",
      color: "text-down",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
        <Link href="/" className="hover:text-brand">
          হোম
        </Link>

        <ChevronRight className="h-4 w-4" />

        {p.category && (
          <>
            <Link
              href={`/category/${p.category}`}
              className="hover:text-brand"
            >
              {p.categoryNameBn || "ক্যাটাগরি"}
            </Link>

            <ChevronRight className="h-4 w-4" />
          </>
        )}

        <span>{p.nameBn}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-card p-6">
        <ProductTile p={p} size="h-20 w-20 text-4xl" />

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {p.nameBn}
          </h1>

          <p className="text-sm text-stone-500">
            {unit ? `প্রতি ${unit}` : "একক তথ্য নেই"}
            {p.categoryNameBn && ` · ${p.categoryNameBn}`}
          </p>

          <p className="mt-2 text-sm">
            গতকালের তুলনায় আজ দাম{" "}
            {verb ? (
              <>
                <b>{verb}</b>
                {diff !== null && ` · ${bn(diff)} টাকা`}
              </>
            ) : (
              <b>অপরিবর্তিত</b>
            )}
          </p>

          <p className="mt-1 text-xs text-stone-500">
            গতকাল: {taka(p.yesterday)} · গত সপ্তাহ: {taka(p.lastWeek)} · গত
            মাস: {taka(p.lastMonth)}
          </p>
        </div>

        {/* Responsive today's price box */}
        <div className="w-full rounded-2xl bg-stone-100 px-6 py-4 text-center sm:w-auto">
          <p className="text-xs text-stone-500">আজকের দাম</p>

          <p className="text-3xl font-bold">{bn(p.today)}</p>

          <p className="text-xs text-stone-500">
            টাকা{unit && ` / ${unit}`}
          </p>

          <div className="mt-2">
            <ChangeBadge dir={p.dir} pct={p.pct} />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-card p-6">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid gap-3 md:grid-cols-3">
          {boxes.map((b) => (
            <div
              key={b.label}
              className="rounded-xl border border-line p-4"
            >
              <p className="text-xs text-stone-500">{b.label}</p>

              <p className={`mt-1 ${b.color}`}>
                <b className="text-2xl">
                  {b.value === null ? "—" : bn(b.value)}
                </b>{" "}
                টাকা
              </p>

              <p className="mt-1 text-xs text-stone-500">{b.hint}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <p className="text-stone-500">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-stone-500">
                <tr>
                  <th className="p-3 text-left font-medium">বাজার</th>
                  <th className="p-3 text-left font-medium">বিভাগ</th>
                  <th className="p-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="p-3 text-right font-medium">সর্বাধিক</th>
                  <th className="p-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((m, i) => (
                  <tr
                    key={i}
                    className={`border-t border-line ${
                      i % 2 ? "bg-green-50/50" : ""
                    }`}
                  >
                    <td className="p-3">{m.market}</td>
                    <td className="p-3">{m.division || "—"}</td>
                    <td className="p-3 text-right">{takaAuto(m.min)}</td>
                    <td className="p-3 text-right">{takaAuto(m.max)}</td>
                    <td className="p-3 text-right font-bold">
                      {takaAuto(marketMid(m))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
