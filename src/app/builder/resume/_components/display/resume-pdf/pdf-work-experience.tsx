import {
    PDFText,
    PDFSection,
    PDFBulletList,
} from '../../../../_components/common/pdf-components';
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
        <PDFSection themeColor={themeColor} heading={heading}>
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
                            <PDFText bold={true}>{title}</PDFText>
                            {company && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                            <PDFText bold={true}>{company}</PDFText>
                        </View>
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["1"],
                            paddingBottom: spacing["1"]
                        }}>
                            <PDFText>{startDate}</PDFText>
                            {endDate && <Text style={{ color: "#737373", fontWeight: "bold"}}>-</Text> }
                            <PDFText>{endDate}</PDFText>
                            {location && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text> }
                            <PDFText>{location}</PDFText>
                        </View>
                    </View>
                    <View style={{ ...styles.flexCol }}>
                        <PDFBulletList items={descriptions} />
                    </View>
                </View>
            ))}
        </PDFSection>
    )
}