import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Learn marketing and sales for your business
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Practical courses designed for entrepreneurs who want more customers.
        </p>
        <Link
          href="/courses"
          className="mt-10 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Courses
        </Link>
      </div>
    </section>
  );
}
