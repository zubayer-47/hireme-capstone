import {
    ResumePDFText,
    ResumePDFLink,
    ResumePDFSection,
    ResumePDFBulletList
} from './common/resume-pdf-components';
import { Text, View } from "@react-pdf/renderer";
import type { Projects } from "@/store/resume-types";
import { spacing, styles } from "./resume-pdf-utils/resume-pdf-styles";

type PDFProjectsProps = {
    isPDF: boolean; 
    heading: string;
    themeColor: string;
    projects: Projects[];
}

export const PDFProjects = ({
    isPDF,
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
                        alignItems: "center",
                        gap: spacing["1"],
                        paddingBottom: spacing["0.5"]
                    }}>
                        <ResumePDFText bold={true}>{role}</ResumePDFText>
                        {role && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                        <ResumePDFLink 
                            src={url} 
                            isPDF={isPDF} 
                            fontSize="10pt"
                            isBold
                            themeColor={themeColor}
                            noTextDecoration={false}
                            >
                                {name}
                        </ResumePDFLink>
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