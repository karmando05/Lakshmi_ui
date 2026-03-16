import { type SalesRecord } from "../../types/admin";

export const mockSales: SalesRecord[] = [
  {
    id: "ord-1001",
    userId: "student-1",
    userName: "Aarav Patel",
    courseId: "course-1",
    courseTitle: "SaaS Launch Blueprint",
    amount: 149,
    status: "paid",
    createdAt: "2026-03-01",
  },
  {
    id: "ord-1002",
    userId: "student-2",
    userName: "Mia Johnson",
    courseId: "course-2",
    courseTitle: "Analytics for Product Teams",
    amount: 99,
    status: "pending",
    createdAt: "2026-03-02",
  },
  {
    id: "ord-1003",
    userId: "student-3",
    userName: "Ethan Flores",
    courseId: "course-1",
    courseTitle: "SaaS Launch Blueprint",
    amount: 149,
    status: "refunded",
    createdAt: "2026-03-04",
  },
  {
    id: "ord-1004",
    userId: "student-4",
    userName: "Sophia Nguyen",
    courseId: "course-3",
    courseTitle: "Customer Success Playbooks",
    amount: 129,
    status: "paid",
    createdAt: "2026-03-05",
  },
];
