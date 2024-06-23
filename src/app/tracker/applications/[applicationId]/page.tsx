"use client"

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { formSchema, defaultValues } from "../_lib/application-lib";

import { useToast } from "@/components/ui/use-toast";

import { DynamicForm } from "../_components/dynamic-form";


export default function CreateApplications() {
    const router = useRouter();
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

    const isLoading = form.formState.isSubmitting;

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
                    variant: "success",
                });
                router.push("/tracker");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to update your application.",
                variant: "destructive",
            })
        }
    }

    return (
        <DynamicForm
            form={form}
            router={router}
            onSubmit={onSubmit}
            isLoading={isLoading}
            buttonName={isLoading ? "Loading..." : "Save Changes"}
            formHeading={`Manage Your Application for ${queryResult?.jobTitle}`}
            formSubheading={`Refine your submission for ${queryResult?.company}`}
        />
    )
}