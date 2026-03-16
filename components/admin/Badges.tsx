import type { CourseStatus, OrderStatus, UserRole, UserStatus } from "../../lib/types/admin";

function badgeClass(color: string) {
  return `inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${color}`;
}

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const className =
    status === "published"
      ? badgeClass("bg-emerald-100 text-emerald-700")
      : status === "draft"
        ? badgeClass("bg-amber-100 text-amber-700")
        : badgeClass("bg-slate-200 text-slate-700");

  return <span className={className}>{status}</span>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const className =
    status === "paid"
      ? badgeClass("bg-emerald-100 text-emerald-700")
      : status === "pending"
        ? badgeClass("bg-amber-100 text-amber-700")
        : badgeClass("bg-rose-100 text-rose-700");

  return <span className={className}>{status}</span>;
}

export function UserRoleBadge({ role }: { role: UserRole }) {
  const className =
    role === "admin"
      ? badgeClass("bg-indigo-100 text-indigo-700")
      : badgeClass("bg-sky-100 text-sky-700");

  return <span className={className}>{role}</span>;
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const className =
    status === "active"
      ? badgeClass("bg-emerald-100 text-emerald-700")
      : badgeClass("bg-slate-200 text-slate-700");

  return <span className={className}>{status}</span>;
}
