import type { Metadata } from 'next'
import { Browser } from "@/components/browser/browser";
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { LoadingSpinner } from '@/components/loading-spinner';

export const metadata: Metadata = {
    title: 'Hireme | Job Tracker',
    description: 'Track your job application progress and stay motivated throughout the job search journey.',
}

export default function JobTrackerLayout({ children }: { children: React.ReactNode }) {
    return (
        <Browser>
            <ClerkLoading>
                <main className="h-full w-full mx-auto flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            </ClerkLoading>
            <ClerkLoaded>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
                    {children}
                </main>
            </ClerkLoaded>
        </Browser>
    )
}