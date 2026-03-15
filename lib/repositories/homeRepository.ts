import { mockCourses } from "../data/mock/courses";
import { mockTestimonials } from "../data/mock/testimonials";
import type { Course } from "../types/course";
import type { Testimonial } from "../types/testimonial";

export type HomeRepository = {
  getFeaturedCourses: () => Promise<Course[]>;
  getTestimonials: () => Promise<Testimonial[]>;
};

export const mockHomeRepository: HomeRepository = {
  async getFeaturedCourses() {
    return mockCourses;
  },
  async getTestimonials() {
    return mockTestimonials;
  },
};
