"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type AdminCourse, type CourseModule, type CourseStatus, type Lesson, type LessonType } from "../../lib/types/admin";
import { useAdminCoursesStore } from "../../lib/data/mock/admin-courses-store";
import { CourseStatusBadge } from "./admin-ui";

type CourseEditorProps = {
  course?: AdminCourse;
};

const lessonTypes: LessonType[] = ["video", "text", "resource"];
const statuses: CourseStatus[] = ["draft", "published", "archived"];

function createNewLesson(order: number): Lesson {
  const id = `lesson-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    id,
    title: "New Lesson",
    type: "video",
    videoUrl: "",
    resourceUrl: "",
    description: "",
    order,
    isPreview: false,
  };
}

function createNewModule(order: number): CourseModule {
  const id = `module-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    id,
    title: "New Module",
    order,
    lessons: [],
  };
}

export function CourseEditor({ course }: CourseEditorProps) {
  const router = useRouter();
  const generatedCourseId = useId().replace(/:/g, "");
  const { saveCourse } = useAdminCoursesStore();
  const isEditing = Boolean(course);

  const [formData, setFormData] = useState<AdminCourse>(
    course ?? {
      id: `course-${generatedCourseId}`,
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
      modules: [createNewModule(1)],
      updatedAt: new Date().toISOString().slice(0, 10),
    },
  );

  const [expandedModules, setExpandedModules] = useState<string[]>(() => formData.modules.map((module) => module.id));

  const publicationState = useMemo(() => <CourseStatusBadge status={formData.status} />, [formData.status]);

  function updateField<K extends keyof AdminCourse>(field: K, value: AdminCourse[K]) {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
  }

  function updateModule(moduleId: string, updater: (module: CourseModule) => CourseModule) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      modules: prevFormData.modules.map((module) => (module.id === moduleId ? updater(module) : module)),
    }));
  }

  function addModule() {
    setFormData((prevFormData) => ({
      ...prevFormData,
      modules: [...prevFormData.modules, createNewModule(prevFormData.modules.length + 1)],
    }));
  }

  function removeModule(moduleId: string) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      modules: prevFormData.modules.filter((module) => module.id !== moduleId),
    }));
  }

  function addLesson(moduleId: string) {
    updateModule(moduleId, (module) => ({
      ...module,
      lessons: [...module.lessons, createNewLesson(module.lessons.length + 1)],
    }));
  }

  function removeLesson(moduleId: string, lessonId: string) {
    updateModule(moduleId, (module) => ({
      ...module,
      lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
    }));
  }

  function updateLesson(moduleId: string, lessonId: string, updater: (lesson: Lesson) => Lesson) {
    updateModule(moduleId, (module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? updater(lesson) : lesson)),
    }));
  }

  function handleSubmit(nextStatus?: CourseStatus) {
    saveCourse({ ...formData, status: nextStatus ?? formData.status });
    router.push("/admin/courses");
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEditing ? "Edit Course" : "Create Course"}</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Current status:</span>
            {publicationState}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">Title<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.title} onChange={(e) => updateField("title", e.target.value)} /></label>
          <label className="text-sm">Slug<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.slug} onChange={(e) => updateField("slug", e.target.value)} /></label>
          <label className="text-sm sm:col-span-2">Short Description<textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} /></label>
          <label className="text-sm sm:col-span-2">Full Description<textarea rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.description} onChange={(e) => updateField("description", e.target.value)} /></label>
          <label className="text-sm">Instructor Name<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.instructor} onChange={(e) => updateField("instructor", e.target.value)} /></label>
          <label className="text-sm">Price<input type="number" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.price} onChange={(e) => updateField("price", Number(e.target.value))} /></label>
          <label className="text-sm">Thumbnail URL<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.thumbnail} onChange={(e) => updateField("thumbnail", e.target.value)} /></label>
          <label className="text-sm">Category<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.category} onChange={(e) => updateField("category", e.target.value)} /></label>
          <label className="text-sm">Estimated Duration<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.estimatedDuration} onChange={(e) => updateField("estimatedDuration", e.target.value)} /></label>
          <label className="text-sm">Status<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.status} onChange={(e) => updateField("status", e.target.value as CourseStatus)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label className="text-sm">Preview Video URL<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={formData.previewVideoUrl} onChange={(e) => updateField("previewVideoUrl", e.target.value)} /></label>
          <label className="mt-7 inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={formData.featured} onChange={(e) => updateField("featured", e.target.checked)} />Featured course</label>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Curriculum Builder</h3>
          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" onClick={addModule}>Add Module</button>
        </div>

        <div className="space-y-4">
          {formData.modules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <article key={module.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button className="rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => setExpandedModules((prev) => prev.includes(module.id) ? prev.filter((id) => id !== module.id) : [...prev, module.id])}>{isExpanded ? "−" : "+"}</button>
                  <input className="min-w-[180px] flex-1 rounded border border-slate-300 px-2 py-1 text-sm" value={module.title} onChange={(e) => updateModule(module.id, (prev) => ({ ...prev, title: e.target.value }))} />
                  <label className="text-xs">Order <input type="number" className="ml-1 w-14 rounded border border-slate-300 px-1 py-1" value={module.order} onChange={(e) => updateModule(module.id, (prev) => ({ ...prev, order: Number(e.target.value) }))} /></label>
                  <span className="text-xs text-slate-500">{module.lessons.length} lessons</span>
                  <button className="rounded border border-slate-300 px-2 py-1 text-xs" onClick={() => addLesson(module.id)}>Add Lesson</button>
                  <button className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-600" onClick={() => removeModule(module.id)}>Remove Module</button>
                </div>

                {isExpanded ? (
                  <div className="mt-4 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="grid gap-2 rounded border border-slate-200 p-3 sm:grid-cols-2">
                        <input className="rounded border border-slate-300 px-2 py-1 text-sm" placeholder="Lesson title" value={lesson.title} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, title: e.target.value }))} />
                        <select className="rounded border border-slate-300 px-2 py-1 text-sm" value={lesson.type} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, type: e.target.value as LessonType }))}>{lessonTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
                        <input className="rounded border border-slate-300 px-2 py-1 text-sm" placeholder="Video URL" value={lesson.videoUrl} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, videoUrl: e.target.value }))} />
                        <input className="rounded border border-slate-300 px-2 py-1 text-sm" placeholder="PDF / Resource URL" value={lesson.resourceUrl} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, resourceUrl: e.target.value }))} />
                        <textarea className="rounded border border-slate-300 px-2 py-1 text-sm sm:col-span-2" placeholder="Lesson description" value={lesson.description} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, description: e.target.value }))} />
                        <label className="text-xs">Order <input type="number" className="ml-1 w-14 rounded border border-slate-300 px-1 py-1" value={lesson.order} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, order: Number(e.target.value) }))} /></label>
                        <label className="inline-flex items-center gap-2 text-xs"><input type="checkbox" checked={lesson.isPreview} onChange={(e) => updateLesson(module.id, lesson.id, (prev) => ({ ...prev, isPreview: e.target.checked }))} />Preview</label>
                        <button className="justify-self-start rounded border border-rose-300 px-2 py-1 text-xs text-rose-600" onClick={() => removeLesson(module.id, lesson.id)}>Remove Lesson</button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg border border-slate-300 px-4 py-2 font-medium" onClick={() => handleSubmit()}>Save Course</button>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white" onClick={() => handleSubmit("published")}>Publish Course</button>
      </div>
    </section>
  );
}
