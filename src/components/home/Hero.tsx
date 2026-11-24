import BanglaDate from "@/components/ui/BanglaDate";

function Basket() {
  return (
    <svg viewBox="0 0 240 200" className="h-auto w-full max-w-[280px]" role="img" aria-label="সবজির ঝুড়ি">
      <ellipse cx="120" cy="184" rx="110" ry="13" fill="#e4e8e0" />
      <path d="M95 36c0-12 8-20 14-26M150 22c0-10 6-18 12-22" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="72" r="38" fill="#ef4444" />
      <circle cx="152" cy="64" r="42" fill="#22c55e" />
      <circle cx="62" cy="108" r="22" fill="#a855f7" />
      <circle cx="118" cy="102" r="20" fill="#f97316" />
      <circle cx="172" cy="108" r="22" fill="#f59e0b" />
      <ellipse cx="76" cy="58" rx="6" ry="9" fill="#fff" opacity=".35" />
      <ellipse cx="138" cy="50" rx="6" ry="9" fill="#fff" opacity=".35" />
      <polygon points="40,102 200,102 190,176 50,176" fill="#b45309" />
      <rect x="34" y="94" width="172" height="16" rx="3" fill="#92400e" />
      <g stroke="#7c2d12" strokeWidth="3">
        <line x1="75" y1="110" x2="80" y2="174" />
        <line x1="105" y1="110" x2="107" y2="174" />
        <line x1="135" y1="110" x2="133" y2="174" />
        <line x1="165" y1="110" x2="160" y2="174" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">
      <div className="grid items-center gap-6 rounded-3xl border border-line bg-card p-6 md:grid-cols-[1fr_auto] md:p-8">
        <div>
          <BanglaDate className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-brand" />
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-4 max-w-xl text-stone-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-md shadow-green-900/20 hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="mx-auto md:mr-8">
          <Basket />
        </div>
      </div>
    </section>
  );
}