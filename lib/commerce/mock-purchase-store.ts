import type { AuthenticatedUser } from "../auth/mock-auth";
import type { Course } from "../types/course";

const MOCK_ORDERS_STORAGE_KEY = "courselab_mock_orders";
const MOCK_ENROLLMENTS_STORAGE_KEY = "courselab_mock_enrollments";

export type MockOrderStatus = "paid";

export type MockOrder = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  status: MockOrderStatus;
  createdAt: string;
};

export type MockEnrollment = {
  userId: string;
  courseId: string;
  grantedAt: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(storageKey: string): T[] {
  if (!canUseStorage()) {
    return [];
  }

  const rawValue = localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as T[];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function writeJson<T>(storageKey: string, records: T[]): void {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(storageKey, JSON.stringify(records));
}

function courseIdFromCourse(course: Course): string {
  return course.slug;
}

export function getMockOrders(): MockOrder[] {
  return readJson<MockOrder>(MOCK_ORDERS_STORAGE_KEY);
}

export function getMockEnrollments(): MockEnrollment[] {
  return readJson<MockEnrollment>(MOCK_ENROLLMENTS_STORAGE_KEY);
}

export function hasEnrollment(userId: string, courseId: string): boolean {
  return getMockEnrollments().some(
    (enrollment) => enrollment.userId === userId && enrollment.courseId === courseId,
  );
}

export function getUserEnrollments(userId: string): MockEnrollment[] {
  return getMockEnrollments().filter((enrollment) => enrollment.userId === userId);
}

export function getOrderById(orderId: string): MockOrder | null {
  return getMockOrders().find((order) => order.id === orderId) ?? null;
}

export function getMostRecentOrderForUser(userId: string): MockOrder | null {
  const userOrders = getMockOrders()
    .filter((order) => order.userId === userId)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

  return userOrders[0] ?? null;
}

export function createMockOrderForCourse(user: AuthenticatedUser, course: Course): MockOrder {
  const newOrder: MockOrder = {
    id: `ord_${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    courseId: courseIdFromCourse(course),
    courseTitle: course.title,
    amount: parsePriceToAmount(course.price),
    status: "paid",
    createdAt: new Date().toISOString(),
  };

  const existingOrders = getMockOrders();
  writeJson<MockOrder>(MOCK_ORDERS_STORAGE_KEY, [newOrder, ...existingOrders]);

  const existingEnrollments = getMockEnrollments();
  const alreadyEnrolled = existingEnrollments.some(
    (enrollment) => enrollment.userId === newOrder.userId && enrollment.courseId === newOrder.courseId,
  );

  if (!alreadyEnrolled) {
    const nextEnrollment: MockEnrollment = {
      userId: newOrder.userId,
      courseId: newOrder.courseId,
      grantedAt: newOrder.createdAt,
    };

    writeJson<MockEnrollment>(MOCK_ENROLLMENTS_STORAGE_KEY, [nextEnrollment, ...existingEnrollments]);
  }

  return newOrder;
}

function parsePriceToAmount(price: string): number {
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return numeric;
}
