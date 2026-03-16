import type { CoursesRepository } from "../repositories/coursesRepository";
import { mockCoursesRepository } from "../repositories/coursesRepository";

export async function getCoursesPageData(
  repository: CoursesRepository = mockCoursesRepository,
) {
  const courses = await repository.getAllCourses();

  return {
    courses,
  };
}

export async function getCourseDetailPageData(
  slug: string,
  repository: CoursesRepository = mockCoursesRepository,
) {
  const course = await repository.getCourseBySlug(slug);

  return {
    course,
  };
}
