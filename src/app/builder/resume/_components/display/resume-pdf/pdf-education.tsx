import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View } from "@react-pdf/renderer";
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
                gpa,
                school,
                degree,
                endDate,
                startDate,
                descriptions,
            }, index) => {
                const showDescriptions = descriptions !== "";
                return (
                    <View key={index}>
                        <ResumePDFText bold={true}>{school}</ResumePDFText>
                        <View style={{
                            ...styles.flexRowBetween,
                            marginTop: spacing["2"]
                        }}
                        >
                            <ResumePDFText>
                                {`${gpa ? `${degree} - ${Number(gpa) ? gpa + " GPA" : gpa}` : degree}`}
                            </ResumePDFText>
                            <View style={{
                                ...styles.flexRow,
                                gap: spacing["2"],
                                alignItems: "center"
                            }}
                            >
                                <ResumePDFText>
                                    {startDate}
                                </ResumePDFText>
                                <ResumePDFText>
                                    {endDate ? "|" : ""}
                                </ResumePDFText>
                                <ResumePDFText>
                                    {endDate}
                                </ResumePDFText>
                            </View>
                        </View>
                        {showDescriptions && (
                            <View style={{ ...styles.flexCol, marginTop: `${spacing["2"]}` }}>
                                <ResumePDFBulletList items={customHTMLParser(descriptions || "")} />
                            </View>
                        )}
                    </View>
                )
            })}
        </ResumePDFSection>
    )
}