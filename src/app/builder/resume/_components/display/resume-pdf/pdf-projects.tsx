import {
    PDFText,
    PDFLink,
    PDFSection,
    PDFBulletList
} from '../../../../_components/common/pdf-components';
import { Text, View } from "@react-pdf/renderer";
import type { Projects } from "@/store/resume-types";
import { spacing, styles } from "../../../../_components/pdf-styles";

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
        <PDFSection themeColor={themeColor} heading={heading}>
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
                        <PDFText bold={true}>{role}</PDFText>
                        {role && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                        <PDFLink 
                            src={url} 
                            isPDF={isPDF} 
                            fontSize="10pt"
                            isBold
                            themeColor={themeColor}
                            noTextDecoration={false}
                            >
                                {name}
                        </PDFLink>
                    </View>
                    
                    <View style={{
                        ...styles.flexRow,
                        alignItems: "center",
                        paddingBottom: spacing["1"]
                    }}>
                        <PDFText>{date}</PDFText>
                        {industry && <Text style={{ paddingRight: spacing["1"]}}>,</Text>}
                        <PDFText>{industry}</PDFText>
                    </View>
                    <View
                        style={{
                            ...styles.flexCol,
                        }}>
                        <PDFBulletList items={descriptions} />
                    </View>
                </View>
            ))}
        </PDFSection>
    )
}