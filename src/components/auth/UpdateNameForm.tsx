"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!name.trim()) return void toast.error("নাম লিখুন।");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return void toast.error("দুঃখিত, তথ্য আপডেট করা যায়নি।");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">নাম</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
      </label>
      <button
        disabled={loading}
        className="w-full rounded-lg bg-brand py-2.5 font-semibold text-white shadow-md shadow-green-900/20 hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
}