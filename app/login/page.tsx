"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../components/providers/AuthProvider";

import {
  type SignInFormErrors,
  type SignInFormValues,
  validateSignInForm,
} from "../../lib/auth/sign-in-validation";

type FormTouched = Partial<Record<keyof SignInFormValues, boolean>>;

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, role, login } = useAuth();
  const [formValues, setFormValues] = useState<SignInFormValues>({ email: "", password: "" });
  const [formTouched, setFormTouched] = useState<FormTouched>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formErrors: SignInFormErrors = validateSignInForm(formValues);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (role === "admin") {
      router.replace("/admin");
      return;
    }

    router.replace("/dashboard");
  }, [isAuthenticated, role, router]);

  function markFieldTouched(name: keyof SignInFormValues): void {
    setFormTouched((prevState) => ({ ...prevState, [name]: true }));
  }

  function updateField(name: keyof SignInFormValues, value: string): void {
    setFormValues((prevState) => ({ ...prevState, [name]: value }));

    if (submitError) {
      setSubmitError("");
    }

    if (!formTouched[name] && value.trim().length > 0) {
      markFieldTouched(name);
    }
  }

  function autofillCredentials(email: string, password: string): void {
    setFormValues({ email, password });
    setFormTouched({ email: true, password: true });
    setSubmitError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormTouched({ email: true, password: true });
    setSubmitError("");

    if (formErrors.email || formErrors.password) {
      return;
    }

    setIsSubmitting(true);
    const authenticatedUser = login(formValues.email, formValues.password);
    setIsSubmitting(false);

    if (!authenticatedUser) {
      setSubmitError("Invalid email or password");
      return;
    }

    if (authenticatedUser.role === "admin") {
      router.push("/admin");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Access your courses and continue learning.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formValues.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => markFieldTouched("email")}
              aria-invalid={Boolean(formTouched.email && formErrors.email)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring aria-[invalid=true]:border-rose-300 aria-[invalid=true]:ring-rose-200"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {formTouched.email && formErrors.email ? (
              <p className="mt-1 text-sm font-medium text-rose-600">{formErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formValues.password}
              onChange={(event) => updateField("password", event.target.value)}
              onBlur={() => markFieldTouched("password")}
              aria-invalid={Boolean(formTouched.password && formErrors.password)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring aria-[invalid=true]:border-rose-300 aria-[invalid=true]:ring-rose-200"
              placeholder="Enter password"
              disabled={isSubmitting}
            />
            {formTouched.password && formErrors.password ? (
              <p className="mt-1 text-sm font-medium text-rose-600">{formErrors.password}</p>
            ) : null}
          </div>

          {submitError ? <p className="text-sm font-medium text-rose-600">{submitError}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Demo credentials</h2>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="font-medium text-slate-900">Student Demo</p>
              <p>alison@example.com / password123</p>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => autofillCredentials("alison@example.com", "password123")}
              >
                Use Student Demo
              </button>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="font-medium text-slate-900">Admin Demo</p>
              <p>admin@example.com / admin123</p>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => autofillCredentials("admin@example.com", "admin123")}
              >
                Use Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
