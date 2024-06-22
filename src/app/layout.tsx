import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LoadingSpinner } from "@/components/loading-spinner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <ConvexClientProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkLoading>
              <main className="h-full w-full mx-auto flex items-center justify-center">
                <LoadingSpinner />
              </main>
              
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
            
          </ThemeProvider>
        </body>
      </ConvexClientProvider>
    </html>
  );
}
