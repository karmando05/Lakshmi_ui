"use client";

import { useParams, useRouter } from "next/navigation";
import { AdminPage } from "../../../../components/admin/AdminPage";
import { CourseForm } from "../../../../components/admin/CourseForm";
import { useAdminCourses } from "../../../../lib/store/adminStore";
import type { AdminCourse } from "../../../../lib/types/admin";

export default function EditCoursePage() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const { getCourseById, updateCourse, ready } = useAdminCourses();

  const course = getCourseById(params.courseId);

  function handleUpdate(nextCourse: AdminCourse) {
    updateCourse(params.courseId, nextCourse);
    router.push("/admin/courses");
  }

  if (!ready) {
    return <AdminPage title="Edit Course"><p className="text-sm text-slate-500">Loading course...</p></AdminPage>;
  }

  if (!course) {
    return <AdminPage title="Edit Course"><p className="text-sm text-slate-500">Course not found.</p></AdminPage>;
  }

  return (
    <AdminPage title="Edit Course">
      <CourseForm initialCourse={course} onSaveDraft={handleUpdate} onPublish={handleUpdate} />
    </AdminPage>
  );
}
