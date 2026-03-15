import { ApiHomePageRepository } from "../../../data/repositories/homepage-api.repository";
import {
  MockHomePageRepository,
  type HomePageRepository,
} from "../../../data/repositories/homepage.repository";
import type { HomePageData } from "../types/home-page-data";

function createRepository(): HomePageRepository {
  const useMockData = process.env.USE_MOCK_DATA !== "false";

  return useMockData ? new MockHomePageRepository() : new ApiHomePageRepository();
}

export async function getHomePageData(
  repository: HomePageRepository = createRepository(),
): Promise<HomePageData> {
  return repository.getHomePageData();
}
