"use client";

import {
    useState,
    useCallback,
    RefAttributes,
    ForwardRefExoticComponent
} from "react";
import { cn } from "@/lib/utils";

import { ChevronDown, LucideProps, Plus } from "lucide-react";

import { Button } from "./ui/button";
import { useResumeStore } from "@/store/resume-store";

interface CollapsibleFormProps {
    children: React.ReactNode;
    formTitle: string;
    addNewFormRef: "projects" | "education" | "experience" | "skills";
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const CollapsibleForm = ({ children, formTitle, icon: Icon, addNewFormRef }: CollapsibleFormProps) => {
    const { addNewForm } = useResumeStore();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = useCallback(() => {
        setIsExpanded((isExpanded) => !isExpanded);
    }, []);

    return (
        <>
            <aside className="flex items-center justify-between px-4 py-2 border border-gray-100 shadow-md rounded-lg bg-card text-card-foreground">
                <hgroup className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-app-color" />
                    <h2 className="text-xl font-semibold leading-none tracking-tight">{formTitle}</h2>
                </hgroup>
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        type="button"
                        onClick={() => addNewForm(addNewFormRef)}
                        variant="outline"
                    >
                        <Plus className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button
                        size="icon"
                        type="button"
                        onClick={toggleIsExpanded}
                        variant="outline"
                    >
                        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isExpanded ? "rotate-180" : "rotate-0")} />
                    </Button>
                </div>
            </aside>
            {isExpanded && (
                <aside className="h-auto transition-all">
                    {children}
                </aside>
            )}
        </>
    )
}