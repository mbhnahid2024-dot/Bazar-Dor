"use client";
import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/utils";

export default function BanglaDate({ className = "" }: { className?: string }) {
  const [d, setD] = useState("");
  useEffect(() => setD(banglaDate()), []);
  return (
    <span className={className} suppressHydrationWarning>
      {d || "\u00A0"}
    </span>
  );
}