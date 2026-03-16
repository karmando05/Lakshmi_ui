"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { useAuth } from "../providers/AuthProvider";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/users", label: "Users" },
];

const pageTitleMap: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/courses": "Courses",
  "/admin/courses/new": "Create Course",
  "/admin/sales": "Sales",
  "/admin/users": "Users",
};

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/courses/") && pathname !== "/admin/courses/new") {
    return "Edit Course";
  }

  return pageTitleMap[pathname] ?? "Admin";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/sign-in");
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex w-full max-w-[1400px]">
          <aside
            className={`fixed inset-y-0 left-0 z-20 w-64 border-r border-slate-200 bg-white p-5 transition-transform md:static md:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Lakshmi</p>
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {isSidebarOpen ? (
            <button
              className="fixed inset-0 z-10 bg-slate-900/40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          ) : null}

          <main className="w-full flex-1 md:ml-0">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 md:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  ☰
                </button>
                <h1 className="text-lg font-semibold sm:text-2xl">{getPageTitle(pathname)}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">{currentUser?.name ?? "Admin"}</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {currentUser?.avatar ?? "AD"}
                </span>
                <button
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            </header>
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
