export default function DocumentLayout({ children }: {children: React.ReactNode }) {
    return (
        <main className="relative h-full w-full bg-background">
            {children}
        </main>
    )
}