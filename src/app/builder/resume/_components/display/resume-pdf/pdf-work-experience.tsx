import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View, Text } from "@react-pdf/renderer";
import type { Experiences } from "@/store/resume-types";
import { styles, spacing } from "../../../../_components/pdf-styles";

type PDFWorkExperienceProps = {
    heading: string;
    themeColor: string;
    experiences: Experiences[]
}

export const PDFWorkExperience = ({
    heading,
    themeColor,
    experiences,
}: PDFWorkExperienceProps) => {
    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
            {experiences.map(({
                title,
                company,
                endDate,
                startDate,
                location,
                descriptions,
            }, index) => (
                <View
                    key={index}
                    style={{
                        paddingBottom: spacing["1"],
                    }}
                >
                    <View
                        style={{
                            ...styles.flexCol,
                        }}
                    >
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["1"],
                            paddingBottom: spacing["0.5"]
                        }}>
                            <ResumePDFText bold={true}>{title}</ResumePDFText>
                            {company && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                            <ResumePDFText bold={true}>{company}</ResumePDFText>
                        </View>
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["1"],
                            paddingBottom: spacing["1"]
                        }}>
                            <ResumePDFText>{startDate}</ResumePDFText>
                            {endDate && <Text style={{ color: "#737373", fontWeight: "bold"}}>-</Text> }
                            <ResumePDFText>{endDate}</ResumePDFText>
                            {location && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text> }
                            <ResumePDFText>{location}</ResumePDFText>
                        </View>
                    </View>
                    <View style={{ ...styles.flexCol }}>
                        <ResumePDFBulletList items={descriptions} />
                    </View>
                </View>
            ))}
        </ResumePDFSection>
    )
}