"use client";

import { type ReactNode } from "react";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AdminShell } from "./AdminShell";

export function AdminPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminShell title={title}>{children}</AdminShell>
    </ProtectedRoute>
  );
}
