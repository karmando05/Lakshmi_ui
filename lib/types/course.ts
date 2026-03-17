export type CourseModule = {
  title: string;
  lessons: string[];
};

export type CourseLessonResource = {
  label: string;
  url: string;
  type: "pdf";
};

export type CourseLessonContent = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  resource?: CourseLessonResource;
};

export type CourseLearningModule = {
  title: string;
  lessons: CourseLessonContent[];
};

export type Course = {
  title: string;
  shortDescription: string;
  about: string;
  instructorName: string;
  price: string;
  slug: string;
  image: string;
  imageAlt: string;
  previewVideoTitle: string;
  curriculum: CourseModule[];
  learningModules?: CourseLearningModule[];
};