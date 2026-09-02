import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Stashmatic",
  description: "Strategic gear planning.",
  applicationName: "Stashmatic",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", inter.variable)}>
        <body className={`${inter.variable} bg-emerald-900 text-slate-900 antialiased`}>
          <Providers>
            <Toaster richColors position="top-right" />
            <NavBar />

            <main className="min-h-screen bg-emerald-900 text-slate-900">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
