"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/categories";
import BanglaDate from "@/components/ui/BanglaDate";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  async function logout() {
    setOpen(false);
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-lg">🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <BanglaDate className="block text-xs text-stone-600" />
          </span>
        </Link>

        {isPending ? (
          <div className="h-9 w-28 animate-pulse rounded-lg bg-stone-200" />
        ) : user ? (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-stone-100"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-green-100 font-bold text-brand">
                  {user.name.charAt(0)}
                </span>
              )}
              <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
              <ChevronDown className="h-3.5 w-3.5 text-stone-500" />
            </button>
            {open && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-line bg-white p-4 shadow-lg">
                <p className="font-semibold">{user.name}</p>
                <p className="truncate text-sm text-stone-500">{user.email}</p>
                <Link href="/profile" className="mt-4 flex items-center gap-2 text-sm hover:text-brand">
                  <User className="h-4 w-4" /> আমার প্রোফাইল
                </Link>
                <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm text-up">
                  <LogOut className="h-4 w-4" /> সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-stone-100">
              সাইন ইন
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-md shadow-green-900/20 hover:bg-brand-dark"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav
        aria-label="ক্যাটাগরি"
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto border-t border-line px-4 py-2"
      >
        {CATEGORIES.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                active ? "bg-brand text-white shadow-md shadow-green-900/20" : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              <span>{c.icon}</span> {c.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}