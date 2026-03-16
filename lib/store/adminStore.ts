"use client";

import { useEffect, useMemo, useState } from "react";
import { mockAdminCourses } from "../data/mock/admin-courses";
import type { AdminCourse } from "../types/admin";

const ADMIN_COURSES_STORAGE_KEY = "admin-courses-v1";

function parseCourses(value: string | null): AdminCourse[] | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as AdminCourse[];

    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function useAdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>(mockAdminCourses);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restored = parseCourses(window.localStorage.getItem(ADMIN_COURSES_STORAGE_KEY));
    if (restored) {
      setCourses(restored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(ADMIN_COURSES_STORAGE_KEY, JSON.stringify(courses));
  }, [courses, ready]);

  const actions = useMemo(
    () => ({
      createCourse: (course: AdminCourse) => {
        setCourses((prev) => [course, ...prev]);
      },
      updateCourse: (courseId: string, updates: AdminCourse) => {
        setCourses((prev) => prev.map((course) => (course.id === courseId ? updates : course)));
      },
      getCourseById: (courseId: string) => courses.find((course) => course.id === courseId),
    }),
    [courses],
  );

  return {
    courses,
    ready,
    ...actions,
  };
}
