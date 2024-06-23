"use client"

import { DynamicFormProps } from "../_lib/application-lib";

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
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DynamicForm = ({
    form,
    router,
    onSubmit,
    isLoading,
    buttonName,
    formHeading,
    formSubheading,
}: DynamicFormProps) => {

    return (
        <>
            <hgroup className="my-4 pb-4 border-b dark:border-white/[0.2] border-black/[0.2]">
                <h2 className="dark:text-neutral-200 text-neutral-800 text-md">{formHeading}</h2>
                <p className="dark:text-neutral-400 text-neutral-600 text-sm">{formSubheading}</p>
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
                        <Button
                            size="sm"
                            type="button"
                            variant="ghost"
                            disabled={isLoading}
                            className="translate-hover"
                            onClick={() => router.push("/tracker")}
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
                                    {buttonName}
                                </p>
                            ) : (
                                <p>{buttonName}</p>
                            )}
                        </Button>
                    </aside>
                </form>
            </Form>
        </>
    )
}