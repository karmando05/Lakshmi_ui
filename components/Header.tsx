import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="w-24">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
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
            className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
