// src/app/layout.tsx - Đã chỉnh sửa

import type { Metadata } from "next";
import "./globals.css";
import 'prismjs/themes/prism-okaidia.css';
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BLOG",
  description: "Nơi chia sẻ kiến thức",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* Áp dụng các lớp màu nền, màu chữ, và font trực tiếp vào thẻ <body>.
        Đây là cách làm tốt nhất để đảm bảo toàn bộ trang tuân thủ theme.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 dark:bg-[#121212] dark:text-slate-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Div này bây giờ chỉ chịu trách nhiệm về layout flex */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex-grow px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}