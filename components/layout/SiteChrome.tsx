"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
