import { Button } from "@/components/ui/button"
import { Plus, SlidersHorizontal } from "lucide-react"
import { CardFeed } from "./card-feed"

export const Feeds = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600  dark:bg-neutral-800 hover:dark:bg-neutral-900 bg-neutral-200 hover:bg-neutral-100 border" size="sm">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter Feed
                </Button>
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600" size="sm" variant="ghost">
                    <Plus className="h-4 w-4"  />
                    New Feed
                </Button>
            </div>
            <div className="grid grid-cols-3" >
                <CardFeed />
                <CardFeed />
                <CardFeed />
            </div>
        </main>
    )
}