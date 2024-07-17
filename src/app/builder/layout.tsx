import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Hireme | Builder',
    description: 'Build your professional ATS resume and cover letter in just 5 minutes and with our AI-powered resume enhancer.',
  }

export default function BuilderLayout({ children }: {children: React.ReactNode} ) {
    return (
        <main className="relative h-full w-full bg-background">
            {children}
        </main>
    )
}