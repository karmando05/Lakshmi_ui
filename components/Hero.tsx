import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-72 w-[46rem] rounded-full bg-indigo-200/60 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700">
          Built for women entrepreneurs
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Learn marketing and sales that actually grow your business
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Practical, no-fluff courses to help you attract better customers and sell confidently.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/courses"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Courses
          </Link>
          <Link
            href="#benefits-heading"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
          >
            Why CourseLab
          </Link>
        </div>
      </div>
    </section>
  );
}
