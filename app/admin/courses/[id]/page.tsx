"use client";

import { useParams } from "next/navigation";
import { CourseEditor } from "../../../../components/admin/CourseEditor";
import { useAdminCoursesStore } from "../../../../lib/data/mock/admin-courses-store";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const { getCourseById, isReady } = useAdminCoursesStore();
  const course = getCourseById(params.id);

  if (!isReady) {
    return <p className="text-sm text-slate-500">Loading course...</p>;
  }

  if (!course) {
    return <p className="text-sm text-rose-600">Course not found.</p>;
  }

  return <CourseEditor course={course} />;
}
