"use client"

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { formSchema, defaultValues } from "../_lib/application-lib";

import { useToast } from "@/components/ui/use-toast";

import { DynamicForm } from "../_components/dynamic-form";

export default function CreateApplications() {
    const { toast } = useToast();
    const { applicationId } = useParams<{ applicationId: Doc<"applications">["_id"] }>()

    const updateApplication = useMutation(api.applications.updateApplication);
    const queryResult = useQuery(api.applications.getExistingApplication, { applicationId });

    useEffect(() => {
        if (queryResult) {
            const { salary, company, jobLink, jobTitle, location, dateApplied, recruiterInfo, status } = queryResult;
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
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await updateApplication({
                applicationId,
                ...values
            });

            if (res) {
                toast({
                    title: "Success",
                    description: "Application has been updated.",
                    variant: "default",
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to update your application.",
                variant: "default",
            })
        }
    }

    return (
        <DynamicForm
            form={form}
            onSubmit={onSubmit}
            submitButtonName="Save Changes"
            formHeading={`Manage Your Application for ${queryResult?.jobTitle}`}
            formSubheading={`Refine your submission for ${queryResult?.company}`}
        />
    )
}