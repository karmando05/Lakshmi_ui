import { Benefits } from "../components/Benefits";
import { CourseGrid } from "../components/CourseGrid";
import { Hero } from "../components/Hero";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { getHomePageData } from "../lib/services/homeService";

export default async function HomePage() {
  const { featuredCourses, testimonials } = await getHomePageData();

  return (
    <>
      <Hero />
      <Benefits />

      <section aria-labelledby="featured-courses" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="featured-courses" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Featured Courses
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Pick one course and start implementing today with easy, practical lessons.
          </p>
          <div className="mt-8">
            <CourseGrid courses={featuredCourses} />
          </div>
        </div>
      </section>
      <section aria-labelledby="testimonials" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="testimonials" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Testimonials
          </h2>
          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </section>
    </>
  );
}
