import Image from "next/image";
import Link from "next/link";

import type { Course } from "../lib/types/course";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-indigo-100/50 transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{course.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-semibold text-indigo-700">{course.price}</p>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
}
