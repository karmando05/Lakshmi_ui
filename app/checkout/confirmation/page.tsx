"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getMostRecentOrderForUser, getOrderById } from "../../../lib/commerce/mock-purchase-store";
import { mockCourses } from "../../../lib/data/mock/courses";
import { useAuth } from "../../../components/providers/AuthProvider";

export default function CheckoutConfirmationPage() {
  const params = useSearchParams();
  const { currentUser, isAuthenticated, isReady } = useAuth();
  const orderId = params.get("orderId");

  const order = useMemo(() => {
    if (!isAuthenticated || !currentUser) {
      return null;
    }

    if (orderId) {
      return getOrderById(orderId);
    }

    return getMostRecentOrderForUser(currentUser.id);
  }, [currentUser, isAuthenticated, orderId]);

  const purchasedCourse = useMemo(
    () => mockCourses.find((course) => course.slug === order?.courseId) ?? null,
    [order?.courseId],
  );

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">Please sign in to view your purchase confirmation.</p>
          <Link href="/login" className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">No completed order found</h1>
          <p className="mt-3 text-sm text-slate-600">Try purchasing a course to see your confirmation details here.</p>
          <Link href="/courses" className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Browse Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="text-sm font-semibold uppercase tracking-wide">Payment successful</p>
          <h1 className="mt-2 text-3xl font-bold">Thank you for your purchase!</h1>
          <p className="mt-2 text-sm">Your order is confirmed and your course is now available in My Courses.</p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Order number</dt>
              <dd className="font-medium text-slate-900">{order.id}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Purchase date</dt>
              <dd className="font-medium text-slate-900">{new Date(order.createdAt).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Course</dt>
              <dd className="font-medium text-slate-900">{order.courseTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Amount paid</dt>
              <dd className="font-medium text-slate-900">${order.amount.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Buyer email</dt>
              <dd className="font-medium text-slate-900">{order.userEmail}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Status</dt>
              <dd>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {order.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard" className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Go to My Courses
          </Link>
          {purchasedCourse && (
            <Link
              href={`/courses/${purchasedCourse.slug}`}
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Start Learning
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
