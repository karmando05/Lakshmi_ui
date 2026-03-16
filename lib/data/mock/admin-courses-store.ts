"use client";

import { useEffect, useState } from "react";
import { mockAdminCourses } from "./admin-courses";
import { type AdminCourse } from "../../types/admin";

const STORAGE_KEY = "admin-courses-v1";

export function useAdminCoursesStore() {
  const [courses, setCourses] = useState<AdminCourse[]>(mockAdminCourses);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCourses = window.localStorage.getItem(STORAGE_KEY);

    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses) as AdminCourse[]);
      } catch {
        setCourses(mockAdminCourses);
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses, isReady]);

  function saveCourse(nextCourse: AdminCourse) {
    setCourses((prevCourses) => {
      const courseExists = prevCourses.some((course) => course.id === nextCourse.id);

      if (!courseExists) {
        return [{ ...nextCourse, updatedAt: new Date().toISOString().slice(0, 10) }, ...prevCourses];
      }

      return prevCourses.map((course) =>
        course.id === nextCourse.id
          ? { ...nextCourse, updatedAt: new Date().toISOString().slice(0, 10) }
          : course,
      );
    });
  }

  function getCourseById(id: string): AdminCourse | undefined {
    return courses.find((course) => course.id === id);
  }

  return {
    courses,
    isReady,
    saveCourse,
    getCourseById,
  };
}
