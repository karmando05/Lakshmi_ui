const benefits = [
  {
    icon: "⚡",
    title: "Learn fast",
    description: "Short lessons designed for busy entrepreneurs.",
  },
  {
    icon: "🧰",
    title: "Practical content",
    description: "Apply what you learn immediately.",
  },
  {
    icon: "📈",
    title: "Grow your business",
    description: "Turn followers into paying customers.",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="benefits-heading" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Why CourseLab
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Everything is built to help you move from guessing to growing, one practical step at a
          time.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-indigo-100/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-2xl" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
