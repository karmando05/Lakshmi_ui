"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getUserEnrollments } from "../../lib/commerce/mock-purchase-store";
import { mockCourses } from "../../lib/data/mock/courses";
import { useAuth } from "../providers/AuthProvider";

export function MyCoursesPanel() {
  const { currentUser } = useAuth();

  const purchasedCourses = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    const persistedEnrollments = getUserEnrollments(currentUser.id).map((enrollment) => enrollment.courseId);
    const allCourseIds = new Set([...(currentUser.enrolledCourseIds ?? []), ...persistedEnrollments]);

    return [...allCourseIds]
      .map((courseId) => mockCourses.find((course) => course.slug === courseId))
      .filter((course): course is (typeof mockCourses)[number] => Boolean(course));
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">My Courses</h2>
        <Link href="/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Browse all courses
        </Link>
      </div>

      {purchasedCourses.length === 0 ? (
        <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
          <p className="text-sm text-slate-600">You have not purchased any courses yet.</p>
          <p className="mt-2 text-sm text-slate-600">Complete checkout on any course to unlock instant access here.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {purchasedCourses.map((course) => (
            <article key={course.slug} className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">{course.title}</p>
              <p className="mt-1 text-xs text-slate-500">By {course.instructorName}</p>
              <p className="mt-2 text-sm text-slate-600">{course.shortDescription}</p>
              <Link
                href={`/learn/${course.slug}`}
                className="mt-4 inline-flex rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Start learning
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
