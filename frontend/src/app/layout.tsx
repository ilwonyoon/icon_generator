import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: "IconForge",
  description: "Learn, generate, and manage icon styles at scale."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-100 text-stone-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
