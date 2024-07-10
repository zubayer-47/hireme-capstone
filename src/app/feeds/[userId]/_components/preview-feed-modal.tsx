"use client"

import { z } from "zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { TagsInput } from "./tags-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const commentSchema = z.object({
    comment: z.string().min(1).max(1000),
})

export const PreviewFeedModal = ({
    feed
}: {
    feed: Doc<"feeds">
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        }
    });

    const onSubmit = (values: z.infer<typeof commentSchema>) => {
        try {


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
                    onClick={() => { }}
                >
                    PREVIEW
                </Button>
            </DialogTrigger>
            <DialogContent className=" h-full w-[200rem] max-w-6xl dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <section className="relative flex items-center gap-4">
                    <article className="flex-1">
                        <div className="sticky top-0 h-full w-auto overflow-y-auto">
                            <Image
                                src={feed.fileUrl}
                                alt="User Resume Image"
                                width={500}
                                height={500}
                                priority
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    </article>
                    <article className="flex-1">
                        {/* place the comment above the form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="dark:text-neutral-300 text-neutral-700">Bio</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Share your job hunting journey or experience..." className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </form>
                        </Form>
                    </article>
                </section>

            </DialogContent>
        </Dialog>
    )
}