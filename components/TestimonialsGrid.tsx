import type { Testimonial } from "../lib/types/testimonial";

type TestimonialsGridProps = {
  testimonials: Testimonial[];
};

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article
          key={testimonial.name}
          className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-indigo-100/50"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700"
              aria-hidden="true"
            >
              {testimonial.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
          </div>
          <blockquote className="mt-4 text-sm leading-6 text-slate-600">
            “{testimonial.quote}”
          </blockquote>
        </article>
      ))}
    </div>
  );
}
