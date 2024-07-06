import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View, Text } from "@react-pdf/renderer";
import type { Education } from "@/store/resume-types";
import { customHTMLParser } from '@/lib/custom-html-parser';
import { styles, spacing } from "./resume-pdf-utils/resume-pdf-styles";

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
        <ResumePDFSection themeColor={themeColor} heading={heading} >
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
                            gap: spacing["2"]
                        }}>
                        <ResumePDFText bold={true}>{school}</ResumePDFText>
                        {degree && <Text > | </Text>}
                        <ResumePDFText bold={true}>{degree}</ResumePDFText>
                        </View>
                        
                        <View style={{
                            ...styles.flexRowBetween,
                            marginTop: spacing["2"]
                        }}
                        >
                            <View style={{
                                ...styles.flexRow,
                                gap: spacing["2"],
                                alignItems: "center"
                            }}
                            >
                                <ResumePDFText>
                                    {startDate}
                                </ResumePDFText>
                                {endDate && <Text> - </Text>}
                                <ResumePDFText>
                                    {endDate}
                                </ResumePDFText>
                                {location && <Text style={{ paddingRight: spacing["1"]}}> | </Text>}
                                <ResumePDFText>
                                    {location}
                                </ResumePDFText>
                            </View>
                        </View>

                    </View>
                )
            })}
        </ResumePDFSection>
    )
}