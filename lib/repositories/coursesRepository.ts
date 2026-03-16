import { mockCourseDetails, mockCourses } from "../data/mock/courses";
import type { Course, CourseDetail } from "../types/course";

export type CoursesRepository = {
  getAllCourses: () => Promise<Course[]>;
  getCourseBySlug: (slug: string) => Promise<CourseDetail | null>;
};

export const mockCoursesRepository: CoursesRepository = {
  async getAllCourses() {
    return mockCourses;
  },
  async getCourseBySlug(slug) {
    return mockCourseDetails.find((course) => course.slug === slug) ?? null;
  },
};
