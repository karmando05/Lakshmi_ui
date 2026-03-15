import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100/70 via-sky-50 to-white"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
          New this month
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Learn marketing and sales for your business
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          Practical courses designed for entrepreneurs who want more customers.
        </p>
        <Link
          href="/courses"
          className="mt-10 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Courses
        </Link>
      </div>
    </section>
  );
}
