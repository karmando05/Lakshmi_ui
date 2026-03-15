import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-24">
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
            CourseLab
          </Link>
        </div>

        <nav aria-label="Main navigation" className="flex-1 text-center">
          <Link
            href="/courses"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
          >
            Courses
          </Link>
        </nav>

        <div className="w-24 text-right">
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
