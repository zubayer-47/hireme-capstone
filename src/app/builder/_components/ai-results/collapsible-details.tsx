"use client";

import {
    useState,
    useCallback,
    RefAttributes,
    ForwardRefExoticComponent,
} from "react";
import { cn } from "@/lib/utils";

import { ChevronDown, LucideProps } from "lucide-react";

import { Button } from "@/components/ui/button";

type CollapsibleDetailsProps = {
    title: string;
    children: React.ReactNode;
}

export const CollapsibleDetails = ({ children, title  }: CollapsibleDetailsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = useCallback(() => {
        setIsExpanded((isExpanded) => !isExpanded);
    }, []);

    return (
        <>
            <aside className="flex items-center justify-between px-4 py-2 border dark:border-white/[0.2] border-black/[0.2] shadow-md rounded-lg bg-card text-card-foreground">
                <h2 className="text-sm font-semibold leading-none tracking-tight dark:text-neutral-300 text-neutral-700">{title}</h2>

                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        type="button"
                        onClick={toggleIsExpanded}
                        variant="outline"
                    >
                        <ChevronDown className={cn("h-4 w-4 text-neutral-500 transition-transform duration-300", isExpanded ? "rotate-180" : "rotate-0")} />
                    </Button>
                </div>
            </aside>
            {
                isExpanded && (
                    <aside className="h-auto transition-all">
                        {children}
                    </aside>)
            }
        </>
    )
}