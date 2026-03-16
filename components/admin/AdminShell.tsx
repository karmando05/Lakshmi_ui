"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAuth } from "../providers/AuthProvider";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/users", label: "Users" },
];

type AdminShellProps = {
  title: string;
  children: ReactNode;
};

export function AdminShell({ title, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1400px]">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white p-5 shadow-lg transition-transform md:static md:translate-x-0 md:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <p className="text-lg font-semibold text-slate-900">Admin Panel</p>
            <button
              className="rounded px-2 py-1 text-sm text-slate-500 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col md:ml-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  className="rounded border border-slate-200 px-2 py-1 text-sm text-slate-600 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  Menu
                </button>
                <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-slate-800">{currentUser?.name ?? "Admin"}</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {currentUser?.avatar ?? "AD"}
                </div>
                <button
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          <div className="flex-1 p-4 sm:p-6">{children}</div>
        </div>
      </div>

      {sidebarOpen ? (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-slate-900/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
