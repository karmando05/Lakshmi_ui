import Link from "next/link";

export type Course = {
  title: string;
  description: string;
  price: string;
  slug: string;
  image: string;
  imageAlt: string;
};

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg">
      <div className="aspect-video w-full bg-slate-100">
        <img src={course.image} alt={course.imageAlt} className="h-full w-full object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
        <p className="mt-4 text-lg font-semibold text-indigo-700">{course.price}</p>

        <Link
          href={`/courses/${course.slug}`}
          className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Course
        </Link>
      </div>
    </article>
  );
}
