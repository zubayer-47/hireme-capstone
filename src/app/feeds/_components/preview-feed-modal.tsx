"use client"

import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatRelative } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, MoreVertical } from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";


const commentSchema = z.object({
    comment: z.string().min(1).max(1000),
})

export const PreviewFeedModal = ({
    feed,
    comments
}: {
    feed: Doc<"feeds">;
    comments: Doc<"comments">[] | undefined;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const addComment = useMutation(api.comments.createComment);

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof commentSchema>) => {
        try {
            await addComment({
                feedId: feed._id,
                ...values
            })

        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: `An error occured while editing the feed.`,
                variant: "destructive",
            });
        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                >
                    PREVIEW
                </Button>
            </DialogTrigger>
            <DialogContent className="h-full w-full max-w-6xl dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2] overflow-y-auto">
                <section className="relative flex flex-col md:flex-row gap-8 p-4 rounded-lg shadow-lg">
                    <article className="md:w-1/2 w-full rounded-xl">
                        <div className="sticky top-0 h-full overflow-y-auto rounded-lg">
                            <Image
                                src={feed.fileUrl}
                                alt="User Resume Image"
                                width={500}
                                height={500}
                                quality={100}
                                priority
                                className="object-contain w-full h-full rounded-lg"
                            />
                        </div>
                    </article>
                    <article className="md:w-1/2 w-full flex flex-col space-y-4">
                        <aside className="flex items-center gap-4">
                            <Image
                                src={feed?.profImgUrl!}
                                alt="User Profile Image"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-semibold capitalize dark:text-white text-gray-900">{feed.username}</h2>
                                <p className="text-sm dark:text-gray-400 text-gray-600">{formatRelative(new Date(feed._creationTime), new Date())}</p>
                            </div>
                        </aside>
                        <p className="text-md dark:text-gray-300 text-gray-700">{feed.bio}</p>
                        <div className="flex-1 space-y-2">
                            {comments && comments.map((comment) => (
                                <div key={comment._id} className="flex flex-col gap-2 rounded-lg p-3 border dark:border-gray-600 border-gray-300 hover:dark:border-gray-400 hover:border-gray-500 transition duration-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-sm font-semibold capitalize dark:text-white text-gray-900">{comment.username}</h2>
                                            <p className="text-xs dark:text-gray-400 text-gray-600">{formatRelative(new Date(comment._creationTime), new Date())}</p>
                                        </div>
                                        <Button size="icon" variant="ghost">
                                            <MoreVertical className="h-4 w-4 dark:text-gray-400 text-gray-600" />
                                        </Button>
                                    </div>
                                    <p className="text-sm dark:text-gray-400 text-gray-600">{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="dark:text-gray-300 text-gray-700">Add a comment</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Share your job hunting journey or experience..."
                                                    className="w-full dark:bg-neutral-950 bg-neutral-200 dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-white border-black/[0.2] rounded-lg p-2"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-app-color hover:bg-app-color/80 text-neutral-100 font-semibold py-2 rounded-lg transition duration-200">
                                    {isLoading ? <p className="flex items-center gap-1 text-neutral-500 "><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</p> : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </article>
                </section>
            </DialogContent>
        </Dialog>
    )
}