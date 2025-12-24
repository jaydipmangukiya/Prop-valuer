"use client";

import { ProtectedRoute } from "@/components/authentication/ProtectedRoute";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
