"use client";

import { cn } from "@/lib/utils";
import { SkillsForm } from "./skills-form";
import { ProfileForm } from "./profile-form";
import { ProjectForm } from "./projects-form";
import { EducationForm } from "./education-form";
import { WorkExperienceForm } from "./work-experience";
import { FlexboxSpacer } from "@/components/flexbox-spacer";
import { CollapsibleForm } from "@/components/collapsible-form";

import {
    Brain,
    Briefcase,
    FolderGit,
    GraduationCap
} from "lucide-react";

export const ResumeForm = () => {
    return (
        <section className="flex justify-center scrollbar scrollbar-track-zinc-200 scrollbar-w-3 h-full md:justify-end md:overflow-y-scroll">
            <article className="flex max-w-8xl w-full flex-col gap-8 p-[var(--resume-padding)]">
                <ProfileForm />
                <CollapsibleForm
                    formTitle="Projects"
                    icon={FolderGit}
                    addNewFormRef="projects"
                >
                    <ProjectForm />
                </CollapsibleForm>
                <CollapsibleForm
                    formTitle="Skills"
                    icon={Brain}
                    addNewFormRef="skills"
                >
                    <SkillsForm />
                </CollapsibleForm>
                <CollapsibleForm
                    formTitle="Work Experience"
                    icon={Briefcase}
                    addNewFormRef="experience"
                >
                    <WorkExperienceForm />
                </CollapsibleForm>
                <CollapsibleForm
                    formTitle="Education"
                    icon={GraduationCap}
                    addNewFormRef="education"
                >
                    <EducationForm />
                </CollapsibleForm>
            </article>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </section>
    )
}