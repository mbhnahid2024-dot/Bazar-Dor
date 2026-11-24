import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">লোড হচ্ছে...</p>}>
      <AuthForm mode="sign-in" />
    </Suspense>
  );
}