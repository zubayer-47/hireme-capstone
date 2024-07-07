import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFHeadingLink,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { Text, View } from "@react-pdf/renderer";
import type { Projects } from "@/store/resume-types";
import { customHTMLParser } from '@/lib/custom-html-parser';
import { spacing, styles } from "./resume-pdf-utils/resume-pdf-styles";

type PDFProjectsProps = {
    heading: string;
    themeColor: string;
    projects: Projects[];
}

export const PDFProjects = ({
    heading,
    projects,
    themeColor
}: PDFProjectsProps) => {
    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
            {projects.map(({
                url,
                name,
                role,
                date,
                industry,
                descriptions
            }, index) => (
                <View key={index} style={{ ...styles.flexCol }}>
                    <View style={{
                        ...styles.flexRow,
                        alignItems: "flex-start",
                        gap: spacing["2"],
                        paddingBottom: spacing["1"]
                    }}>
                        <ResumePDFText bold={true}>{role}</ResumePDFText>
                        {role && <Text > | </Text>}
                        <ResumePDFHeadingLink src={url} themeColor={themeColor}>{name}</ResumePDFHeadingLink>
                    </View>
                    
                    <View style={{
                        ...styles.flexRow,
                        alignItems: "center",
                        paddingBottom: spacing["1"]
                    }}>
                        <ResumePDFText>{date}</ResumePDFText>
                        {industry && <Text style={{ paddingRight: spacing["1"]}}>,</Text>}
                        <ResumePDFText>{industry}</ResumePDFText>
                    </View>
                    <View
                        style={{
                            ...styles.flexCol,
                        }}>
                        <ResumePDFBulletList items={descriptions} />
                    </View>
                </View>
            ))}
        </ResumePDFSection>
    )
}