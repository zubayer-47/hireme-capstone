"use client";

import Image from "next/image";
import { useState } from "react";
import { formatRelative } from "date-fns";
import { Doc } from "@/convex/_generated/dataModel";

import {
    ArrowUp,
    ArrowDown,
    Bookmark,
    MessageCircle,
    MoreVertical
} from "lucide-react";

import {
    Card,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardActionsDropdown } from "./card-actions-dropdown";
import { PreviewFeedModal } from "./preview-feed-modal";


export const CardFeed = ({ feed }: { feed: Doc<"feeds"> }) => {
    const [isHovered, setIsHovered] = useState(false);

    
    return (
        <Card className="w-[350px] rounded-2xl dark:bg-neutral-900 dark:border-white/[0.2] hover:dark:border-white/[0.5]">
            <CardHeader>
                <section className="flex items-center justify-between">
                    <article className="flex items-center gap-2">
                        <Image src={feed.profImgUrl} alt={`${feed.username} Profile Placeholder`} width="20" height="20" className="rounded-full object-cover" />
                        <hgroup>
                            <h2 className="text-xs dark:text-neutral-200 font-semibold capitalize">{feed.username}</h2>
                            <p className="text-xs dark:text-neutral-400">{formatRelative(new Date(feed._creationTime), new Date())}</p>
                        </hgroup>
                    </article>
                    <CardActionsDropdown feedId={feed._id} />
                </section>
            </CardHeader>

            <CardContent >
                <hgroup className="py-2">
                    <CardDescription className="truncate text-sm dark:text-neutral-400">
                        {feed.bio}
                    </CardDescription>

                    <div className="flex items-center  flex-wrap space-x-0.5 pt-2">
                        {feed.tags.map((tag, index) => (
                            <Badge key={index} className="mb-1 dark:bg-neutral-950 dark:text-neutral-500 w-fit">#{tag}</Badge>
                        ))}
                    </div>
                </hgroup>
                <aside
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-[300px] h-[14rem] border border-white/[0.2] shadow-2xl rounded-2xl overflow-hidden"
                >
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <PreviewFeedModal feed={feed} />
                        </div>
                    )}
                    <Image
                        src={feed.fileUrl}
                        alt="User Resume Image"
                        width={300}
                        height={200}
                        priority
                        className="object-cover w-full h-full"
                    />
                </aside>

            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowUp className="w-4 h-4" />
                    {feed.upvoteCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowDown className="w-4 h-4" />
                    {feed.downvoteCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {feed.comments?.length}
                </Button>
                {/* Highlight the button if the post is already bookmarked */}
                <Button variant="ghost" size="sm" className="gap-1">
                    <Bookmark className="w-4 h-4" />
                </Button>

            </CardFooter>
        </Card>
    )
}