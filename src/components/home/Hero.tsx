import Image from "next/image";
import BanglaDate from "@/components/ui/BanglaDate";

export default function Hero() {
  return (
    <section className="mx-auto mt-4 max-w-6xl px-3 sm:mt-6 sm:px-4">
      <div className="grid items-center gap-6 rounded-3xl border border-line bg-card p-5 md:grid-cols-[1fr_auto] md:p-8">
        <div>
          <BanglaDate className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-brand sm:text-sm" />
          <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-xl text-sm text-stone-600 sm:mt-4 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-5 inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-md shadow-green-900/20 hover:bg-brand-dark sm:mt-6"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজির ঝুড়ি"
          width={560}
          height={420}
          priority
          className="mx-auto h-auto w-full max-w-[220px] sm:max-w-xs md:mr-8"
        />
      </div>
    </section>
  );
}