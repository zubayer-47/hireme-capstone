import { FlexboxSpacer } from "@/components/flexbox-spacer";
import { CollapsibleForm } from "@/components/collapsible-form";

import {
    Brain,
    Briefcase,
    FolderGit,
    GraduationCap
} from "lucide-react";
import { HeadingForm } from "./heading-form";
import { CollapsibleDetails } from "@/components/collapsible-details";
import { RecruiterInfoForm } from "./recruiter-info-form";
import { GreetingForm } from "./greeting-form";
import { FirstParagraphForm } from "./first-paragraph-form";
import { MiddleParagraphForm } from "./middle-paragraph-form";
import { ClosingParagraphForm } from "./closing-paragraph-form";


export const CoverLetterForm = () => {
    return (
        <section className="flex justify-center scrollbar scrollbar-track-zinc-300 scrollbar-w-3 h-full md:justify-end md:overflow-y-scroll">
            <article className="flex w-full flex-col gap-8 p-[var(--resume-padding)]">
                <HeadingForm />
                <CollapsibleDetails title="Recruiter Info">
                    <RecruiterInfoForm />
                </CollapsibleDetails>
                <CollapsibleDetails title="Greeting">
                    <GreetingForm />
                </CollapsibleDetails>
                <CollapsibleDetails title="First Paragraph">
                    <FirstParagraphForm />
                </CollapsibleDetails>
                <CollapsibleDetails title="Middle Paragraph">
                    <MiddleParagraphForm />
                </CollapsibleDetails>
                <CollapsibleDetails title="Closing Paragraph">
                    <ClosingParagraphForm />
                </CollapsibleDetails>
            </article>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </section>
    )
}