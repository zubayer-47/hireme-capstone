"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { CardFeed } from "./card-feed";
import { CreateFeedModal } from "./create-feed-modal";
import { FilterFeedDropdown } from "./filter-feed-dropdown";

export type FilterType = "bookmarks" | "recent" | "most-upvotes" | "most-discussed";

export const Feeds = () => {
    const searchParams = useSearchParams();
    let filters = searchParams.get("filter") as FilterType;
    
    if (!filters) filters = "recent";

    const feeds = useQuery(
        api.feeds.getFeeds,
        filters ? {filters} : "skip"
      );

    return (
        <main className="flex flex-1 h-full flex-col gap-4 lg:gap-6 p-4 md:p-8 lg:p-12 xl:p-14 ">
            <div className="flex items-center justify-between">
                <FilterFeedDropdown />
                <CreateFeedModal />
            </div>
            <div className={`${feeds && feeds.length > 0 ? "flex flex-wrap items-center justify-center md:justify-between mx-auto  gap-2 md:gap-4 lg:gap-6 w-full" : "h-full w-full"}`}>
                {feeds && feeds.length > 0 ? (
                    feeds.map((feed) => (
                        <CardFeed key={feed._id} feed={feed} filters={filters} />
                    ))
                ) : (
                    <div className="flex flex-col gap-2 h-full w-full items-center justify-center mx-auto">
                        <h2 className="text-base sm:text-lg dark:text-white text-neutral-800">Nothing here yet!</h2>
                        <p className="text-sm dark:text-neutral-200 text-neutral-600">Don&apos;t be shy. Be the first one to create a feed.</p>
                        <CreateFeedModal />
                    </div>
                )}
            </div>

        </main>
    )
}