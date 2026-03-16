import type { AdminUser } from "../../types/admin";

export const mockAdminUsers: AdminUser[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    enrolledCoursesCount: 0,
    status: "active",
  },
  {
    id: "user-2",
    name: "Alison Parker",
    email: "alison@example.com",
    role: "student",
    enrolledCoursesCount: 3,
    status: "active",
  },
  {
    id: "user-3",
    name: "Maya Johnson",
    email: "maya@example.com",
    role: "student",
    enrolledCoursesCount: 1,
    status: "inactive",
  },
  {
    id: "user-4",
    name: "Helena Ruiz",
    email: "helena@example.com",
    role: "student",
    enrolledCoursesCount: 2,
    status: "active",
  },
];
