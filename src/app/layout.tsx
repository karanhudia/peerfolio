import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/MainNav";
import { getCurrentUser } from "@/lib/session";
import { SessionProvider } from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PeerFolio - Professional Reviews & Feedback",
  description: "The platform for reviewing and rating professionals based on personal experiences.",
  applicationName: "PeerFolio",
  authors: [{ name: "PeerFolio Team" }],
  keywords: ["reviews", "professional", "feedback", "rating", "linkedin"],
};

// Configure viewport for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3b82f6",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  const user = session?.user ?? null;

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <SessionProvider session={session}>
          <ToastProvider>
            <MainNav user={user} />
            <main className="flex-1">{children}</main>
            <footer className="border-t">
              <div className="container py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-500">
                      © {new Date().getFullYear()} PeerFolio. All rights reserved.
                    </p>
                  </div>
                  <nav className="flex flex-wrap gap-4 justify-center">
                    <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                      Terms of Service
                    </Link>
                    <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                      Privacy Policy
                    </Link>
                    <Link href="/content-dispute" className="text-sm text-gray-500 hover:text-gray-700">
                      Content Dispute Policy
                    </Link>
                  </nav>
                </div>
              </div>
            </footer>
            <Analytics />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
