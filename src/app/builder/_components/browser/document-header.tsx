"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useResumeStore } from "@/store/resume-store";

import { EnhancerTab } from "../enchancer-tab";
import { ButtonLink } from "@/components/button-link";

export const DocumentHeader = ({
    resume
}: {
    resume: Doc<"resume">
}) => {

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
            await saveResults({
                resumeId: resume._id,
                profile: resume.profile ?? profile,
                projects: resume.projects ?? projects,
                skills: resume.skills ?? skills ,
                workExperience: resume.workExperience ?? workExperience,
                education: resume.education ?? education
            });
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                <h2 className="dark:text-neutral-200 text-neutral-800 text-sm font-bold">{resume.documentName}</h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink onSave={handleSaveResults} href="/builder" size="sm" name="Go Back" />
                <EnhancerTab resumeId={resume._id} />
            </nav>
        </header>
    )
}