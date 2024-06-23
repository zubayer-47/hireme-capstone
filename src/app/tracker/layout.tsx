import { Browser } from "@/components/browser/browser";

export default function JobTrackerLayout({ children }: {children: React.ReactNode} ) {
    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 w-full">
             {children}   
            </main>
            
        </Browser>
    )
}