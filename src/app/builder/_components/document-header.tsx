"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useResumeStore } from "@/store/resume-store";

import { EnhancerTab } from "./enchancer-tab";
import { ButtonLink } from "@/components/button-link";

type DocumentHeaderProps = {
    documentName: string;
    currentScore?: string;
    resumeId: Id<"resume">;
}

export const DocumentHeader = ({
    documentName,
    currentScore,
    resumeId,
}: DocumentHeaderProps) => {

    const saveResults = useMutation(api.resume.updateResumeFields);
    const {
        profile,
        projects,
        skills,
        experiences: workExperience,
        education
    } = useResumeStore();

    const handleSaveResults = async () => {
        try {
            saveResults({
                resumeId,
                profile,
                projects,
                skills,
                workExperience,
                education
            });
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                {/* Make this editable when user clicks it */}
                <h2 className="dark:text-neutral-200 text-neutral-800 text-sm font-bold">{documentName}</h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink onSave={handleSaveResults} href="/builder" size="sm" name="Go Back" />
                <EnhancerTab />
            </nav>
        </header>
    )
}