import {
    PDFText,
    PDFSection,
    PDFBulletList,
} from "../../../../_components/common/pdf-components";
import { View } from "@react-pdf/renderer";
import type { Skills } from "@/store/resume-types";
import { spacing, styles } from "../../../../_components/pdf-styles";

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
        <PDFSection themeColor={themeColor} heading={heading}>
            {skills.map((skill, index) => (
                <View key={index} style={{ ...styles.flexCol, paddingBottom: spacing["1"] }}>
                    <PDFText bold={true}>{skill.heading}</PDFText>
                    <View style={{ ...styles.flexCol }}>
                        <PDFBulletList items={skill.featuredSkills} />
                    </View>
                </View>
            ))}
        </PDFSection>
    )
}