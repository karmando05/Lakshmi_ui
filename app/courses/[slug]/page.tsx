import { notFound } from "next/navigation";

import { CourseCurriculum } from "../../../components/CourseCurriculum";
import { getCourseDetailPageData } from "../../../lib/services/coursesService";

type CourseDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = params;
  const { course } = await getCourseDetailPageData(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <div className="flex aspect-video items-center justify-center p-6 text-center">
                <p className="text-base font-medium text-slate-700">{course.previewLabel}</p>
              </div>
            </div>

            <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Course</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{course.title}</h1>
              <p className="mt-3 text-sm text-slate-600">Instructor: {course.instructorName}</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{course.shortDescription}</p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                <p className="text-3xl font-bold text-slate-900">{course.price}</p>
                <button
                  type="button"
                  className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  Buy Course
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-slate-900">About this course</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{course.about}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <CourseCurriculum modules={course.curriculum} />
        </div>
      </section>
    </>
  );
}
