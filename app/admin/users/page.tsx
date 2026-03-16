"use client";

import { AdminPage } from "../../../components/admin/AdminPage";
import { UserRoleBadge, UserStatusBadge } from "../../../components/admin/Badges";
import { mockAdminUsers } from "../../../lib/data/mock/admin-users";

export default function AdminUsersPage() {
  const totalUsers = mockAdminUsers.length;
  const totalStudents = mockAdminUsers.filter((user) => user.role === "student").length;
  const totalAdmins = mockAdminUsers.filter((user) => user.role === "admin").length;

  return (
    <AdminPage title="Users">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Total users" value={String(totalUsers)} />
          <SummaryCard label="Total students" value={String(totalStudents)} />
          <SummaryCard label="Total admins" value={String(totalAdmins)} />
        </section>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Enrolled Courses</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAdminUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">{user.name}</td>
                  <td className="px-3 py-3 text-slate-600">{user.email}</td>
                  <td className="px-3 py-3"><UserRoleBadge role={user.role} /></td>
                  <td className="px-3 py-3 text-slate-600">{user.enrolledCoursesCount}</td>
                  <td className="px-3 py-3"><UserStatusBadge status={user.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
