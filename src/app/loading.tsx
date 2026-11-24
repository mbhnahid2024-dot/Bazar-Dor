import { ProductGridSkeleton } from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="mb-4 text-stone-500">লোড হচ্ছে...</p>
      <ProductGridSkeleton />
    </div>
  );
}