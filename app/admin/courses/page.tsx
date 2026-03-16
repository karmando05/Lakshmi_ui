"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CourseStatusBadge } from "../../../components/admin/admin-ui";
import { useAdminCoursesStore } from "../../../lib/data/mock/admin-courses-store";

export default function AdminCoursesPage() {
  const { courses } = useAdminCoursesStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true : course.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [courses, query, statusFilter],
  );

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">All Courses</h2>
        <Link href="/admin/courses/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
          Create Course
        </Link>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Course title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Modules</th>
              <th className="px-4 py-3">Lessons</th>
              <th className="px-4 py-3">Last updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => {
              const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);

              return (
                <tr key={course.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{course.title}</td>
                  <td className="px-4 py-3">
                    <CourseStatusBadge status={course.status} />
                  </td>
                  <td className="px-4 py-3">${course.price}</td>
                  <td className="px-4 py-3">{course.modules.length}</td>
                  <td className="px-4 py-3">{totalLessons}</td>
                  <td className="px-4 py-3">{course.updatedAt}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/courses/${course.id}`} className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700">
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
