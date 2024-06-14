import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from "./common/resume-pdf-components";
import { View } from "@react-pdf/renderer";
import type { Skills } from "@/store/resume-types";
import { customHTMLParser } from "@/lib/custom-html-parser";

type ResumeSkillsProps = {
    skills: Skills[];
    heading: string;
    themeColor: string;
}

export const ResumeSkills = ({
    skills,
    heading,
    themeColor,
}: ResumeSkillsProps) => {

    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
        {skills.map((skill, index) => (
            <View key={index}>
                <ResumePDFText bold={true}>{skill.heading}</ResumePDFText>
                <ResumePDFText>
                    <ResumePDFBulletList items={customHTMLParser(skill.featuredSkills)} />
                </ResumePDFText>
            </View>
        ))}
        </ResumePDFSection>
    )
}