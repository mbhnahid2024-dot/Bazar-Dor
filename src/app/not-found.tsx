import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <EmptyState title="৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি" description="আপনি যে পাতাটি খুঁজছেন তা নেই।" showHome />
    </div>
  );
}