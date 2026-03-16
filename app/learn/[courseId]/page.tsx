"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "../../../components/auth/ProtectedRoute";
import { useAuth } from "../../../components/providers/AuthProvider";
import { getUserEnrollments } from "../../../lib/commerce/mock-purchase-store";
import { mockCourses } from "../../../lib/data/mock/courses";

type LearnCoursePageProps = {
  params: {
    courseId: string;
  };
};

type LessonItem = {
  id: string;
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
  title: string;
  description: string;
  videoUrl: string;
  resourceUrl: string | null;
};

type PersistedProgress = {
  completedLessonIds: string[];
  currentLessonId: string;
};

function progressStorageKey(userId: string, courseId: string): string {
  return `courselab_learning_progress_${userId}_${courseId}`;
}

function buildLessonData(courseId: string, curriculum: (typeof mockCourses)[number]["curriculum"]): LessonItem[] {
  return curriculum.flatMap((module, moduleIndex) =>
    module.lessons.map((lessonTitle, lessonIndex) => {
      const lessonId = `${moduleIndex + 1}-${lessonIndex + 1}`;
      const hasDownload = lessonIndex % 2 === 0;

      return {
        id: lessonId,
        moduleTitle: module.title,
        moduleIndex,
        lessonIndex,
        title: lessonTitle,
        description:
          "In this lesson, you will learn practical steps you can apply immediately to improve your results. Watch the full class and complete the action checklist before moving on.",
        videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?start=${(moduleIndex + lessonIndex) * 12}`,
        resourceUrl: hasDownload
          ? `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?course=${courseId}&lesson=${lessonId}`
          : null,
      };
    }),
  );
}

export default function LearnCoursePage({ params }: LearnCoursePageProps) {
  const { courseId } = params;
  const router = useRouter();
  const { currentUser, isReady } = useAuth();

  const course = useMemo(() => mockCourses.find((candidate) => candidate.slug === courseId) ?? null, [courseId]);
  const lessonItems = useMemo(() => (course ? buildLessonData(course.slug, course.curriculum) : []), [course]);

  const [currentLessonId, setCurrentLessonId] = useState<string>(lessonItems[0]?.id ?? "");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

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
      setCurrentLessonId(lessonItems[0]?.id ?? "");
      setCompletedLessonIds([]);
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
      setCurrentLessonId(lessonItems[0]?.id ?? "");
      setCompletedLessonIds([]);
      localStorage.removeItem(key);
    }
  }, [course, currentUser, isReady, lessonItems, router]);

  useEffect(() => {
    if (!isReady || !currentUser || !course || !currentLessonId) {
      return;
    }

    const key = progressStorageKey(currentUser.id, course.slug);
    const payload: PersistedProgress = {
      completedLessonIds,
      currentLessonId,
    };

    localStorage.setItem(key, JSON.stringify(payload));
  }, [completedLessonIds, course, currentLessonId, currentUser, isReady]);

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">Course not found</h1>
          <p className="mt-2 text-sm text-slate-600">The course you are trying to open does not exist.</p>
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

  const currentIndex = lessonItems.findIndex((lesson) => lesson.id === currentLessonId);
  const activeLesson = lessonItems[currentIndex] ?? lessonItems[0];
  const previousLesson = currentIndex > 0 ? lessonItems[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessonItems.length - 1 ? lessonItems[currentIndex + 1] : null;
  const totalLessons = lessonItems.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const isCurrentCompleted = completedLessonIds.includes(activeLesson.id);

  function jumpToLesson(nextLessonId: string): void {
    setCurrentLessonId(nextLessonId);
  }

  function markCurrentAsCompleted(): void {
    if (completedLessonIds.includes(activeLesson.id)) {
      return;
    }

    setCompletedLessonIds((existing) => [...existing, activeLesson.id]);
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
            <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {completedCount} of {totalLessons} lessons completed
          </p>
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
                onChange={(event) => jumpToLesson(event.target.value)}
              >
                {lessonItems.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.moduleTitle} — {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 hidden max-h-[70vh] space-y-5 overflow-y-auto pr-1 lg:block">
              {course.curriculum.map((module, moduleIndex) => (
                <section key={module.title}>
                  <h3 className="text-sm font-semibold text-slate-900">{module.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {module.lessons.map((lessonTitle, lessonIndex) => {
                      const lesson = lessonItems.find(
                        (candidate) => candidate.moduleIndex === moduleIndex && candidate.lessonIndex === lessonIndex,
                      );

                      if (!lesson) {
                        return null;
                      }

                      const isCurrent = lesson.id === activeLesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <li key={`${module.title}-${lessonTitle}`}>
                          <button
                            type="button"
                            className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                              isCurrent
                                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                            }`}
                            onClick={() => jumpToLesson(lesson.id)}
                          >
                            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px]">
                              {isCompleted ? "✓" : lesson.lessonIndex + 1}
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
            <p className="text-sm font-semibold text-indigo-600">{activeLesson.moduleTitle}</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
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

            {activeLesson.resourceUrl ? (
              <a
                href={activeLesson.resourceUrl}
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
                onClick={() => previousLesson && jumpToLesson(previousLesson.id)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous Lesson
              </button>
              <button
                type="button"
                disabled={!nextLesson}
                onClick={() => nextLesson && jumpToLesson(nextLesson.id)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next Lesson
              </button>
              <button
                type="button"
                onClick={markCurrentAsCompleted}
                disabled={isCurrentCompleted}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {isCurrentCompleted ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
