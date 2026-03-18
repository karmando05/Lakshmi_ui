"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { RoleBadge, SummaryCard, UserStatusBadge } from "../../../components/admin/admin-ui";
import { getAllMockUsers } from "../../../lib/users/mock-user-store";

export default function AdminUsersPage() {
  const searchParams = useSearchParams();
  const users = useMemo(() => getAllMockUsers(), []);

  const totalUsers = users.length;
  const totalStudents = users.filter((user) => user.role === "student").length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  const hasCreatedBanner = searchParams.get("created") === "1";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">Manage platform users and their access.</p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create User
        </Link>
      </div>

      {hasCreatedBanner ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          User created successfully.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard label="Total Users" value={String(totalUsers)} />
        <SummaryCard label="Total Students" value={String(totalStudents)} />
        <SummaryCard label="Total Admins" value={String(totalAdmins)} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[850px] w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Enrolled Courses</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3">{user.enrolledCourseIds.length}</td>
                <td className="px-4 py-3">
                  <UserStatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
