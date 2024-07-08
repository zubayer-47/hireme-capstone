import { Loader } from "lucide-react"

export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col space-y-4">
            <Loader className="text-app-color h-24 w-24 animate-spin" />
            <p className="dark:text-neutral-300 text-neutral-700 text-xl animate-pulse">Loading...</p>
        </div>
    )
}