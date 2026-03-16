"use client";

import { useRouter } from "next/navigation";
import { AdminPage } from "../../../../components/admin/AdminPage";
import { CourseForm } from "../../../../components/admin/CourseForm";
import { useAdminCourses } from "../../../../lib/store/adminStore";
import type { AdminCourse } from "../../../../lib/types/admin";

export default function NewCoursePage() {
  const router = useRouter();
  const { createCourse } = useAdminCourses();

  function handleSave(course: AdminCourse) {
    createCourse(course);
    router.push("/admin/courses");
  }

  return (
    <AdminPage title="Create Course">
      <CourseForm onSaveDraft={handleSave} onPublish={handleSave} />
    </AdminPage>
  );
}
