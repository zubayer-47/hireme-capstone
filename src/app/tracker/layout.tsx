import type { Metadata } from 'next'
import { Browser } from "@/components/browser/browser";

export const metadata: Metadata = {
    title: 'Hireme | Job Tracker',
    description: 'Track your job application progress and stay motivated throughout the job search journey.',
}

export default function JobTrackerLayout({ children }: {children: React.ReactNode} ) {
    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
             {children}   
            </main>
        </Browser>
    )
}