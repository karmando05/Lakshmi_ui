"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useAuth } from "../../components/providers/AuthProvider";
import { getAllMockUsers, createMockUser, generateMockUserId, isEmailTaken } from "../../lib/users/mock-user-store";


export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const { isAuthenticated, role, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (role === "admin") {
      router.replace("/admin");
      return;
    }

    if (nextPath) {
      router.replace(nextPath);
      return;
    }

    router.replace("/dashboard");
  }, [isAuthenticated, nextPath, role, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    const isValidLogin = login(email, password);

    if (!isValidLogin) {
      setErrorMessage("Invalid email or password");
      return;
    }

    const matchedUser = getAllMockUsers().find((user) => user.email === email.trim().toLowerCase());

    if (matchedUser?.role === "admin") {
      router.push("/admin");
      return;
    }

    if (nextPath) {
      router.push(nextPath);
      return;
    }

    router.push("/dashboard");
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      setErrorMessage("Name is required");
      return;
    }

    if (!normalizedEmail || !password || !confirmPassword) {
      setErrorMessage("Email, password and confirm password are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    if (isEmailTaken(normalizedEmail)) {
      setErrorMessage("Email is already taken");
      return;
    }

    createMockUser({
      id: generateMockUserId(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "student",
      status: "active",
      enrolledCourseIds: [],
      createdAt: new Date().toISOString(),
    });

    const loggedIn = login(normalizedEmail, password);

    if (!loggedIn) {
      setErrorMessage("Registration failed: Unable to log in");
      return;
    }

    setSuccessMessage("Account successfully created. Redirecting...");
    setErrorMessage("");

    const target = nextPath || "/dashboard";

    setTimeout(() => {
      router.push(target);
    }, 900);
  }

  function autofillCredentials(nextEmail: string, nextPassword: string) {
    setEmail(nextEmail);
    setPassword(nextPassword);
    setErrorMessage("");
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with one of the mock users or your entered mock credentials.
        </p>

        <form className="mt-6 space-y-4" onSubmit={isRegistering ? handleRegister : handleSubmit}>
          {isRegistering && (
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
              placeholder="Enter password"
              required
            />
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          {errorMessage && <p className="text-sm font-medium text-rose-600">{errorMessage}</p>}
          {successMessage && <p className="text-sm font-medium text-emerald-600">{successMessage}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            {isRegistering ? "Create account" : "Login"}
          </button>

          <button
            type="button"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setIsRegistering((prev) => !prev);
              setErrorMessage("");
              setSuccessMessage("");
              setName("");
              setConfirmPassword("");
            }}
          >
            {isRegistering ? "Back to Login" : "Create new student account"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Quick access</h2>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="font-medium text-slate-900">Student Demo</p>
              <p>alison@example.com / password123</p>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => autofillCredentials("alison@example.com", "password123")}
              >
                Login as Student
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
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
