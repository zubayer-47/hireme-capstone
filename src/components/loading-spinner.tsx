import { Loader } from "lucide-react"

export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col space-y-4">
            <Loader className="text-app-color h-24 w-24 animate-spin" />
            <p className="text-muted-foreground text-xl">Loading...</p>
        </div>
    )
}