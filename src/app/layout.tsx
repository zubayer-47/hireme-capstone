import "./globals.css";

import { Lato } from "next/font/google";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/loading-spinner";
import { constructMetadata } from "@/lib/metadata";

const font = Lato({ weight: ["100", "300", "400", "700", "900"], subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ConvexClientProvider>
        <body className={`${font.className} antialiased`}>
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
            <Toaster />
          </ThemeProvider>
        </body>
      </ConvexClientProvider>
    </html>
  );
}
