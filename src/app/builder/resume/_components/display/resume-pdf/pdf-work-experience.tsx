import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View, Text } from "@react-pdf/renderer";
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
                            gap: spacing["2"],
                            paddingBottom: spacing["1"]
                        }}>
                            <ResumePDFText bold={true}>{title}</ResumePDFText>
                            {company && <Text> | </Text>}
                            <ResumePDFText bold={true}>{company}</ResumePDFText>
                        </View>
                        <View style={{
                            ...styles.flexRow,
                            alignItems: "center",
                            gap: spacing["2"],
                            paddingBottom: spacing["2"]
                        }}>
                            <ResumePDFText>{startDate}</ResumePDFText>
                            {endDate && <Text> - </Text> }
                            <ResumePDFText>{endDate}</ResumePDFText>
                            {location && <Text> | </Text> }
                            <ResumePDFText>{location}</ResumePDFText>
                        </View>
                    </View>
                    <View style={{ ...styles.flexCol }}>
                        <ResumePDFBulletList items={customHTMLParser(descriptions)} />
                    </View>
                </View>
            ))}
        </ResumePDFSection>
    )
}