export type CourseStatus = "draft" | "published" | "archived";
export type LessonType = "video" | "text" | "resource";
export type UserRole = "student" | "admin";
export type OrderStatus = "paid" | "refunded" | "pending";
export type UserStatus = "active" | "inactive";

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  videoUrl: string;
  resourceUrl: string;
  description: string;
  order: number;
  isPreview: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  instructor: string;
  price: number;
  thumbnail: string;
  status: CourseStatus;
  category: string;
  estimatedDuration: string;
  featured: boolean;
  previewVideoUrl: string;
  modules: CourseModule[];
  updatedAt: string;
};

export type SalesRecord = {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledCoursesCount: number;
  status: UserStatus;
};
