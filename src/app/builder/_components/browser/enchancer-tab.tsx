"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Analyzing } from "../analyzing";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AIResults } from "../ai-results/ai-results";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
    description: z.string().min(2),
})

export const EnhancerTab = ({ resumeId } : {resumeId: Id<"resume"> }) => {
    const [steps, setSteps] = useState(1);
    const [pending, setPending] = useState(false);
    
    const { toast } = useToast();

    const formSteps = [
        "Welcome to Resume Enhancement",
        "Find Job Listing",
        "Paste Job Description",
        "View Results"
    ];

    const results = useQuery(api.results.getResults, { resumeId });
    const userResumePrompt = useGenerateResumePrompt();
    const generateResults = useAction(api.openai.generateResults);
    
    const nextStep = () => {
        if (formSteps.length === steps) return;
        setSteps(steps + 1);
    }

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
            await generateResults({
                resumeId,
                jobDescription: description, 
                userResumePrompt
            });
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

    const startAnalyzing = () => {
        form.handleSubmit(onSubmit)();
        nextStep();
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    className="flex items-center gap-1 text-sm bg-app-color hover:bg-app-color/80 text-neutral-100 translate-hover rounded-lg"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="whitespace-nowrap">Enhancer</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col items-center justify-center mx-auto ${steps === 4 ? "h-50" : "h-full"} overflow-y-auto `}>
                        <SheetHeader className="w-2/3 ">
                            <SheetTitle className="dark:text-neutral-200 text-neutral-800 text-md">{formSteps[steps - 1]}</SheetTitle>
                            {steps === 1 && (
                                <SheetDescription className="dark:text-neutral-400 text-neutral-600 text-sm">
                                    Take advantage of this feature to tailor your resume to match specific job descriptions.
                                    We&apos;ll analyze key terms and provide actionable suggestions to help you stand out.
                                </SheetDescription>
                            )}
                            {steps === 2 && (
                                <aside className="flex flex-col gap-2 text-sm">
                                    <SheetDescription className="dark:text-neutral-400 text-neutral-600 text-sm">Find the job listing you are applying for and copy the job description text.</SheetDescription>
                                    <div className="border-2 rounded-2xl bg-neutral-600 border-neutral-600 p-1">
                                        <video autoPlay muted src="/videos/how-to-copy-job-description.mov" className="w-100 h-100 rounded-2xl border-2 border-neutral-500" />
                                    </div>
                                </aside>
                            )}
                            {steps === 3 && (
                                <aside className="flex flex-col gap-2 text-sm w-full">
                                    <SheetDescription className="dark:text-neutral-400 text-neutral-600 text-sm">Paste the job description text into the field below for analysis.</SheetDescription>
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
                                <aside className="flex flex-col  gap-2 text-sm w-full">
                                    <SheetDescription className="dark:text-neutral-400 text-neutral-600 text-sm">View the matched keywords, suggestions for improvement, and your match score.</SheetDescription>
                                    {pending ? (
                                       <Analyzing />
                                    ) : ( 
                                        <AIResults results={results} />
                                    )}
                                </aside>
                            )}
                        </SheetHeader>

                        <SheetFooter className="flex items-center flex-end gap-2 w-2/3 pt-8">
                            <Button type="button" size="sm" onClick={prevStep} disabled={steps === 1 || pending} variant="ghost" className="translate-hover">Prev</Button>
                            
                            {steps < 4 && (
                                <>
                                {steps < 3 && <Button type="button" size="sm" variant="ghost" onClick={nextStep} className="translate-hover">Next</Button>}
                                {steps === 3 && <Button type="button" size="sm" className="bg-app-color hover:bg-app-color/80 text-neutral-100 translate-hover" disabled={pending} onClick={() => startAnalyzing()}>{results ? "See Results" : "Analyze"}</Button>}
                                </>
                            )}
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
