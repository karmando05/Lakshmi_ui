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
