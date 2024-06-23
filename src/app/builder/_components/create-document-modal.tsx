"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react";

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
} from "@/components/ui/dialog";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";



const formSchema = z.object({
    documentName: z.string().min(2),
    documentType: z.enum(["resume", "cover letter"])
});

export const CreateDocumentModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const createDocument = useMutation(api.resume.createDocument)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            documentName: "",
            documentType: "resume"
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { documentName, documentType } = values;
            let documentId;
            switch (documentType) {
                case "resume":
                    documentId = await createDocument({ documentName });

                    if (documentId) {
                        toast({
                            title: "Success",
                            description: `New document has been created.`,
                            variant: "default",
                        })

                        router.push(`/resume/${documentId}`);
                    }
                    break;
                case "cover letter":
                    documentId = await createDocument({ documentName });

                    if (documentId) {
                        toast({
                            title: "Success",
                            description: `New document has been created.`,
                            variant: "default",
                        })

                        router.push(`/cover-letter/${documentId}`);
                    }
                    break;
            }

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: `Unable to create new document.`,
                variant: "default",
            })
        }
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600 bg-neutral-200 hover:bg-neutral-100  dark:bg-neutral-800 hover:dark:bg-neutral-900 translate-hover" size="sm" >
                    <Plus className="h-4 w-4" />
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <DialogHeader>
                    <DialogTitle className="dark:text-neutral-200 text-neutral-800 capitalize">New Document</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="documentName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Document</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Untitled" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="documentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Document Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                                <SelectValue placeholder="Select a status for your application" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                            <SelectItem value="resume">Resume</SelectItem>
                                            <SelectItem value="cover letter">Cover Letter</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-x-2 mt-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button size="sm">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}