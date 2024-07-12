"use client";

import { CardFeed } from "./card-feed"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery, useQuery } from "convex/react";
import { SlidersHorizontal } from "lucide-react"
import { CreateFeedModal } from "./create-feed-modal";

export const Feeds = () => {
    // call all the feed here
    const feeds = useQuery(api.feeds.getFeeds, { bookmarked: false });

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600  dark:bg-neutral-800 hover:dark:bg-neutral-900 bg-neutral-200 hover:bg-neutral-100 border" size="sm">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter Feed
                </Button>
                <CreateFeedModal />
            </div>
            <div className={`${feeds && feeds.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4 lg:gap-8" : "h-full w-full"}`} >
                {feeds && feeds.length > 0 ? (
                    feeds.map((feed) => (
                        <CardFeed key={feed._id} feed={feed} />
                    ))
                ) : (
                    <div className="flex flex-col gap-2 h-full w-full items-center justify-center mx-auto">
                        <h2 className="text-base dark:text-neutral-200 text-neutral-800">Nothing here yet!</h2>
                        <p className="text-sm dark:text-neutral-400 text-neutral-600">Don't be shy. Be the first one to create a feed.</p>
                        <CreateFeedModal />
                    </div>
                )}
            </div>
        </main>
    )
}