import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ConvexClientProvider } from "@/providers/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireMe",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClientProvider>
      <body className={inter.className}>{children}</body>
      </ConvexClientProvider>
    </html>
  );
}
