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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PreviewFeedModal } from "./preview-feed-modal";
import { CardActionsDropdown } from "./card-actions-dropdown";

export const CardFeed = ({ feed }: { feed: Doc<"feeds"> }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [userVoteType, setUserVoteType] = useState<"upvote" | "downvote" | null>(null);
    const { toast } = useToast();

    const user = useQuery(api.users.getSelf);
    const comments = useQuery(api.comments.getAllCommentsOnFeed, { feedId: feed._id });
    const vote = useMutation(api.feeds.vote);

    console.log(comments)

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

            <CardContent>
                <hgroup className="py-2">
                    <CardDescription className="truncate text-sm dark:text-neutral-400">
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
                    className="relative w-[300px] h-[14rem] border border-white/[0.2] shadow-2xl rounded-2xl overflow-hidden"
                >
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <PreviewFeedModal feed={feed} comments={comments} />
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
                <Button variant="ghost" size="sm" className={cn(userVoteType === "upvote" ? "text-app-color" : "" ,`gap-1`)} onClick={() => handleVote("upvote")}>
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
                <Button variant="ghost" size="sm" className="gap-1">
                    <Bookmark className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};
