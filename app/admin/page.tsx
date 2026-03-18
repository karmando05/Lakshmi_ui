"use client";

import Link from "next/link";
import { useAdminCoursesStore } from "../../lib/data/mock/admin-courses-store";
import { SummaryCard, CourseStatusBadge } from "../../components/admin/admin-ui";

export default function AdminDashboardPage() {
  const { courses } = useAdminCoursesStore();
  const totalCourses = courses.length;
  const totalStudents = 1248;
  const totalSales = 432;
  const totalRevenue = courses.reduce((acc, course) => acc + course.price, 0) * 10;
  const recentCourses = [...courses].slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Courses" value={String(totalCourses)} />
        <SummaryCard label="Total Students" value={String(totalStudents)} />
        <SummaryCard label="Total Sales" value={String(totalSales)} />
        <SummaryCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Recent Courses</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-2">Title</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.map((course) => (
                  <tr key={course.id} className="border-t border-slate-100">
                    <td className="py-3 font-medium">{course.title}</td>
                    <td className="py-3">
                      <CourseStatusBadge status={course.status} />
                    </td>
                    <td className="py-3">${course.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <Link href="/admin/courses/new" className="block rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white">
              Create Course
            </Link>
            <Link href="/admin/sales" className="block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              View Sales
            </Link>
            <Link href="/admin/users" className="block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              View Users
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
