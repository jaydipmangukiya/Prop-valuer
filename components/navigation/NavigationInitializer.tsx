"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setNavigate } from "@/lib/navigation";

export default function NavigationInitializer() {
  const router = useRouter();

  useEffect(() => {
    setNavigate((path: string, options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    });
  }, [router]);

  return null;
}
