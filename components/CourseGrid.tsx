import { CourseCard } from "../components/CourseCard";
import type { Course } from "../lib/types/course";

type CourseGridProps = {
  courses: Course[];
};

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
