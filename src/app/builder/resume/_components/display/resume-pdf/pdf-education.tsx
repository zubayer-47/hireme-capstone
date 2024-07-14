import {
    PDFText,
    PDFSection,
} from '../../../../_components/common/pdf-components';
import { View, Text } from "@react-pdf/renderer";
import type { Education } from "@/store/resume-types";
import { styles, spacing } from "../../../../_components/pdf-styles";

type PDFEducationProps = {
    heading: string;
    themeColor: string;
    educations: Education[];
}

export const PDFEducation = ({
    heading,
    educations,
    themeColor,
}: PDFEducationProps) => {
    return (
        <PDFSection themeColor={themeColor} heading={heading} >
            {educations.map(({
                school,
                degree,
                endDate,
                startDate,
                location,
            }, index) => {
                return (
                    <View key={index} style={{ paddingBottom: spacing["1"]}}>
                        <View style={{
                            ...styles.flexRow,
                            gap: spacing["1"]
                        }}>
                        <PDFText bold={true}>{school}</PDFText>
                        {degree && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                        <PDFText bold={true}>{degree}</PDFText>
                        </View>
                        
                        <View style={{
                            ...styles.flexRowBetween,
                            marginTop: spacing["1"]
                        }}
                        >
                            <View style={{
                                ...styles.flexRow,
                                gap: spacing["1"],
                                alignItems: "center"
                            }}
                            >
                                <PDFText>
                                    {startDate}
                                </PDFText>
                                {endDate && <Text> - </Text>}
                                <PDFText>
                                    {endDate}
                                </PDFText>
                                {location && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                                <PDFText>
                                    {location}
                                </PDFText>
                            </View>
                        </View>

                    </View>
                )
            })}
        </PDFSection>
    )
}