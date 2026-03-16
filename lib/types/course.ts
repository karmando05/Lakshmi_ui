export type CourseModule = {
  title: string;
  lessons: string[];
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
};
