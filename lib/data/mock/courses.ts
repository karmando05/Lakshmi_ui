import type { Course } from "../../types/course";

export const mockCourses: Course[] = [
  {
    title: "Marketing for Entrepreneurs",
    description:
      "Learn how to attract customers and sell using Instagram and WhatsApp.",
    price: "$499",
    slug: "marketing-for-entrepreneurs",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Entrepreneur planning a marketing strategy",
  },
  {
    title: "Instagram Content That Sells",
    description: "Create content that builds trust and converts followers into buyers.",
    price: "$399",
    slug: "instagram-content-that-sells",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business owner creating social media content",
  },
  {
    title: "WhatsApp Sales for Small Businesses",
    description: "Use simple conversation scripts to close more sales every week.",
    price: "$299",
    slug: "whatsapp-sales-for-small-businesses",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner chatting with customers",
  },
];
