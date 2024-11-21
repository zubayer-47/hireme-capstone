import { Browser } from "@/components/browser/browser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hireme | Community Feeds',
    description: 'Connect with a network of job seekers, share experiences, and learn valuable tips to land your next interview.',
}

export default function FeedsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Browser>
            <ClerkLoading>
                <main className="h-full w-full mx-auto flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            </ClerkLoading>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </Browser>
    )
}