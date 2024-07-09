"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Eye,
    Loader2,
    CirclePlus,
    Plus,
} from "lucide-react";

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
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createFeedSchema } from "../feed-utils/create-feed-type";
import { UploadPDFDropzone } from "./upload-pdf-dropzone";
import { TagsInput } from "./tags-input";

export const CreateFeedModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pdfFileUrl, setPdfFileUrl] = useState("");
    const { toast } = useToast();
    const createFeed = useMutation(api.feeds.createFeed);
    const generateUploadUrl = useMutation(api.feeds.generateUploadUrl);

    const form = useForm<z.infer<typeof createFeedSchema>>({
        resolver: zodResolver(createFeedSchema),
        defaultValues: {
            bio: "",
            tags: []
        }
    });

    const onSubmit = (values: z.infer<typeof createFeedSchema>) => {

        try {
            // call the generate upload url here
            // take the _storageId 

            console.log(values)
        } catch (err) {
            console.error(err)
        }
    };

    const isLoading = form.formState.isSubmitting;
    console.log(pdfFileUrl)
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600" size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                    New Feed
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-2/3 w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <DialogHeader>
                    <DialogTitle className="dark:text-neutral-200 text-neutral-800 capitalize">Share Your Resume to the Community</DialogTitle>
                    <DialogDescription className="dark:text-neutral-400 text-neutral-600">Start filling up the details and get feedback from your peers.</DialogDescription>
                </DialogHeader>
                {/* Add the upload dropzone here */}
                <UploadPDFDropzone onFileUrlChange={setPdfFileUrl} />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="bio"
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