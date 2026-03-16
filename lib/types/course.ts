export type CourseLessonModule = {
  title: string;
  lessons: string[];
};

export type Course = {
  title: string;
  description: string;
  price: string;
  slug: string;
  image: string;
  imageAlt: string;
};

export type CourseDetail = Course & {
  instructorName: string;
  shortDescription: string;
  about: string;
  previewLabel: string;
  curriculum: CourseLessonModule[];
};
