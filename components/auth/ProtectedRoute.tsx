"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "../providers/AuthProvider";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: "admin";
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isReady, role } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (requiredRole === "admin" && role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, requiredRole, role, router]);

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole === "admin" && role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
