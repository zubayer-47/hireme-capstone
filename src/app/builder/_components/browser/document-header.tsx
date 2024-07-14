"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useResumeStore } from "@/store/resume-store";
import { useCoverLetterStore } from "@/store/cover-letter-store";

import { EnhancerTab } from "./enchancer-tab";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLink } from "@/components/button-link";

export const DocumentHeader = ({
    isResume=false,
    resume,
    coverLetter,
}: {
    isResume: boolean,
    resume?: Doc<"resume">
    coverLetter?: Doc<"coverLetter">
}) => {
    const { toast } = useToast();
    const saveCoverLetterResults = useMutation(api.coverLetter.updateCoverLetterFields);
    const saveResumeResults = useMutation(api.resume.updateResumeFields);
    const {
        profile,
        projects,
        skills,
        experiences: workExperience,
        education,
    } = useResumeStore();
    const {
        heading,
        greeting,
        recruiterInfo,
        firstParagraph,
        middleParagraph,
        closingParagraph
    } = useCoverLetterStore();

    const handleSaveResults = async () => {
        try {
            if (isResume && resume) {
                await saveResumeResults({
                    resumeId: resume._id,
                    profile: resume.profile ?? profile,
                    projects: resume.projects ?? projects,
                    skills: resume.skills ?? skills,
                    workExperience: resume.workExperience ?? workExperience,
                    education: resume.education ?? education
                });

                toast({
                    title: "Success",
                    description: `Your resume is successfully saved.`,
                    variant: "default",
                })
            } else if (!isResume && coverLetter) {
                await saveCoverLetterResults({
                    coverLetterId: coverLetter._id,
                    heading,
                    greeting,
                    recruiterInfo,
                    firstParagraph,
                    middleParagraph,
                    closingParagraph
                })

                toast({
                    title: "Success",
                    description: `Your cover letter is successfully saved.`,
                    variant: "success",
                })
            }
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: `Something went wrong saving your ${isResume ? "resume" : "cover letter"}. Please try again later.`,
                variant: "destructive",
            });
        }   
    }

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                <h2 className="dark:text-neutral-200 text-neutral-800 text-sm font-bold">
                {isResume ? resume?.documentName : coverLetter?.documentName}
                </h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink onSave={handleSaveResults} href="/builder" size="sm" name="Go Back" />
                {isResume && resume && <EnhancerTab resumeId={resume._id} />}
            </nav>
        </header>
    )
}