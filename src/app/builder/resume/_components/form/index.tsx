"use client";

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
import { Doc } from "@/convex/_generated/dataModel";

export const ResumeForm = ({ resume }: { resume: Doc<"resume">}) => {
    return (
        <section className="flex justify-center scrollbar scrollbar-track-zinc-300 scrollbar-w-3 h-full md:justify-end md:overflow-y-scroll">
            <article className="flex w-full flex-col gap-8 p-[var(--resume-padding)]">
                <ProfileForm resumeProfile={resume.profile} />
                <CollapsibleForm
                    formTitle="Skills"
                    icon={Brain}
                    addNewFormRef="skills"
                >
                    <SkillsForm resumeSkills={resume.skills} />
                </CollapsibleForm>
                <CollapsibleForm
                    formTitle="Projects"
                    icon={FolderGit}
                    addNewFormRef="projects"
                >
                    <ProjectForm resumeProjects={resume.projects} />
                </CollapsibleForm>
                
                <CollapsibleForm
                    formTitle="Work Experience"
                    icon={Briefcase}
                    addNewFormRef="experience"
                >
                    <WorkExperienceForm resumeWorkExperience={resume.workExperience}  />
                </CollapsibleForm>
                <CollapsibleForm
                    formTitle="Education"
                    icon={GraduationCap}
                    addNewFormRef="education"
                >
                    <EducationForm resumeEducation={resume.education} />
                </CollapsibleForm>
            </article>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </section>
    )
}