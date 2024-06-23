import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod"

export const formSchema = z.object({
    salary: z.optional(z.string()),
    company: z.string().min(2).max(50),
    jobTitle: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    recruiterInfo: z.optional(z.string()),
    dateApplied: z.string().min(2).max(50),
    jobLink: z.string().min(2).includes("https"),
    status: z.enum(["applied", "interviewed", "offered", "rejected"]),
})

export const defaultValues: z.infer<typeof formSchema> = {
    salary: "",
    company: "",
    jobLink: "",
    jobTitle: "",
    location: "",
    dateApplied: "",
    recruiterInfo: "",
    status: "applied",
}

export type FormData = {
    location: string;
    company: string;
    jobLink: string;
    jobTitle: string;
    dateApplied: string;
    status: "applied" | "interviewed" | "offered" | "rejected";
    salary?: string | undefined;
    recruiterInfo?: string | undefined;
};

export type Form = UseFormReturn<FormData, any, undefined>;

export type DynamicFormProps = {
    form: Form;
    buttonName: string;
    isLoading: boolean;
    formHeading: string;
    formSubheading: string;
    router: AppRouterInstance;
    onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}