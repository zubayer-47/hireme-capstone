import "./globals.css";

import { constructMetadata } from "@/lib/metadata";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Lato } from "next/font/google";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Toaster } from "@/components/ui/toaster";

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
