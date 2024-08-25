"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatRelative } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import {
    ArrowUp,
    Bookmark,
    ArrowDown,
    MessageCircle,
} from "lucide-react";

import {
    Card,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { FilterType } from "./feeds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PreviewFeedModal } from "./preview-feed-modal";
import { CardActionsDropdown } from "./card-actions-dropdown";


export const CardFeed = ({ feed, filters }: { feed: Doc<"feeds">; filters: FilterType }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [userVoteType, setUserVoteType] = useState<"upvote" | "downvote" | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(filters === "bookmarks")

    const { toast } = useToast();

    const user = useQuery(api.users.getSelf);
    const vote = useMutation(api.feeds.vote);
    const bookmark = useMutation(api.feeds.bookmarkFeed);
    const unBookmark = useMutation(api.feeds.unbookmarkFeed);
    const comments = useQuery(api.comments.getAllCommentsOnFeed, { feedId: feed._id });

    const isOwner = user?._id === feed.userId;

    useEffect(() => {
        const checkIfUserVoted = () => {
            if (user) {
                const userVote = feed.voterIds.find(v => v.voterId === user._id);
                if (userVote) {
                    setUserVoteType(userVote.voteType)
                } else {
                    setUserVoteType(null)
                }
            }
        }

        checkIfUserVoted();
    }, [user, feed.voterIds])

    const handleVote = async (voterAction: "upvote" | "downvote") => {
        try {
            await vote({
                feedId: feed._id,
                voteType: voterAction
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleBookmarkFeed = async () => {
        try {
            if (isBookmarked) {
                await unBookmark({
                    feedId: feed._id
                });
                setIsBookmarked(false);
                toast({
                    title: "Success",
                    description: "Feed unbookmarked successfully",
                    variant: "success"
                });
            } else {
                await bookmark({
                    feedId: feed._id
                });
                setIsBookmarked(true);
                toast({
                    title: "Success",
                    description: "Feed bookmarked successfully",
                    variant: "success"
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive"
            })
        }
    }


    return (
        <Card className="w-[20rem] rounded-2xl dark:bg-neutral-900 dark:border-white/[0.2] hover:dark:border-white/[0.5]">
            <CardHeader>
                <section className="flex items-center justify-between">
                    <article className="flex items-center gap-2">
                        <Image src={feed?.profImgUrl!} alt={`${feed.username} Profile Placeholder`} width="30" height="30" className="rounded-full object-cover" />
                        <hgroup>
                            <h2 className="text-xs dark:text-white font-semibold capitalize">{feed.username}</h2>
                            <p className="text-xs dark:text-neutral-200">{formatRelative(new Date(feed._creationTime), new Date())}</p>
                        </hgroup>
                    </article>
                    {isOwner && <CardActionsDropdown feedId={feed._id} />}
                </section>
            </CardHeader>

            <CardContent>
                <hgroup className="py-2">
                    <CardDescription className="truncate text-sm dark:text-neutral-200">
                        {feed.bio}
                    </CardDescription>
                    <div className="flex items-center flex-wrap space-x-0.5 pt-2">
                        {feed.tags.map((tag, index) => (
                            <Badge key={index} className="mb-1 dark:bg-neutral-950 dark:text-neutral-500 w-fit">#{tag}</Badge>
                        ))}
                    </div>
                </hgroup>
                <aside
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full h-[12rem] border border-white/[0.2] shadow-2xl rounded-2xl overflow-hidden"
                >
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <PreviewFeedModal feed={feed} comments={comments!} />
                        </div>
                    )}
                    <Image
                        src={feed.fileUrl}
                        alt="User Resume Image"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="object-cover w-full h-full "
                    />
                </aside>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" className={cn(userVoteType === "upvote" ? "text-app-color" : "", `gap-1`)} onClick={() => handleVote("upvote")}>
                    <ArrowUp className="w-4 h-4" />
                    {feed.upVoteCount}
                </Button>
                <Button variant="ghost" size="sm" className={cn(userVoteType === "downvote" ? "text-app-color" : "", `gap-1`)} onClick={() => handleVote("downvote")}>
                    <ArrowDown className="w-4 h-4" />
                    {feed.downVoteCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {comments && comments.length}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1" onClick={handleBookmarkFeed}>
                    <Bookmark className={cn("w-4 h-4", isBookmarked ? "text-app-color" : "")} />
                </Button>
            </CardFooter>
        </Card>
    );
};
