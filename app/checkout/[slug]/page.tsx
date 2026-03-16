import { notFound } from "next/navigation";
import { CheckoutForm } from "../../../components/checkout/CheckoutForm";
import { getCourseDetailPageData } from "../../../lib/services/coursesService";

type CheckoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const { course } = await getCourseDetailPageData(slug);

  if (!course) {
    notFound();
  }

  return <CheckoutForm course={course} />;
}
