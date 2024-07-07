import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from "./common/resume-pdf-components";
import { View } from "@react-pdf/renderer";
import type { Skills } from "@/store/resume-types";
import { spacing, styles } from "./resume-pdf-utils/resume-pdf-styles";

type PDFSkillsProps = {
    skills: Skills[];
    heading: string;
    themeColor: string;
}

export const PDFSkills = ({
    skills,
    heading,
    themeColor,
}: PDFSkillsProps) => {

    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
        {skills.map((skill, index) => (
            <View key={index} style={{ ...styles.flexCol}}>
                <ResumePDFText bold={true}>{skill.heading}</ResumePDFText>
                <ResumePDFText>
                    <ResumePDFBulletList items={skill.featuredSkills} />
                </ResumePDFText>
            </View>
        ))}
        </ResumePDFSection>
    )
}