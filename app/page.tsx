"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.replace("/auth/sign-in");
  }

  return <main>Home</main>;
}
