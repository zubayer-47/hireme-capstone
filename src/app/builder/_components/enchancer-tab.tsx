"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useGenerateResumePrompt } from "@/hooks/use-generate-resume-prompt";

import { Sparkles } from "lucide-react";

import { 
    Form, 
    FormItem,
    FormField, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form";
import {
    Sheet,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { Analyzing } from "./analyzing";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {ResultType} from "../_types/ai-result-type";
import { AIResults } from "./ai-results/ai-results";
import { useToast } from "@/components/ui/use-toast";

import MockData from "./mock-ai-result.json";

const schema = z.object({
    description: z.string().min(2),
})

export const EnhancerTab = () => {
    const [steps, setSteps] = useState(1);
    const [pending, setPending] = useState(false);
    // const [results, setResults] = useState<ResultType | null>(null);
    const [results, setResults] = useState(null);
    const { toast } = useToast();

    const formSteps = [
        "Welcome to Resume Enhancement",
        "Find Job Listing",
        "Paste Job Description",
        "View Results"
    ];

    const userResumePrompt = useGenerateResumePrompt();
    const generateResults = useAction(api.gemini.generateResults);

    const nextStep = () => {
        if (formSteps.length === steps) return;
        setSteps(steps + 1);
    }

    const handleButtonClick = () => {
        if (steps === 4) {
            form.handleSubmit(onSubmit)();
        } else {
            nextStep();
        }
    };

    const prevStep = () => {
        if (steps === 1) return;
        setSteps(steps - 1);
    }

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            description: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        setPending(true);
        try {
            const { description } = values;
            // const result = await generateResults({
            //     jobDescription: description, 
            //     userResumePrompt
            // });
            // setResults(JSON.parse(result) as ResultType);
            toast({
                title: "Success",
                description: `Your feedback has been generated.`,
                variant: "success",
            })
            setPending(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: `Something went wrong. We couldn't generate your feedback. Please try again later.`,
                variant: "destructive",
            })
            setPending(false);

        } 
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    className="flex items-center gap-1 text-sm bg-app-color hover:bg-app-color/80 text-neutral-200 translate-hover rounded-lg"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="whitespace-nowrap">Enhancer</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col items-center justify-center mx-auto ${steps === 4 ? "h-50" : "h-full"} overflow-y-auto `}>
                        <SheetHeader className="w-2/3 ">
                            <SheetTitle>{formSteps[steps - 1]}</SheetTitle>
                            {steps === 1 && (
                                <SheetDescription className="">
                                    Take advantage of this feature to tailor your resume to match specific job descriptions.
                                    We'll analyze key terms and provide actionable suggestions to help you stand out.
                                </SheetDescription>
                            )}
                            {steps === 2 && (
                                <aside className="flex flex-col gap-2 text-sm">
                                    <SheetDescription>Find the job listing you are applying for and copy the job description text.</SheetDescription>
                                    <div className="border-2 rounded-2xl bg-neutral-600 border-neutral-600 p-1">
                                        <video autoPlay muted src="/videos/how-to-copy-job-description.mov" className="w-100 h-100 rounded-2xl border-2 border-neutral-500" />
                                    </div>
                                </aside>
                            )}
                            {steps === 3 && (
                                <aside className="flex flex-col gap-2 text-sm w-full">
                                    <SheetDescription>Paste the job description text into the field below for analysis.</SheetDescription>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea 
                                                        {...field}
                                                        rows={20} 
                                                        cols={20} 
                                                        placeholder="Paste job description here" 
                                                        className="w-full h-full rounded-2xl border-2 border-neutral-500" 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </aside>
                            )}
                            {steps === 4 && (
                                <aside className="flex flex-col gap-2 text-sm w-full">
                                    <SheetDescription>View the matched keywords, suggestions for improvement, and your match score.</SheetDescription>
                                    {pending ? (
                                        <Analyzing />
                                    ) : ( 
                                        <AIResults results={MockData} />
                                    )}
                                </aside>
                            )}
                        </SheetHeader>

                        <SheetFooter className="flex items-center flex-end gap-2 w-2/3 pt-8">
                            <Button type="button" size="sm" onClick={prevStep} disabled={steps === 1 || pending}>Prev</Button>
                            <Button type={steps === 4 ? "submit" : "button"} size="sm" onClick={handleButtonClick} disabled={pending}>
                                {steps < 4 && "Next"}
                                {steps === 4 && "Generate Another Feedback"}
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
