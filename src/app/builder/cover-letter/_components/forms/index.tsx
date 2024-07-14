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
        <section className="flex justify-center scrollbar scrollbar-track-zinc-300 scrollbar-w-3 h-full md:justify-end md:overflow-y-scroll">
            <article className="flex w-full flex-col gap-8 p-[var(--resume-padding)]">
                
                <CollapsibleForm
                    formTitle="Skills"
                    icon={Brain}
                    addNewFormRef="skills"
                >
                    <></>
                </CollapsibleForm>
                
                
                
            </article>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </section>
    )
}