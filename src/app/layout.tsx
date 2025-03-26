import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/session";
import { SessionProvider } from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/react";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <SessionProvider>
          <MainNav user={user} />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
