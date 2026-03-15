import { HomePageView } from "../src/features/home/components/home-page-view";
import { getHomePageData } from "../src/features/home/services/get-home-page-data";

export default async function HomePage() {
  const data = await getHomePageData();

  return <HomePageView data={data} />;
}
