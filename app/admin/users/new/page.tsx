"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { mockCourses } from "../../../../lib/data/mock/courses";
import {
  createMockUser,
  generateMockUserId,
  getInitialsAvatar,
  isEmailTaken,
} from "../../../../lib/users/mock-user-store";
import { type MockUser, type MockUserRole, type MockUserStatus } from "../../../../lib/data/mock/users";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: MockUserRole | "";
  status: MockUserStatus | "";
  avatar: string;
  jobTitle: string;
  companyName: string;
  phone: string;
  notes: string;
  enrolledCourseIds: string[];
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM: FormValues = {
  name: "",
  email: "",
  password: "",
  role: "student",
  status: "active",
  avatar: "",
  jobTitle: "",
  companyName: "",
  phone: "",
  notes: "",
  enrolledCourseIds: [],
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const email = values.email.trim();

  if (!values.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email";
  } else if (isEmailTaken(email)) {
    errors.email = "Email already exists";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.role) {
    errors.role = "Role is required";
  }

  if (!values.status) {
    errors.status = "Status is required";
  }

  return errors;
}

export default function CreateAdminUserPage() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const avatarPreview = useMemo(
    () => values.avatar.trim() || getInitialsAvatar(values.name),
    [values.avatar, values.name],
  );

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleCourse(slug: string) {
    setValues((current) => {
      const isSelected = current.enrolledCourseIds.includes(slug);
      return {
        ...current,
        enrolledCourseIds: isSelected
          ? current.enrolledCourseIds.filter((id) => id !== slug)
          : [...current.enrolledCourseIds, slug],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const nextUser: MockUser = {
      id: generateMockUserId(),
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      role: values.role as MockUserRole,
      status: values.status as MockUserStatus,
      avatar: values.avatar.trim() || getInitialsAvatar(values.name),
      jobTitle: values.jobTitle.trim() || undefined,
      companyName: values.companyName.trim() || undefined,
      phone: values.phone.trim() || undefined,
      notes: values.notes.trim() || undefined,
      enrolledCourseIds: values.enrolledCourseIds,
      createdAt: new Date().toISOString(),
    };

    createMockUser(nextUser);
    router.push("/admin/users?created=1");
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Create New User</h2>
        <p className="mt-1 text-sm text-slate-500">Add a new student or admin user to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Basic Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Full name *</span>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
                placeholder="Jane Doe"
              />
              {errors.name ? <p className="text-xs text-rose-600">{errors.name}</p> : null}
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Avatar URL</span>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.avatar}
                onChange={(event) => updateValue("avatar", event.target.value)}
                placeholder="https://..."
              />
            </label>
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Avatar preview</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                {avatarPreview.startsWith("http") ? "IMG" : avatarPreview}
              </div>
            </div>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Job title</span>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.jobTitle}
                onChange={(event) => updateValue("jobTitle", event.target.value)}
                placeholder="Operations Manager"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Company name</span>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.companyName}
                onChange={(event) => updateValue("companyName", event.target.value)}
                placeholder="Acme Inc."
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
                placeholder="+1 555 987 1234"
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Notes</span>
              <textarea
                className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.notes}
                onChange={(event) => updateValue("notes", event.target.value)}
                placeholder="Optional internal notes"
              />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Account Access</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Email *</span>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.email}
                onChange={(event) => updateValue("email", event.target.value)}
                placeholder="name@example.com"
              />
              {errors.email ? <p className="text-xs text-rose-600">{errors.email}</p> : null}
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Password *</span>
              <div className="flex rounded-lg border border-slate-300 focus-within:ring focus-within:ring-indigo-200">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-l-lg px-3 py-2 text-sm outline-none"
                  value={values.password}
                  onChange={(event) => updateValue("password", event.target.value)}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="rounded-r-lg border-l border-slate-300 px-3 text-xs font-semibold text-slate-600"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? <p className="text-xs text-rose-600">{errors.password}</p> : null}
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Role *</span>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.role}
                onChange={(event) => updateValue("role", event.target.value as FormValues["role"])}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role ? <p className="text-xs text-rose-600">{errors.role}</p> : null}
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Status *</span>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                value={values.status}
                onChange={(event) => updateValue("status", event.target.value as FormValues["status"])}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status ? <p className="text-xs text-rose-600">{errors.status}</p> : null}
            </label>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Optional Course Access</h3>
          <div className="grid gap-3 rounded-lg border border-slate-200 p-4 sm:grid-cols-2">
            {mockCourses.map((course) => (
              <label key={course.slug} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600"
                  checked={values.enrolledCourseIds.includes(course.slug)}
                  onChange={() => toggleCourse(course.slug)}
                />
                <span>{course.title}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
          <Link
            href="/admin/users"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Create User
          </button>
        </section>
      </form>
    </section>
  );
}
