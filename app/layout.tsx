import type React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Backend Development Workshop",
  description: "Learn the core concepts of backend development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-full">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans h-full flex flex-col`}>
        <main className="flex-grow flex items-center justify-center">{children}</main>
      </body>
    </html>
  );
}
