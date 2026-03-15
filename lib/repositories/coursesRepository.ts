import { mockCourses } from "../data/mock/courses";
import type { Course } from "../types/course";

export type CoursesRepository = {
  getAllCourses: () => Promise<Course[]>;
};

export const mockCoursesRepository: CoursesRepository = {
  async getAllCourses() {
    return mockCourses;
  },
};
