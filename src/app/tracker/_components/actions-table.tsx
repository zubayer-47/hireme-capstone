"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { MoreHorizontal } from "lucide-react";

import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    company: z.optional(z.string().min(2).max(50)),
    jobLink: z.optional(z.string().min(2).includes("https")),
    jobTitle: z.optional(z.string().min(2).max(50)),
    location: z.optional(z.string().min(2).max(50)),
    dateApplied: z.optional(z.string().min(2).max(50)),
    salary: z.optional(z.string()),
    recruiterInfo: z.optional(z.string()),
    status: z.optional(z.enum(["applied", "interviewed", "offered", "rejected"])),
})

export const ActionsTable = ({
    application
}: { application: Doc<"applications"> }) => {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const deleteApplication = useMutation(api.applications.deleteApplication);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            jobLink: "",
            jobTitle: "",
            location: "",
            dateApplied: "",
            status: "applied",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            toast({
                    title: "Success",
                    description: "Application has been created.",
                    variant: "default",
                })
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to create your application.",
                variant: "default",
            })
        }
    }

    return (
        <>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="transform hover:-translate-y-1 transition-all duration-400" onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteApplication({
                                    applicationId: application._id,
                                });
                                toast({
                                    title: "Sucess",
                                    description: "Application has been deleted.",
                                    variant: "default"
                                })
                                setIsAlertDialogOpen(false)
                            }}
                            className="bg-primary-color/80 text-white hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Open modal here */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger>
                            <DropdownMenuItem onClick={() => { }}>Edit</DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                            <DialogHeader>
                                <DialogTitle className="dark:text-neutral-200 text-neutral-800">Add New Job Description</DialogTitle>
                                <DialogDescription className="dark:text-neutral-400 text-neutral-600">
                                    Fill out the details of the job you've applied to.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Company Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Apple" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jobTitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Software Engineer (Full stack)" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="jobLink"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Job Link</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://www.apple.com/careers/ca/" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Location</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Toronto" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="dateApplied"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Date Applied</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                        <FormControl>
                                                            <SelectTrigger className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                                                <SelectValue placeholder="Select a status for your application" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                                            <SelectItem value="applied">Applied</SelectItem>
                                                            <SelectItem value="interviewed">Interviewed</SelectItem>
                                                            <SelectItem value="offered">Offered</SelectItem>
                                                            <SelectItem value="rejected">Rejected</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-x-2 mt-2">
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button size="sm">Submit</Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>

                    <DropdownMenuItem onClick={() => setIsAlertDialogOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}