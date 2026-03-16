import { mockCourses } from "../data/mock/courses";
import type { Course } from "../types/course";

export type CoursesRepository = {
  getAllCourses: () => Promise<Course[]>;
  getCourseBySlug: (slug: string) => Promise<Course | null>;
};

export const mockCoursesRepository: CoursesRepository = {
  async getAllCourses() {
    return mockCourses;
  },
  async getCourseBySlug(slug: string) {
    return mockCourses.find((course) => course.slug === slug) ?? null;
  },
};
