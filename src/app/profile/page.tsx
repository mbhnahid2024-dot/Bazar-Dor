import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?reason=protected&callbackUrl=/profile");
  const { user } = session;

  return (
    <div className="mx-auto max-w-[736px] px-4 py-10">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-stone-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="h-20 w-20 rounded-xl object-cover" />
          ) : (
            <span className="grid h-20 w-20 place-items-center rounded-xl bg-green-100 text-3xl font-bold text-brand">
              {user.name.charAt(0)}
            </span>
          )}
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-stone-500">{user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-card p-6">
        <h2 className="mb-4 font-bold">তথ্য</h2>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            disabled
            defaultValue={user.name}
            className="w-full rounded-lg border border-line bg-stone-50 px-3 py-2.5 text-sm text-stone-600"
          />
        </label>
        <Link
          href="/profile/update"
          className="mt-4 block rounded-lg bg-brand py-2.5 text-center font-semibold text-white shadow-md shadow-green-900/20 hover:bg-brand-dark"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}