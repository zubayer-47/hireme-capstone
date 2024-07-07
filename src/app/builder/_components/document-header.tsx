"use client";

import { ButtonLink } from "@/components/button-link";

import { EnhancerTab } from "./enchancer-tab";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type DocumentHeaderProps = {
    documentName: string;
    currentScore?: string;
}

export const DocumentHeader = ({
    documentName,
    currentScore,
}: DocumentHeaderProps) => {
    const saveResults = useMutation(api.resume.updateResumeFields);

    const handleSaveResults = async () => {
        try {
           
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                {/* Make this editable when user clicks it */}
                <h2 className="dark:text-neutral-200 text-neutral-800 text-sm font-bold">{documentName}</h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink onChange={handleSaveResults} name="Go Back" href="/builder" size="sm" />
                <EnhancerTab />
            </nav>
        </header>
    )
}