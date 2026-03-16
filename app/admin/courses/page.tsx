"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminPage } from "../../../components/admin/AdminPage";
import { CourseStatusBadge } from "../../../components/admin/Badges";
import { useAdminCourses } from "../../../lib/store/adminStore";
import type { CourseStatus } from "../../../lib/types/admin";

const statuses: Array<CourseStatus | "all"> = ["all", "draft", "published", "archived"];

export default function AdminCoursesPage() {
  const { courses, ready } = useAdminCourses();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CourseStatus | "all">("all");

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "all" || course.status === status;
        return matchesQuery && matchesStatus;
      }),
    [courses, query, status],
  );

  return (
    <AdminPage title="Courses">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Course List</h2>
          <Link href="/admin/courses/new" className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white">Create Course</Link>
        </div>

        <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <input
            className="min-w-[220px] flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded border border-slate-300 px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as CourseStatus | "all")}
          >
            {statuses.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Modules</th>
                <th className="px-3 py-3">Lessons</th>
                <th className="px-3 py-3">Last updated</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!ready ? (
                <tr><td className="px-3 py-4 text-slate-500" colSpan={7}>Loading courses...</td></tr>
              ) : filteredCourses.length === 0 ? (
                <tr><td className="px-3 py-4 text-slate-500" colSpan={7}>No courses found.</td></tr>
              ) : (
                filteredCourses.map((course) => {
                  const lessonsCount = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
                  return (
                    <tr key={course.id} className="border-t border-slate-100">
                      <td className="px-3 py-3 font-medium text-slate-800">{course.title}</td>
                      <td className="px-3 py-3"><CourseStatusBadge status={course.status} /></td>
                      <td className="px-3 py-3 text-slate-600">${course.price}</td>
                      <td className="px-3 py-3 text-slate-600">{course.modules.length}</td>
                      <td className="px-3 py-3 text-slate-600">{lessonsCount}</td>
                      <td className="px-3 py-3 text-slate-600">{new Date(course.updatedAt).toLocaleDateString()}</td>
                      <td className="px-3 py-3">
                        <Link href={`/admin/courses/${course.id}`} className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700">Edit</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  );
}
