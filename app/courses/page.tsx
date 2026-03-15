import { CourseGrid } from "@/components/CourseGrid";
import type { Course } from "@/components/CourseCard";

const courses: Course[] = [
  {
    title: "Marketing for Entrepreneurs",
    description:
      "Learn how to attract customers and sell using Instagram and WhatsApp.",
    price: "$499",
    slug: "marketing-for-entrepreneurs",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Entrepreneur working on marketing strategy",
  },
  {
    title: "Instagram Content That Sells",
    description: "Build a content system that turns views into sales consistently.",
    price: "$399",
    slug: "instagram-content-that-sells",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner creating instagram content",
  },
  {
    title: "WhatsApp Sales for Small Businesses",
    description: "Learn practical scripts to close sales through WhatsApp chats.",
    price: "$299",
    slug: "whatsapp-sales-for-small-businesses",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Woman entrepreneur using whatsapp for business",
  },
];

export default function CoursesPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">All Courses</h1>
        <div className="mt-8">
          <CourseGrid courses={courses} />
        </div>
      </div>
    </section>
  );
}
