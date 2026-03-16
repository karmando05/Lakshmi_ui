export type MockUserRole = "student" | "admin";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: MockUserRole;
  avatar: string;
};

export const MOCK_USERS: MockUser[] = [
  {
    id: "student-1",
    name: "Alison Parker",
    email: "alison@example.com",
    password: "password123",
    role: "student",
    avatar: "AP",
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: "AU",
  },
];
