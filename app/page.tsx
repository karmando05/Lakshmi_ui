import { Benefits } from "@/components/Benefits";
import { CourseGrid } from "@/components/CourseGrid";
import { Hero } from "@/components/Hero";
import type { Course } from "@/components/CourseCard";

const featuredCourses: Course[] = [
  {
    title: "Marketing for Entrepreneurs",
    description:
      "Learn how to attract customers and sell using Instagram and WhatsApp.",
    price: "$499",
    slug: "marketing-for-entrepreneurs",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Entrepreneur planning a marketing strategy",
  },
  {
    title: "Instagram Content That Sells",
    description: "Create content that builds trust and converts followers into buyers.",
    price: "$399",
    slug: "instagram-content-that-sells",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business owner creating social media content",
  },
  {
    title: "WhatsApp Sales for Small Businesses",
    description: "Use simple conversation scripts to close more sales every week.",
    price: "$299",
    slug: "whatsapp-sales-for-small-businesses",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner chatting with customers",
  },
];

const testimonials = [
  {
    quote: "Thanks to this course I doubled my Instagram sales.",
    name: "Mariana Costa",
  },
  {
    quote: "The lessons are short and practical. I applied everything in one week.",
    name: "Ana Silva",
  },
  {
    quote: "Now I know exactly what to post to attract better customers.",
    name: "Juliana Lopes",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />

      <section aria-labelledby="featured-courses" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="featured-courses" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Featured Courses
          </h2>
          <div className="mt-8">
            <CourseGrid courses={featuredCourses} />
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonials" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="testimonials" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Testimonials
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-xl border border-slate-200 bg-white p-6">
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
        </div>
      </section>
    </>
  );
}
