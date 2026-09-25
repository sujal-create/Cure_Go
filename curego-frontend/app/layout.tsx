import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cure Go - Online Medicine Store",
  description: "Prescription, non-prescription medicines and general products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>

        <footer className="w-full border-t py-6">
          <div className="mx-auto max-w-6xl px-6 text-center text-sm text-zinc-600">
            © {new Date().getFullYear()} Cure Go
          </div>
        </footer>
      </body>
    </html>
  );
}
