// src/app/layout.tsx - Đã chỉnh sửa

import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Geist, JetBrains_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hanog.blog"),
  title: {
    default: "Hanog Blog",
    template: "%s | Hanog Blog",
  },
  description: "Nơi chia sẻ kiến thức về công nghệ, bảo mật và lập trình.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Hanog Blog",
    title: "Hanog Blog",
    description: "Nơi chia sẻ kiến thức về công nghệ, bảo mật và lập trình.",
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-white text-slate-900 dark:bg-[#1D1F21] dark:text-slate-50 transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          storageKey="hanog-blog-theme"
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}