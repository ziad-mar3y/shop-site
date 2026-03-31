import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components";
import CartContextProvider from "@/Contexts/cartContext";
import { WishlistProvider } from "@/Contexts/wishlistContext";
import ProvidersContainer from "@/components/ProvidersContauner/ProvidersContainer";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop is a modern e-commerce platform built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <ProvidersContainer>
            <QueryProvider>
              <CartContextProvider>
                <WishlistProvider>
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                  <Toaster position="bottom-right" />
                </WishlistProvider>
              </CartContextProvider>
            </QueryProvider>
          </ProvidersContainer>
        </div>
      </body>
    </html>
  );
}
