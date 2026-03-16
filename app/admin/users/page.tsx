import { RoleBadge, SummaryCard, UserStatusBadge } from "../../../components/admin/admin-ui";
import { mockAdminUsers } from "../../../lib/data/mock/admin-users";

export default function AdminUsersPage() {
  const totalUsers = mockAdminUsers.length;
  const totalStudents = mockAdminUsers.filter((user) => user.role === "student").length;
  const totalAdmins = mockAdminUsers.filter((user) => user.role === "admin").length;

  return (
    <section className="space-y-6">
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
            {mockAdminUsers.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3">{user.enrolledCoursesCount}</td>
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
