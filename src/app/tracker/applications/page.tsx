"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../convex/_generated/api";
import { defaultValues, formSchema } from "./_lib/application-lib";

import { useToast } from "@/components/ui/use-toast";
import { DynamicForm } from "./_components/dynamic-form";

export default function CreateApplications() {
    const { toast } = useToast();
    const createApplication = useMutation(api.applications.createApplication);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await createApplication({
                ...values
            });

            if (res) {
                toast({
                    title: "Success",
                    description: "Application has been created.",
                    variant: "default",
                })
            }
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
        <DynamicForm 
            form={form} 
            onSubmit={onSubmit} 
            submitButtonName="Submit"
            formHeading="Start Tracking Your Job Application" 
            formSubheading="Fill out the details of the job you've applied to." 
        />
    )
}