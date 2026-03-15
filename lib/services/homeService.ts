import type { HomeRepository } from "../repositories/homeRepository";
import { mockHomeRepository } from "../repositories/homeRepository";

export type HomePageData = {
  featuredCourses: Awaited<ReturnType<HomeRepository["getFeaturedCourses"]>>;
  testimonials: Awaited<ReturnType<HomeRepository["getTestimonials"]>>;
};

export async function getHomePageData(
  repository: HomeRepository = mockHomeRepository,
): Promise<HomePageData> {
  const [featuredCourses, testimonials] = await Promise.all([
    repository.getFeaturedCourses(),
    repository.getTestimonials(),
  ]);

  return {
    featuredCourses,
    testimonials,
  };
}
