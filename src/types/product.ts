export type Dir = "up" | "down" | "flat";

export interface Market {
  market: string;
  division: string;
  min: number | null;
  max: number | null;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number | null;
  yesterday: number | null;
  lastWeek: number | null;
  lastMonth: number | null;
  dir: Dir;
  pct: number | null;
  markets: Market[];
}