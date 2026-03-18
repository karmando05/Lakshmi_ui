"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { createMockOrderForCourse, hasEnrollment } from "../../lib/commerce/mock-purchase-store";
import type { Course } from "../../lib/types/course";

type CheckoutFormProps = {
  course: Course;
};

type FormErrors = Partial<Record<"fullName" | "email" | "cardName" | "cardNumber" | "expiration" | "cvc", string>>;

export function CheckoutForm({ course }: CheckoutFormProps) {
  const router = useRouter();
  const { currentUser, isAuthenticated, isReady } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amount = useMemo(() => Number.parseFloat(course.price.replace(/[^0-9.]/g, "")) || 0, [course.price]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(`/checkout/${course.slug}`)}`);
      return;
    }

    if (currentUser) {
      setFullName(currentUser.name);
      setEmail(currentUser.email);

      if (hasEnrollment(currentUser.id, course.slug)) {
        router.replace("/dashboard");
      }
    }
  }, [course.slug, currentUser, isAuthenticated, isReady, router]);

  function validateForm(): boolean {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!cardName.trim()) {
      nextErrors.cardName = "Cardholder name is required.";
    }

    const normalizedCard = cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(normalizedCard)) {
      nextErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!expiration.trim()) {
      nextErrors.expiration = "Expiration is required.";
    }

    if (!/^\d{3,4}$/.test(cvc.trim())) {
      nextErrors.cvc = "CVC must be 3 or 4 digits.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!currentUser) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const normalizedCard = cardNumber.replace(/\s+/g, "");

    if (normalizedCard.endsWith("0000")) {
      setSubmitError("Your mock payment was declined. Try any other test card number.");
      return;
    }

    setIsSubmitting(true);

    const delay = 900 + Math.round(Math.random() * 500);
    await new Promise((resolve) => setTimeout(resolve, delay));

    const order = createMockOrderForCourse(currentUser, course);
    router.push(`/checkout/confirmation?orderId=${order.id}`);
  }

  if (!isReady || !isAuthenticated) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
        Preparing secure checkout...
      </div>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Checkout</h1>
            <p className="mt-2 text-sm text-slate-600">Complete your purchase to unlock this course instantly.</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contact information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  required
                />
                {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Payment method</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Cardholder name</label>
                <input
                  value={cardName}
                  onChange={(event) => setCardName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  placeholder="Jane Doe"
                  required
                />
                {errors.cardName && <p className="mt-1 text-xs text-rose-600">{errors.cardName}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Card number</label>
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  placeholder="4242424242424242"
                  inputMode="numeric"
                  required
                />
                {errors.cardNumber && <p className="mt-1 text-xs text-rose-600">{errors.cardNumber}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Expiration date</label>
                <input
                  value={expiration}
                  onChange={(event) => setExpiration(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  placeholder="MM/YY"
                  required
                />
                {errors.expiration && <p className="mt-1 text-xs text-rose-600">{errors.expiration}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">CVC</label>
                <input
                  value={cvc}
                  onChange={(event) => setCvc(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
                  inputMode="numeric"
                  placeholder="123"
                  required
                />
                {errors.cvc && <p className="mt-1 text-xs text-rose-600">{errors.cvc}</p>}
              </div>
            </div>

            {submitError && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Processing payment..." : "Complete Purchase"}
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Order summary</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <div className="relative aspect-video bg-slate-100">
                <Image src={course.image} alt={course.imageAlt} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                <p className="text-xs text-slate-500">By {course.instructorName}</p>
                <p className="text-sm text-slate-600">{course.shortDescription}</p>
              </div>
            </div>

            <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <dt>Price</dt>
                <dd>{course.price}</dd>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <dt>Total</dt>
                <dd>${amount.toFixed(2)}</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-slate-500">In a real checkout, a confirmation email would be sent after payment.</p>
            <Link href={`/courses/${course.slug}`} className="mt-3 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-500">
              ← Back to course details
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
