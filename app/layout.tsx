import type { Metadata } from "next";
import { AppChrome } from "../components/AppChrome";
import { AuthProvider } from "../components/providers/AuthProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "CourseLab",
  description: "Practical courses for women entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <AppChrome>{children}</AppChrome>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
