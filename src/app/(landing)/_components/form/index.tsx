import { cn } from "@/lib/utils";
import { useState } from "react";
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
    const [isHover, setIsHover] = useState(false);

    return (
        <section className={cn(
            "flex justify-center scrollbar scrollbar-track-zinc-200 scrollbar-w-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
            isHover && "scrollbar-thumb-zinc-400"
        )}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>

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
                <br />
            </article>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </section>
    )
}