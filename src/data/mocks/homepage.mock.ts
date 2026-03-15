import type { Course } from "../../domain/models/course";
import type { Testimonial } from "../../domain/models/testimonial";

export const mockFeaturedCourses: Course[] = [
  {
    id: "course-launch-blueprint",
    title: "Course Launch Blueprint",
    description:
      "Build and launch your first profitable digital course in 30 days.",
    category: "Business",
    level: "Beginner",
    rating: 4.8,
    duration: "6h 45m",
    lessonsCount: 24,
    thumbnailUrl: "/images/courses/launch-blueprint.jpg",
    instructorName: "Lakshmi Nair",
  },
  {
    id: "audience-growth-playbook",
    title: "Audience Growth Playbook",
    description:
      "Practical systems to consistently attract and convert the right learners.",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.7,
    duration: "5h 10m",
    lessonsCount: 18,
    thumbnailUrl: "/images/courses/audience-growth.jpg",
    instructorName: "Lakshmi Nair",
  },
  {
    id: "high-ticket-offers",
    title: "High-Ticket Offer Design",
    description:
      "Package expertise into premium learning experiences people gladly pay for.",
    category: "Strategy",
    level: "Advanced",
    rating: 4.9,
    duration: "4h 30m",
    lessonsCount: 16,
    thumbnailUrl: "/images/courses/high-ticket.jpg",
    instructorName: "Lakshmi Nair",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial-ananya",
    studentName: "Ananya S.",
    studentTitle: "Fitness Coach",
    quote:
      "I launched my first signature program in 5 weeks and enrolled 42 students.",
    avatarUrl: "/images/testimonials/ananya.jpg",
    courseId: "course-launch-blueprint",
  },
  {
    id: "testimonial-ravi",
    studentName: "Ravi K.",
    studentTitle: "Career Mentor",
    quote:
      "The positioning framework helped me double my conversion rate from webinars.",
    avatarUrl: "/images/testimonials/ravi.jpg",
    courseId: "audience-growth-playbook",
  },
  {
    id: "testimonial-mira",
    studentName: "Mira P.",
    studentTitle: "Nutrition Consultant",
    quote:
      "Clear, actionable lessons. I now sell a premium cohort program every month.",
    avatarUrl: "/images/testimonials/mira.jpg",
    courseId: "high-ticket-offers",
  },
];
