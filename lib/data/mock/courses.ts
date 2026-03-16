import type { Course, CourseDetail } from "../../types/course";

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

export const mockCourseDetails: CourseDetail[] = [
  {
    title: "Marketing for Entrepreneurs",
    description:
      "Learn how to attract customers and sell using Instagram and WhatsApp.",
    shortDescription:
      "A practical roadmap for non-technical founders to get consistent leads and sales.",
    instructorName: "Alison Meneses",
    price: "$499",
    slug: "marketing-for-entrepreneurs",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Entrepreneur planning a marketing strategy",
    previewLabel: "Course preview video",
    about:
      "This course helps entrepreneurs build a simple and consistent marketing system. You will learn what to post, what to say, and how to guide people from first contact to completed sale using clear and repeatable steps.",
    curriculum: [
      {
        title: "Module 1 – Fundamentals",
        lessons: ["What is marketing", "Finding your ideal customer"],
      },
      {
        title: "Module 2 – Instagram",
        lessons: ["Optimizing your profile", "Content that attracts customers"],
      },
      {
        title: "Module 3 – WhatsApp Sales",
        lessons: ["Conversations that convert", "Closing the sale"],
      },
    ],
  },
  {
    title: "Instagram Content That Sells",
    description: "Create content that builds trust and converts followers into buyers.",
    shortDescription:
      "Build a simple content plan that turns profile views into qualified sales conversations.",
    instructorName: "Paula Oliveira",
    price: "$399",
    slug: "instagram-content-that-sells",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business owner creating social media content",
    previewLabel: "Course preview video",
    about:
      "You will learn how to create easy-to-produce content that positions your offer and builds trust with your audience. Each lesson focuses on practical ideas that can be implemented in less than one hour per day.",
    curriculum: [
      {
        title: "Module 1 – Positioning",
        lessons: ["Choosing your content pillars", "Defining your core message"],
      },
      {
        title: "Module 2 – Content Production",
        lessons: ["Writing better hooks", "Creating conversion-focused reels"],
      },
      {
        title: "Module 3 – Lead Generation",
        lessons: ["Strong call-to-action examples", "Turning comments into leads"],
      },
    ],
  },
  {
    title: "WhatsApp Sales for Small Businesses",
    description: "Use simple conversation scripts to close more sales every week.",
    shortDescription:
      "Use clear scripts and confidence frameworks to close sales without sounding pushy.",
    instructorName: "Carla Ferreira",
    price: "$299",
    slug: "whatsapp-sales-for-small-businesses",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner chatting with customers",
    previewLabel: "Course preview video",
    about:
      "This training gives you practical, easy-to-use WhatsApp conversation frameworks for service businesses. Learn how to qualify leads, answer objections, and ask for the sale naturally.",
    curriculum: [
      {
        title: "Module 1 – Sales Foundations",
        lessons: ["Sales mindset for entrepreneurs", "Handling first contact messages"],
      },
      {
        title: "Module 2 – Objection Handling",
        lessons: ["Responding to price objections", "Increasing perceived value"],
      },
      {
        title: "Module 3 – Closing",
        lessons: ["Asking for the decision", "Simple follow-up cadence"],
      },
    ],
  },
];
