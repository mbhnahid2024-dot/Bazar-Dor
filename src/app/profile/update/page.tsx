import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/auth/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?reason=protected&callbackUrl=/profile/update");

  return (
    <div className="mx-auto max-w-[736px] px-4 py-10">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-stone-600">আপনার নাম পরিবর্তন করুন।</p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-6">
        <UpdateNameForm defaultName={session.user.name} />
      </div>
      <p className="mt-6 text-sm text-stone-500">
        <Link href="/profile" className="hover:text-brand">← প্রোফাইলে ফিরে যান</Link>
      </p>
    </div>
  );
}