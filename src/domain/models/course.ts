export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  duration: string;
  lessonsCount: number;
  thumbnailUrl: string;
  instructorName: string;
}
