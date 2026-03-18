import { type CourseStatus, type OrderStatus, type UserRole, type UserStatus } from "../../lib/types/admin";

type BadgeProps = {
  children: string;
  className: string;
};

function Badge({ children, className }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const style = {
    draft: "bg-amber-100 text-amber-700",
    published: "bg-emerald-100 text-emerald-700",
    archived: "bg-slate-200 text-slate-700",
  };

  return <Badge className={style[status]}>{status}</Badge>;
}

export function SalesStatusBadge({ status }: { status: OrderStatus }) {
  const style = {
    paid: "bg-emerald-100 text-emerald-700",
    refunded: "bg-rose-100 text-rose-700",
    pending: "bg-amber-100 text-amber-700",
  };

  return <Badge className={style[status]}>{status}</Badge>;
}

export function RoleBadge({ role }: { role: UserRole }) {
  const style = {
    student: "bg-indigo-100 text-indigo-700",
    admin: "bg-fuchsia-100 text-fuchsia-700",
  };

  return <Badge className={style[role]}>{role}</Badge>;
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const style = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-200 text-slate-700",
  };

  return <Badge className={style[status]}>{status}</Badge>;
}

export function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}
