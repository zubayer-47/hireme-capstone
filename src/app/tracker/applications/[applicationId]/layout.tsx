import { LoadingSpinner } from "@/components/loading-spinner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function EditJobApplicationLayout({ children }: {children: React.ReactNode }) {
    return (
        <>  
            <ClerkLoading><LoadingSpinner /></ ClerkLoading >
            <ClerkLoaded>{children}</ClerkLoaded>
        </>
    )
} 