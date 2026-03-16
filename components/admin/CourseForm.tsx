"use client";

import { useMemo, useState } from "react";
import type { AdminCourse, CourseModule, CourseStatus, Lesson, LessonType } from "../../lib/types/admin";

type CourseFormProps = {
  initialCourse?: AdminCourse;
  onSaveDraft: (course: AdminCourse) => void;
  onPublish: (course: AdminCourse) => void;
};

const statuses: CourseStatus[] = ["draft", "published", "archived"];
const lessonTypes: LessonType[] = ["video", "text", "resource"];

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeOrders(modules: CourseModule[]): CourseModule[] {
  return modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((module, moduleIndex) => ({
      ...module,
      order: moduleIndex + 1,
      lessons: module.lessons
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((lesson, lessonIndex) => ({ ...lesson, order: lessonIndex + 1 })),
    }));
}

export function CourseForm({ initialCourse, onSaveDraft, onPublish }: CourseFormProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [course, setCourse] = useState<AdminCourse>(
    initialCourse ?? {
      id: id("course"),
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      instructor: "",
      price: 0,
      thumbnail: "",
      status: "draft",
      category: "",
      estimatedDuration: "",
      featured: false,
      previewVideoUrl: "",
      modules: [],
      updatedAt: new Date().toISOString(),
    },
  );

  const totalLessons = useMemo(
    () => course.modules.reduce((total, module) => total + module.lessons.length, 0),
    [course.modules],
  );

  function updateField<K extends keyof AdminCourse>(field: K, value: AdminCourse[K]) {
    setCourse((prev) => ({ ...prev, [field]: value }));
  }

  function updateModules(modules: CourseModule[]) {
    updateField("modules", normalizeOrders(modules));
  }

  function addModule() {
    const moduleId = id("module");
    updateModules([
      ...course.modules,
      { id: moduleId, title: `New Module ${course.modules.length + 1}`, order: course.modules.length + 1, lessons: [] },
    ]);
    setExpandedModules((prev) => ({ ...prev, [moduleId]: true }));
  }

  function updateModule(moduleId: string, updates: Partial<CourseModule>) {
    updateModules(
      course.modules.map((module) => (module.id === moduleId ? { ...module, ...updates } : module)),
    );
  }

  function removeModule(moduleId: string) {
    updateModules(course.modules.filter((module) => module.id !== moduleId));
  }

  function addLesson(moduleId: string) {
    updateModules(
      course.modules.map((module) => {
        if (module.id !== moduleId) {
          return module;
        }

        const newLesson: Lesson = {
          id: id("lesson"),
          title: "New Lesson",
          type: "video",
          videoUrl: "",
          resourceUrl: "",
          description: "",
          order: module.lessons.length + 1,
          isPreview: false,
        };

        return { ...module, lessons: [...module.lessons, newLesson] };
      }),
    );
  }

  function updateLesson(moduleId: string, lessonId: string, updates: Partial<Lesson>) {
    updateModules(
      course.modules.map((module) => {
        if (module.id !== moduleId) {
          return module;
        }

        return {
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, ...updates } : lesson,
          ),
        };
      }),
    );
  }

  function removeLesson(moduleId: string, lessonId: string) {
    updateModules(
      course.modules.map((module) => {
        if (module.id !== moduleId) {
          return module;
        }

        return {
          ...module,
          lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
        };
      }),
    );
  }

  function submit(saveAsStatus: CourseStatus) {
    const nextCourse: AdminCourse = {
      ...course,
      status: saveAsStatus,
      updatedAt: new Date().toISOString(),
    };

    setCourse(nextCourse);

    if (saveAsStatus === "published") {
      onPublish(nextCourse);
      return;
    }

    onSaveDraft(nextCourse);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Course Details</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input className="rounded border p-2" placeholder="Title" value={course.title} onChange={(e) => updateField("title", e.target.value)} />
          <input className="rounded border p-2" placeholder="Slug" value={course.slug} onChange={(e) => updateField("slug", e.target.value)} />
          <input className="rounded border p-2" placeholder="Instructor name" value={course.instructor} onChange={(e) => updateField("instructor", e.target.value)} />
          <input className="rounded border p-2" placeholder="Category" value={course.category} onChange={(e) => updateField("category", e.target.value)} />
          <input className="rounded border p-2" type="number" min={0} placeholder="Price" value={course.price} onChange={(e) => updateField("price", Number(e.target.value))} />
          <input className="rounded border p-2" placeholder="Estimated duration" value={course.estimatedDuration} onChange={(e) => updateField("estimatedDuration", e.target.value)} />
          <input className="rounded border p-2 md:col-span-2" placeholder="Thumbnail URL" value={course.thumbnail} onChange={(e) => updateField("thumbnail", e.target.value)} />
          <input className="rounded border p-2 md:col-span-2" placeholder="Preview video URL" value={course.previewVideoUrl} onChange={(e) => updateField("previewVideoUrl", e.target.value)} />
          <textarea className="rounded border p-2 md:col-span-2" placeholder="Short description" value={course.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} />
          <textarea className="rounded border p-2 md:col-span-2" rows={4} placeholder="Full description" value={course.description} onChange={(e) => updateField("description", e.target.value)} />
          <label className="text-sm text-slate-600">
            Status
            <select className="mt-1 w-full rounded border p-2" value={course.status} onChange={(e) => updateField("status", e.target.value as CourseStatus)}>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="mt-5 flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={course.featured} onChange={(e) => updateField("featured", e.target.checked)} /> Featured course
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Curriculum Builder</h2>
          <button className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white" onClick={addModule}>Add Module</button>
        </div>
        <p className="mt-2 text-sm text-slate-500">{course.modules.length} modules • {totalLessons} lessons</p>

        <div className="mt-4 space-y-4">
          {course.modules.map((module) => {
            const isExpanded = expandedModules[module.id] ?? true;
            return (
              <div key={module.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button className="rounded border px-2 py-1 text-xs" onClick={() => setExpandedModules((prev) => ({ ...prev, [module.id]: !isExpanded }))}>{isExpanded ? "Collapse" : "Expand"}</button>
                  <input className="flex-1 rounded border p-2" value={module.title} onChange={(e) => updateModule(module.id, { title: e.target.value })} />
                  <label className="text-xs text-slate-500">Order <input className="ml-1 w-16 rounded border p-1" type="number" value={module.order} min={1} onChange={(e) => updateModule(module.id, { order: Number(e.target.value) })} /></label>
                  <span className="text-xs text-slate-500">{module.lessons.length} lessons</span>
                  <button className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-600" onClick={() => removeModule(module.id)}>Remove</button>
                </div>
                {isExpanded ? (
                  <div className="mt-3 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="rounded border border-slate-200 p-3">
                        <div className="grid gap-2 md:grid-cols-2">
                          <input className="rounded border p-2" placeholder="Lesson title" value={lesson.title} onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })} />
                          <select className="rounded border p-2" value={lesson.type} onChange={(e) => updateLesson(module.id, lesson.id, { type: e.target.value as LessonType })}>
                            {lessonTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <input className="rounded border p-2" placeholder="Video URL" value={lesson.videoUrl} onChange={(e) => updateLesson(module.id, lesson.id, { videoUrl: e.target.value })} />
                          <input className="rounded border p-2" placeholder="Downloadable PDF URL" value={lesson.resourceUrl} onChange={(e) => updateLesson(module.id, lesson.id, { resourceUrl: e.target.value })} />
                          <textarea className="rounded border p-2 md:col-span-2" placeholder="Description" value={lesson.description} onChange={(e) => updateLesson(module.id, lesson.id, { description: e.target.value })} />
                          <label className="text-sm text-slate-600">Order <input className="ml-2 w-20 rounded border p-1" type="number" value={lesson.order} min={1} onChange={(e) => updateLesson(module.id, lesson.id, { order: Number(e.target.value) })} /></label>
                          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={lesson.isPreview} onChange={(e) => updateLesson(module.id, lesson.id, { isPreview: e.target.checked })} />Preview lesson</label>
                        </div>
                        <button className="mt-2 rounded border border-rose-300 px-2 py-1 text-xs text-rose-600" onClick={() => removeLesson(module.id, lesson.id)}>Remove Lesson</button>
                      </div>
                    ))}
                    <button className="rounded border border-indigo-300 px-2 py-1 text-sm text-indigo-700" onClick={() => addLesson(module.id)}>Add Lesson</button>
                  </div>
                ) : null}
              </div>
            );
          })}
          {course.modules.length === 0 ? <p className="text-sm text-slate-500">No modules yet. Add your first module.</p> : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => submit("draft")}>Save Course</button>
        <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => submit("published")}>Publish Course</button>
      </div>
    </div>
  );
}
