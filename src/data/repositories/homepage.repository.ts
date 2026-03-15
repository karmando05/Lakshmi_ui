import { mockFeaturedCourses, mockTestimonials } from "../mocks/homepage.mock";
import type { HomePageData } from "../../features/home/types/home-page-data";

export interface HomePageRepository {
  getHomePageData(): Promise<HomePageData>;
}

export class MockHomePageRepository implements HomePageRepository {
  async getHomePageData(): Promise<HomePageData> {
    // Simulates network/API latency so loading states can be tested.
    await new Promise((resolve) => setTimeout(resolve, 50));

    return {
      featuredCourses: mockFeaturedCourses,
      testimonials: mockTestimonials,
    };
  }
}
