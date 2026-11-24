"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="text-5xl">⚠️</div>
      <h2 className="mt-3 text-xl font-semibold">দুঃখিত, তথ্য লোড করা যায়নি।</h2>
      <button
        onClick={reset}
        className="mt-5 rounded-lg bg-brand px-6 py-2.5 text-white shadow-md shadow-green-900/20 hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}