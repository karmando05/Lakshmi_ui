"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../components/providers/AuthProvider";
import { MOCK_USERS } from "../../lib/data/mock/users";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, role, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValidLogin = login(email, password);

    if (!isValidLogin) {
      setErrorMessage("Invalid email or password");
      return;
    }

    setErrorMessage("");

    const matchedUser = MOCK_USERS.find((user) => user.email === email.trim().toLowerCase());

    if (matchedUser?.role === "admin") {
      router.push("/admin");
      return;
    }

    router.push("/dashboard");
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

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          {errorMessage && <p className="text-sm font-medium text-rose-600">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Login
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
