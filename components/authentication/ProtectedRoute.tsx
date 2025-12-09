"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./UserProvider";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const ctx = useContext(UserContext);

  const token = ctx?.token ?? null;
  const initializing = ctx?.initializing ?? true;

  useEffect(() => {
    if (!initializing && !token) {
      router.replace("/login");
    }
  }, [initializing, token, router]);

  if (initializing) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
      </div>
    );
  }

  return <>{children}</>;
}
