"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";


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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
    company: z.string().min(2).max(50),
    jobLink: z.string().min(2).includes("https"),
    jobTitle: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    dateApplied: z.string().min(2).max(50),
    salary: z.optional(z.string()),
    recruiterInfo: z.optional(z.string()),
    status: z.enum(["applied", "interviewed", "offered", "rejected"]),
})

export default function CreateApplications() {
    const router = useRouter();
    const { toast } = useToast();
    const { applicationId } = useParams<{ applicationId: Doc<"applications">["_id"] }>()

    const updateApplication = useMutation(api.applications.updateApplication);
    const queryResult = useQuery(api.applications.getExistingApplication, { applicationId });

    useEffect(() => {
        if (queryResult) {
            const {salary, company, jobLink, jobTitle, location, dateApplied, recruiterInfo, status} = queryResult;
            form.reset({
                salary: salary || "",
                company: company || "",
                jobLink: jobLink || "",
                jobTitle: jobTitle || "",
                location: location || "",
                dateApplied: dateApplied || "",
                recruiterInfo: recruiterInfo || "",
                status: status || "applied",
            })
        }
    }, [queryResult]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salary: "",
            company: "",
            jobLink: "",
            jobTitle: "",
            location: "",
            dateApplied: "",
            recruiterInfo: "",
            status: "applied",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
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
        <section>
            <hgroup className="my-4 pb-4 border-b dark:border-white/[0.2] border-black/[0.2]">
                <h2 className="dark:text-neutral-200 text-neutral-800 text-md">Update Your Job Application</h2>
                <p className="dark:text-neutral-400 text-neutral-600 text-sm">Update the details of the job you've applied to.</p>
            </hgroup>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <aside className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                    </aside>
                    <aside className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                    </aside>
                    <aside className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                    </aside>
                    <aside className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recruiterInfo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Recruiter Info</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </aside>
                    <aside className="flex justify-end gap-x-2 mt-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => router.push("/tracker")}>Cancel</Button>
                        <Button size="sm">Save Changes</Button>
                    </aside>
                </form>
            </Form>
        </section>
    )
}