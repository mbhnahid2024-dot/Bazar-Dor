
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ERRORS: Record<string, string> = {
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই সাইন আপ করা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে আগেই সাইন আপ করা হয়েছে।",
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ভুল।",
  INVALID_EMAIL: "সঠিক ইমেইল দিন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
};

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

export default function AuthForm({
  mode,
}: {
  mode: "sign-in" | "sign-up";
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const raw = sp.get("callbackUrl") ?? "/";
  const callbackUrl =
    raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [loading, setLoading] = useState(false);
  const isUp = mode === "sign-up";

  useEffect(() => {
    if (sp.get("reason") === "protected") {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।", {
        id: "protected",
      });
    }
  }, [sp]);

  const fail = (code?: string) =>
    toast.error(
      (code && ERRORS[code]) ||
        "দুঃখিত, কিছু ভুল হয়েছে। আবার চেষ্টা করুন।"
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");

    if (isUp && !name) return void toast.error("নাম লিখুন।");
    if (!email) return void toast.error("ইমেইল লিখুন।");

    if (password.length < 8) {
      return void toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"
      );
    }

    if (isUp && password !== f.get("confirm")) {
      return void toast.error("পাসওয়ার্ড দুটি মিলছে না।");
    }

    setLoading(true);

    try {
      if (isUp) {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (error) return fail(error.code);

        toast.success("সাইন আপ সফল হয়েছে! এবার সাইন ইন করুন।");
        router.push("/sign-in");
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) return fail(error.code);

        toast.success("সফলভাবে সাইন ইন হয়েছে।");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      fail();
    } finally {
      setLoading(false);
    }
  }

  async function social(provider: "google" | "github") {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      });

      if (error) {
        setLoading(false);
        fail(error.code);
      }
    } catch {
      setLoading(false);
      fail();
    }
  }

  const input =
    "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-brand";

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-bold">
        {isUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
      </h1>

      <p className="mt-2 text-center text-sm text-stone-600">
        {isUp
          ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-card p-6">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {isUp && (
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                নাম
              </span>
              <input
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                className={input}
                autoComplete="name"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              ইমেইল
            </span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className={input}
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড
            </span>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className={input}
              autoComplete={isUp ? "new-password" : "current-password"}
            />
          </label>

          {isUp && (
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                পাসওয়ার্ড নিশ্চিত করুন
              </span>
              <input
                name="confirm"
                type="password"
                placeholder="আবার লিখুন"
                className={input}
                autoComplete="new-password"
              />
            </label>
          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-brand py-2.5 font-semibold text-white shadow-md shadow-green-900/20 hover:bg-brand-dark disabled:opacity-60"
          >
            {loading
              ? "অপেক্ষা করুন..."
              : isUp
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-stone-500">
          <span className="h-px flex-1 bg-line" />
          অথবা
          <span className="h-px flex-1 bg-line" />
        </div>

        {/* Mobile responsive Google and GitHub buttons */}
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            disabled={loading}
            onClick={() => social("google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2 text-sm font-medium hover:bg-stone-50 disabled:opacity-60"
          >
            <span className="font-bold text-[#4285F4]">G</span>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            disabled={loading}
            onClick={() => social("github")}
            className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2 text-sm font-medium hover:bg-stone-50 disabled:opacity-60"
          >
            <GithubIcon />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-sm">
          {isUp ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link
            href={isUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-brand hover:underline"
          >
            {isUp ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-stone-500">
        <Link href="/" className="hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
