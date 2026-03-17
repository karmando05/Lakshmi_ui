"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers/AuthProvider";

const navigationItems = [
  { href: "/courses", label: "Courses" },
  { href: "/#benefits-heading", label: "Benefits" },
  { href: "/#testimonials", label: "Stories" },
];

export function Header() {
  const router = useRouter();
  const { currentUser, isAuthenticated, role, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          CourseLab
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
            >
              Login
            </Link>
          )}

          {isAuthenticated && role === "student" && (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-600"
              >
                My Courses
              </Link>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                {currentUser?.avatar ?? currentUser?.name.slice(0, 2)}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <Link
                href="/admin"
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-600"
              >
                Admin
              </Link>
              <div className="flex h-9 items-center justify-center rounded-full bg-indigo-100 px-3 text-sm font-semibold text-indigo-700">
                {currentUser?.name}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          )}

          <Link
            href="/courses"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
