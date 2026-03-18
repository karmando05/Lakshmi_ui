import type { Course, CourseLearningModule } from "../../types/course";

function buildLearningModules(courseSlug: string, modules: Course["curriculum"]): CourseLearningModule[] {
  return modules.map((module, moduleIndex) => ({
    title: module.title,
    lessons: module.lessons.map((lessonTitle, lessonIndex) => {
      const lessonId = `${moduleIndex + 1}-${lessonIndex + 1}`;
      const hasResource = lessonIndex % 2 === 0;

      return {
        id: lessonId,
        title: lessonTitle,
        description:
          "In this lesson, you will learn practical and actionable steps to apply immediately in your business. Complete the checklist before moving to the next class.",
        videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?start=${(moduleIndex + lessonIndex) * 12}`,
        resource: hasResource
          ? {
              type: "pdf",
              label: `${lessonTitle} worksheet`,
              url: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?course=${courseSlug}&lesson=${lessonId}`,
            }
          : undefined,
      };
    }),
  }));
}
export const mockCourses: Course[] = [
  {
    title: "Marketing for Entrepreneurs",
    shortDescription:
      "Learn how to attract customers and sell using Instagram and WhatsApp.",
    about:
      "This course gives non-technical entrepreneurs a practical marketing roadmap. You will learn how to define your message, publish content that builds trust, and turn conversations into sales using simple systems you can apply right away.",
    instructorName: "Alison Meneses",
    price: "$499",
    slug: "marketing-for-entrepreneurs",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Entrepreneur planning a marketing strategy",
    previewVideoTitle: "Course preview video",
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
    learningModules: buildLearningModules("marketing-for-entrepreneurs", [
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
    ]),
  },
  {
    title: "Instagram Content That Sells",
    shortDescription: "Create content that builds trust and converts followers into buyers.",
    about:
      "Build a simple and repeatable content process for Instagram without feeling overwhelmed. You will map your content pillars, write better hooks, and create posts that move people from followers to paying customers.",
    instructorName: "Daniela Costa",
    price: "$399",
    slug: "instagram-content-that-sells",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business owner creating social media content",
    previewVideoTitle: "Instagram course preview",
    curriculum: [
      {
        title: "Module 1 – Content Strategy",
        lessons: ["Choosing your content pillars", "Planning one month in one hour"],
      },
      {
        title: "Module 2 – Reels and Posts",
        lessons: ["Hooks that stop the scroll", "Call-to-actions that invite action"],
      },
      {
        title: "Module 3 – Conversion",
        lessons: ["Turning DMs into leads", "Content audit checklist"],
      },
    ],
    learningModules: buildLearningModules("instagram-content-that-sells", [
      {
        title: "Module 1 – Content Strategy",
        lessons: ["Choosing your content pillars", "Planning one month in one hour"],
      },
      {
        title: "Module 2 – Reels and Posts",
        lessons: ["Hooks that stop the scroll", "Call-to-actions that invite action"],
      },
      {
        title: "Module 3 – Conversion",
        lessons: ["Turning DMs into leads", "Content audit checklist"],
      },
    ]),
  },
  {
    title: "WhatsApp Sales for Small Businesses",
    shortDescription: "Use simple conversation scripts to close more sales every week.",
    about:
      "Master clear and empathetic sales conversations in WhatsApp. This course helps you handle objections, follow up confidently, and close more deals while keeping your communication human and professional.",
    instructorName: "Marina Oliveira",
    price: "$299",
    slug: "whatsapp-sales-for-small-businesses",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Small business owner chatting with customers",
    previewVideoTitle: "WhatsApp sales preview",
    curriculum: [
      {
        title: "Module 1 – Sales Foundations",
        lessons: ["The sales conversation structure", "Qualifying leads quickly"],
      },
      {
        title: "Module 2 – Message Templates",
        lessons: ["Opening messages that feel natural", "Handling common objections"],
      },
      {
        title: "Module 3 – Closing and Follow-up",
        lessons: ["How to ask for the sale", "Follow-up without sounding pushy"],
      },
    ],
    learningModules: buildLearningModules("whatsapp-sales-for-small-businesses", [
      {
        title: "Module 1 – Sales Foundations",
        lessons: ["The sales conversation structure", "Qualifying leads quickly"],
      },
      {
        title: "Module 2 – Message Templates",
        lessons: ["Opening messages that feel natural", "Handling common objections"],
      },
      {
        title: "Module 3 – Closing and Follow-up",
        lessons: ["How to ask for the sale", "Follow-up without sounding pushy"],
      },
    ]),
  },
];
