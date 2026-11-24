"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        toast.success("সফলভাবে সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
      }}
      className="flex items-center gap-2 rounded-lg border border-up px-4 py-2 text-sm text-up hover:bg-red-50"
    >
      <LogOut className="h-4 w-4" /> সাইন আউট
    </button>
  );
}