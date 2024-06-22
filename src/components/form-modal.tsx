"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    Dialog,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


const formSchema = z.object({
    company: z.string().min(2).max(50),
    jobLink: z.string().min(2).includes("https"),
    jobTitle: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    dateApplied: z.string().min(2).max(50),
    status: z.enum(["applied", "interviewed", "offered", "rejected"]),
})


export const FormModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useQuery(api.users.getSelf);
    const trackJobApplication = useMutation(api.jobTracker.createJobToTrack);

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
        if (!user) return;

        try {
            await trackJobApplication({
                userId: user._id,
                ...values
            });
        } catch (error) {
            console.error(error)
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
                <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600 bg-neutral-200 hover:bg-neutral-100  dark:bg-neutral-800 hover:dark:bg-neutral-900 translate-hover" size="sm">
                    <ListPlus className="h-4 w-4" />
                    Track
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-50 dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
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
                                            <Input placeholder="https://www.apple.com/careers/ca/" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field}  />
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
                                            <Input placeholder="Toronto" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field}/>
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
                                            <Input type="date" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field}  />
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
                            <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button size="sm">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}