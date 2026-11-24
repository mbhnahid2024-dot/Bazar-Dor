import { cache } from "react";
import type { Dir, Market, Product } from "@/types/product";
import { toNum } from "./utils";

const BASES = [
  process.env.BAZAR_API_URL ?? "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(path: string): Promise<unknown> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
      // try next base URL
    }
  }
  throw new Error("API unavailable");
}

const rec = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" ? (v as Record<string, unknown>) : {};
const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : typeof v === "number" ? String(v) : fallback;

function unwrapList(json: unknown): unknown[] {
  let cur = json;
  for (let i = 0; i < 3; i++) {
    if (Array.isArray(cur)) return cur;
    const o = rec(cur);
    const next = o.data ?? o.products ?? o.items ?? o.result;
    if (next === undefined) break;
    cur = next;
  }
  return Array.isArray(cur) ? cur : [];
}

function unwrapOne(json: unknown): Record<string, unknown> {
  const o = rec(json);
  return rec(o.data ?? o.product ?? o.result ?? json);
}

function normalize(raw: Record<string, unknown>): Product {
  const ch = rec(raw.change);
  const today = toNum(raw.today);
  const yesterday = toNum(raw.yesterday);
  const d = str(ch.dir).toLowerCase();
  let dir: Dir = /up|rise|inc|▲/.test(d) ? "up" : /down|fall|dec|▼/.test(d) ? "down" : "flat";
  let pct = toNum(ch.pct);
  if (dir === "flat" && today !== null && yesterday) {
    dir = today > yesterday ? "up" : today < yesterday ? "down" : "flat";
  }
  if (pct === null && today !== null && yesterday) {
    pct = Math.abs(((today - yesterday) / yesterday) * 100);
  }
  const markets: Market[] = Array.isArray(raw.markets)
    ? raw.markets.map((m) => {
        const r = rec(m);
        return {
          market: str(r.market, "অজানা বাজার"),
          division: str(r.division),
          min: toNum(r.min),
          max: toNum(r.max),
        };
      })
    : [];
  const id = toNum(raw.id) ?? 0;
  return {
    id,
    slug: str(raw.slug) || String(id),
    nameBn: str(raw.nameBn, "নাম পাওয়া যায়নি"),
    category: str(raw.category),
    categoryNameBn: str(raw.categoryNameBn),
    categoryIcon: str(raw.categoryIcon, "🛒"),
    unit: str(raw.unit),
    image: str(raw.image),
    today,
    yesterday,
    lastWeek: toNum(raw.lastWeek),
    lastMonth: toNum(raw.lastMonth),
    dir,
    pct,
    markets,
  };
}

export const getProducts = cache(async (category?: string): Promise<Product[]> => {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const json = await request(path);
  return unwrapList(json).map((p) => normalize(rec(p)));
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const all = await getProducts();
  const base = all.find((p) => p.slug === slug);
  if (!base) return null;
  try {
    const detail = normalize(unwrapOne(await request(`/products/${base.id}`)));
    return {
      ...base,
      markets: detail.markets.length ? detail.markets : base.markets,
      lastWeek: detail.lastWeek ?? base.lastWeek,
      lastMonth: detail.lastMonth ?? base.lastMonth,
      today: detail.today ?? base.today,
      yesterday: detail.yesterday ?? base.yesterday,
    };
  } catch {
    return base;
  }
});

export const marketMid = (m: Market): number | null =>
  m.min !== null && m.max !== null ? (m.min + m.max) / 2 : (m.min ?? m.max);

export function priceStats(markets: Market[]) {
  const mins = markets.map((m) => m.min ?? m.max).filter((n): n is number => n !== null);
  const maxs = markets.map((m) => m.max ?? m.min).filter((n): n is number => n !== null);
  const mids = markets.map(marketMid).filter((n): n is number => n !== null);
  return {
    min: mins.length ? Math.min(...mins) : null,
    max: maxs.length ? Math.max(...maxs) : null,
    avg: mids.length ? mids.reduce((a, b) => a + b, 0) / mids.length : null,
  };
}