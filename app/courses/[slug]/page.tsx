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
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="grid gap-8 py-16 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="relative aspect-video w-full bg-slate-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">
                ▶
              </div>
              <p className="text-base font-medium">{course.previewVideoTitle}</p>
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Course</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{course.title}</h1>
          <p className="mt-3 text-sm font-medium text-slate-500">Instructor: {course.instructorName}</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">{course.shortDescription}</p>
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-3xl font-bold text-slate-900">{course.price}</p>
            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Buy Course
            </button>
          </div>
        </aside>
      </section>

      <section className="py-16">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">About this course</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{course.about}</p>
      </section>

      <CourseCurriculum modules={course.curriculum} />
    </div>
  );
}
