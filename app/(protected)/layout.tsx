"use client";

import ProtectedRoute from "@/components/authentication/ProtectedRoute";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
