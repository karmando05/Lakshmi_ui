"use client";

import Link from "next/link";
import { AdminPage } from "../../components/admin/AdminPage";
import { CourseStatusBadge } from "../../components/admin/Badges";
import { mockAdminCourses } from "../../lib/data/mock/admin-courses";
import { mockSalesData } from "../../lib/data/mock/sales";
import { mockAdminUsers } from "../../lib/data/mock/admin-users";

export default function AdminDashboardPage() {
  const totalRevenue = mockSalesData.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <AdminPage title="Dashboard">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Total courses" value={String(mockAdminCourses.length)} />
          <SummaryCard
            label="Total students"
            value={String(mockAdminUsers.filter((user) => user.role === "student").length)}
          />
          <SummaryCard label="Total sales" value={String(mockSalesData.length)} />
          <SummaryCard label="Total revenue" value={`$${totalRevenue.toLocaleString()}`} />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-slate-900">Recent courses</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="px-2 py-2">Title</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {mockAdminCourses.slice(0, 5).map((course) => (
                  <tr key={course.id} className="border-b border-slate-100">
                    <td className="px-2 py-3 font-medium text-slate-800">{course.title}</td>
                    <td className="px-2 py-3"><CourseStatusBadge status={course.status} /></td>
                    <td className="px-2 py-3 text-slate-600">${course.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/admin/courses/new" className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white">Create Course</Link>
            <Link href="/admin/sales" className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">View Sales</Link>
            <Link href="/admin/users" className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">View Users</Link>
          </div>
        </section>
      </div>
    </AdminPage>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </article>
  );
}
