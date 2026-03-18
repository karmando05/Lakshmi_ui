export type MockUserRole = "student" | "admin";
export type MockUserStatus = "active" | "inactive";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: MockUserRole;
  status: MockUserStatus;
  avatar?: string;
  jobTitle?: string;
  companyName?: string;
  phone?: string;
  notes?: string;
  enrolledCourseIds: string[];
  createdAt: string;
};

export const MOCK_USERS: MockUser[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    status: "active",
    avatar: "AU",
    enrolledCourseIds: [],
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: "student-1",
    name: "Alison Parker",
    email: "alison@example.com",
    password: "password123",
    role: "student",
    status: "active",
    avatar: "AP",
    jobTitle: "Freelance Marketer",
    companyName: "Parker Studio",
    enrolledCourseIds: ["marketing-for-entrepreneurs", "instagram-content-that-sells"],
    createdAt: "2025-01-12T08:30:00.000Z",
  },
  {
    id: "student-2",
    name: "Noah Gray",
    email: "noah@example.com",
    password: "password123",
    role: "student",
    status: "inactive",
    avatar: "NG",
    enrolledCourseIds: ["whatsapp-sales-for-small-businesses"],
    createdAt: "2025-01-15T14:45:00.000Z",
  },
  {
    id: "student-3",
    name: "Priya Singh",
    email: "priya@example.com",
    password: "password123",
    role: "student",
    status: "active",
    avatar: "PS",
    companyName: "Singh Boutique",
    enrolledCourseIds: ["marketing-for-entrepreneurs", "whatsapp-sales-for-small-businesses"],
    createdAt: "2025-01-20T09:15:00.000Z",
  },
];
