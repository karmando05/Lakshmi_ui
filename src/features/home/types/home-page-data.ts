import type { Course } from "../../../domain/models/course";
import type { Testimonial } from "../../../domain/models/testimonial";

export interface HomePageData {
  featuredCourses: Course[];
  testimonials: Testimonial[];
}
