"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "../../../components/auth/ProtectedRoute";
import { useAuth } from "../../../components/providers/AuthProvider";
import { getUserEnrollments } from "../../../lib/commerce/mock-purchase-store";
import { mockCourses } from "../../../lib/data/mock/courses";

type PersistedProgress = {
  completedLessonIds: string[];
  currentLessonId: string;
};

function progressStorageKey(userId: string, courseId: string): string {
  return `courselab_learning_progress_${userId}_${courseId}`;
}

export default function LearnCoursePage() {
  const params = useParams<{ courseId: string }>();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";
  const router = useRouter();
  const { currentUser, isReady } = useAuth();

  const course = useMemo(() => mockCourses.find((candidate) => candidate.slug === courseId) ?? null, [courseId]);
  const modules = useMemo(() => course?.learningModules ?? [], [course]);
  const lessonItems = useMemo(() => modules.flatMap((module) => module.lessons), [modules]);

  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (!lessonItems.length) {
      setCurrentLessonId("");
      return;
    }

    setCurrentLessonId((existing) => {
      if (existing && lessonItems.some((lesson) => lesson.id === existing)) {
        return existing;
      }

      return lessonItems[0].id;
 });
  }, [lessonItems]);

  useEffect(() => {
    if (!isReady || !currentUser || !course) {
      return;
    }

    const enrolledFromStore = getUserEnrollments(currentUser.id).map((enrollment) => enrollment.courseId);
    const enrolledCourseIds = new Set([...(currentUser.enrolledCourseIds ?? []), ...enrolledFromStore]);

    if (!enrolledCourseIds.has(course.slug)) {
      router.replace(`/checkout/${course.slug}`);
      return;
    }

    const key = progressStorageKey(currentUser.id, course.slug);
    const rawProgress = localStorage.getItem(key);

    if (!rawProgress) {
      setCompletedLessonIds([]);
      if (lessonItems[0]) {
          setCurrentLessonId(lessonItems[0].id);
      }
      return;
    }

    try {
      const parsed = JSON.parse(rawProgress) as PersistedProgress;
      const validLessonIds = new Set(lessonItems.map((lesson) => lesson.id));
      const nextCurrentLessonId = validLessonIds.has(parsed.currentLessonId)
        ? parsed.currentLessonId
        : lessonItems[0]?.id ?? "";
      const nextCompleted = (parsed.completedLessonIds ?? []).filter((lessonId) => validLessonIds.has(lessonId));

      setCurrentLessonId(nextCurrentLessonId);
      setCompletedLessonIds(nextCompleted);
    } catch {
      setCompletedLessonIds([]);
      if (lessonItems[0]) {
          setCurrentLessonId(lessonItems[0].id);
      }
      localStorage.removeItem(key);
    }
  }, [course, currentUser, isReady, lessonItems, router]);

  useEffect(() => {
    if (!isReady || !currentUser || !course || !currentLessonId) {
      return;
    }

    const key = progressStorageKey(currentUser.id, course.slug);
    localStorage.setItem(
      key,
      JSON.stringify({
        completedLessonIds,
        currentLessonId,
      } satisfies PersistedProgress),
    );
  }, [completedLessonIds, course, currentLessonId, currentUser, isReady]);

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">Course not found</h1>
          <p className="mt-2 text-sm text-slate-600">We could not find this course in mock data.</p>
          <Link
            href="/courses"
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Explore courses
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  if (!lessonItems.length) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">No lessons available yet</h1>
          <p className="mt-2 text-sm text-slate-600">This course does not have learning lessons configured.</p>
        </div>
      </ProtectedRoute>
    );
  }

  const currentIndex = lessonItems.findIndex((lesson) => lesson.id === currentLessonId);
  const activeLesson = lessonItems[currentIndex] ?? lessonItems[0];
  const previousLesson = currentIndex > 0 ? lessonItems[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessonItems.length - 1 ? lessonItems[currentIndex + 1] : null;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessonItems.length) * 100);

  function markCurrentAsCompleted(): void {
    if (completedLessonIds.includes(activeLesson.id)) {
      return;
    }

    setCompletedLessonIds((previous) => [...previous, activeLesson.id]);
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Now learning</p>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{course.title}</h1>
            </div>
            <p className="text-sm font-semibold text-slate-600">{progressPercent}% complete</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px,1fr] lg:items-start">
          <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-lg font-semibold text-slate-900">Course curriculum</h2>

            <div className="mt-4 lg:hidden">
              <label htmlFor="lesson-picker" className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Jump to lesson
              </label>
              <select
                id="lesson-picker"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                value={activeLesson.id}
                onChange={(event) => setCurrentLessonId(event.target.value)}
              >
                {lessonItems.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 hidden max-h-[70vh] space-y-5 overflow-y-auto pr-1 lg:block">
              {modules.map((module) => (
                <section key={module.title}>
                  <h3 className="text-sm font-semibold text-slate-900">{module.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCurrent = lesson.id === activeLesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <li key={`${module.title}-${lesson.id}`}>
                          <button
                            type="button"
                            className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                              isCurrent
                                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                            }`}
                            onClick={() => setCurrentLessonId(lesson.id)}
                          >
                            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px]">
                              {isCompleted ? "✓" : lessonIndex + 1}
                            </span>
                            {lesson.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </aside>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
            <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-slate-900">
              <iframe
                className="h-full w-full"
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{activeLesson.description}</p>

            {activeLesson.resource ? (
              <a
                href={activeLesson.resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download resources (PDF)
              </a>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No downloadable resources for this lesson.</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                disabled={!previousLesson}
                onClick={() => previousLesson && setCurrentLessonId(previousLesson.id)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous Lesson
              </button>
              <button
                type="button"
                disabled={!nextLesson}
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next Lesson
              </button>
              <button
                type="button"
                onClick={markCurrentAsCompleted}
                disabled={completedLessonIds.includes(activeLesson.id)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {completedLessonIds.includes(activeLesson.id) ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
