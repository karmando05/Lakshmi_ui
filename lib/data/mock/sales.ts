import type { SalesRecord } from "../../types/admin";

export const mockSalesData: SalesRecord[] = [
  {
    id: "ORD-10241",
    userId: "student-1",
    userName: "Alison Parker",
    courseId: "course-1",
    courseTitle: "Marketing for Entrepreneurs",
    amount: 499,
    status: "paid",
    createdAt: "2026-03-02T08:20:00.000Z",
  },
  {
    id: "ORD-10242",
    userId: "student-2",
    userName: "Maya Johnson",
    courseId: "course-2",
    courseTitle: "WhatsApp Sales Blueprint",
    amount: 299,
    status: "pending",
    createdAt: "2026-03-03T13:40:00.000Z",
  },
  {
    id: "ORD-10243",
    userId: "student-3",
    userName: "Helena Ruiz",
    courseId: "course-1",
    courseTitle: "Marketing for Entrepreneurs",
    amount: 499,
    status: "refunded",
    createdAt: "2026-03-04T17:15:00.000Z",
  },
  {
    id: "ORD-10244",
    userId: "student-4",
    userName: "Priya Desai",
    courseId: "course-3",
    courseTitle: "Content Systems for Busy Founders",
    amount: 399,
    status: "paid",
    createdAt: "2026-03-05T10:05:00.000Z",
  },
];
