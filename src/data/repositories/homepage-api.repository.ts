import type { HomePageData } from "../../features/home/types/home-page-data";
import type { HomePageRepository } from "./homepage.repository";

export class ApiHomePageRepository implements HomePageRepository {
  constructor(private readonly baseUrl: string = process.env.API_BASE_URL ?? "") {}

  async getHomePageData(): Promise<HomePageData> {
    const response = await fetch(`${this.baseUrl}/homepage`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Next.js cache strategy can be tuned later.
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to load homepage data from API");
    }

    return (await response.json()) as HomePageData;
  }
}
