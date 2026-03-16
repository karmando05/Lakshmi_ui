import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Admin Console</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Manage platform content, users, and reporting tools from this admin area.
          </p>
        </div>
      </section>
    </ProtectedRoute>
  );
}
