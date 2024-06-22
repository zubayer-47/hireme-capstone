import { Browser } from "@/components/browser/browser";

export default function JobTrackerLayout({ children }: {children: React.ReactNode} ) {
    return (
        <Browser>
            {children}
        </Browser>
    )
}