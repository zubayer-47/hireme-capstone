"use client"

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

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
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { TagsInput } from "./tags-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createFeedSchema } from "../_lib/create-feed-type";



export const EditFeedModal = ({
    feedId,
    isOpen,
    setIsOpen
}: { 
    isOpen: boolean;
    feedId: Id<"feeds">;
    setIsOpen: (arg: boolean) => void;
}) => {

    const { toast } = useToast();

    const editFeed = useMutation(api.feeds.editBioTagFeed);
    const feed = useQuery(api.feeds.getFeedWithId, { feedId });

    useEffect(() => {
        if (feed) {
            const { bio, tags } = feed;
            form.reset({
                bio: bio || "",
                tags: tags || []
            })
        }
    }, [feed])

    const form = useForm<z.infer<typeof createFeedSchema>>({
        resolver: zodResolver(createFeedSchema),
        defaultValues: {
            bio: "",
            tags: []
        }
    });

    const onSubmit = async (values: z.infer<typeof createFeedSchema>) => {
        try {
            await editFeed({
                feedId,
                ...values
            })
            toast({
                    title: "Success",
                    description: `Your feed has been edited!`,
                    variant: "success",
            });
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: `An error occured while editing the feed.`,
                variant: "destructive",
            });
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogContent className="sm:w-2/3 w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <DialogHeader className="pb-2">
                    <DialogTitle className="dark:text-white text-neutral-800 capitalize">Share Your Resume to the Community</DialogTitle>
                    <DialogDescription className="dark:text-neutral-200 text-neutral-600">Start filling up the details and get feedback from your peers.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Share your job hunting journey or experience..." className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-white border-black/[0.2]"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Bio</FormLabel>
                                    <FormControl>
                                        <TagsInput value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-x-2 mt-2">
                            <Button
                                size="sm"
                                type="button"
                                variant="ghost"
                                disabled={isLoading}
                                className="translate-hover"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                disabled={isLoading}
                                className="dark:bg-neutral-900 dark:text-neutral-300 text-neutral-700 hover:bg-neutral-800 translate-hover"
                            >
                                {isLoading ? (
                                    <p className="flex items-center gap-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading...
                                    </p>
                                ) : (
                                    <p>Submit</p>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}