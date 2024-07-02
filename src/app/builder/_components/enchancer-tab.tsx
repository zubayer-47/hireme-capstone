"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Sheet,
    SheetTitle,
    SheetClose,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const schema = z.object({
    description: z.string().min(2),
})


export const EnhancerTab = () => {
    const [steps, setSteps] = useState(1);
    const formSteps = [
        "Welcome to Resume Enhancement",
        "Find Job Listing",
        "Paste Job Description",
        "View Results"
    ];

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
    })

    const onSubmit = (values: z.infer<typeof schema>) => {
        try {
            console.log(values)
        } catch (error) {
            console.error(error)
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center mx-auto h-full">
                        <SheetHeader className="w-2/3">
                            
                        </SheetHeader>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}