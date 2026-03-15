import { CourseGrid } from "../../components/CourseGrid";
import { getCoursesPageData } from "../../lib/services/coursesService";

export default async function CoursesPage() {
  const { courses } = await getCoursesPageData();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">All Courses</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Explore practical trainings designed to help your business grow faster.
        </p>
        <div className="mt-8">
          <CourseGrid courses={courses} />
        </div>
      </div>
    </section>
  );
}
