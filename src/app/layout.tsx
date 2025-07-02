import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpenseCtrl",
  description: "A expense tracker app using Nextjs",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}