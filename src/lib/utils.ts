const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Parses numbers or strings (including Bengali digits) into a number. */
export function toNum(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const ascii = v
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/[,৳\s]/g, "");
  const n = parseFloat(ascii);
  return Number.isFinite(n) ? n : null;
}

const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const bn = (n: number | null) => (n === null ? "—" : nf.format(n));
/** Integers stay plain (৬২); fractions show two decimals (৬৩.৫০). */
export const bnAuto = (n: number | null) =>
  n === null ? "—" : Number.isInteger(n) ? nf.format(n) : nf2.format(n);
export const taka = (n: number | null) => (n === null ? "তথ্য নেই" : `${bn(n)} টাকা`);
export const takaAuto = (n: number | null) => (n === null ? "—" : `${bnAuto(n)} টাকা`);
/** "প্রতি কেজি" and "কেজি" both become "কেজি". */
export const unitName = (u: string) => u.replace(/^প্রতি\s*/, "").trim();

export function banglaDate(d = new Date()) {
  return d.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}