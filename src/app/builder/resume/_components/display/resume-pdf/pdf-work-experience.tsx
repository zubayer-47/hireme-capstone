import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View } from "@react-pdf/renderer";
import type { Experiences } from "@/store/resume-types";
import { customHTMLParser } from '@/lib/custom-html-parser';
import { styles, spacing } from "./resume-pdf-utils/resume-pdf-styles";

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
                descriptions,
            }, index) => (
                <View
                    key={index}
                    style={{
                        marginTop: spacing["2"],
                    }}
                >
                    <View
                        style={{
                            ...styles.flexRowBetween,
                            marginTop: spacing["2"]
                        }}
                    >
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["2"]
                        }}>
                            <ResumePDFText bold={true}>{company}</ResumePDFText>
                            <ResumePDFText>
                                {title ? "|" : ""}
                            </ResumePDFText>
                            <ResumePDFText>{title}</ResumePDFText>
                        </View>
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["2"]
                        }}>
                            <ResumePDFText>{startDate}</ResumePDFText>
                            <ResumePDFText>
                                {endDate ? "|" : ""}
                            </ResumePDFText>
                            <ResumePDFText>{endDate}</ResumePDFText>
                        </View>
                    </View>
                    <View style={{ ...styles.flexCol, marginTop: `-${spacing["4"]}` }}>
                        <ResumePDFBulletList items={customHTMLParser(descriptions)} />
                    </View>
                </View>
            ))}
        </ResumePDFSection>
    )
}