import {
    ResumePDFText,
    ResumePDFLink,
    ResumePDFSection
} from "./common/resume-pdf-components";
import { View, Text } from "@react-pdf/renderer";
import type { Profile } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/resume-default-style";
import { styles, spacing } from './resume-pdf-utils/resume-pdf-styles';
import { ResumePDFIcon, type IconType } from "./common/resume-pdf-icon";

type PDFProfileProps = {
    isPDF: boolean;
    profile: Profile;
    themeColor: string;
}

export const PDFProfile = ({
    isPDF,
    profile,
    themeColor,
}: PDFProfileProps) => {

    const { name, role, email, phone, linkedInUrl, githubUrl, objective } = profile;
    const srcLinks = { email, phone, linkedInUrl, githubUrl }

    return (
        <View style={{
            ...styles.flexCol,
            gap: spacing["1"],
        }} >
            <View
                style={{
                    ...styles.flexRow,
                    alignItems: "center",
                    gap: spacing["1"]
                }}
            >
                <ResumePDFText
                    bold={true}
                    themeColor={themeColor}
                    style={{ fontSize: "12pt" }}
                >
                    {name}
                </ResumePDFText>
                {role && <Text>|</Text>}
                <ResumePDFText
                    bold={true}
                    themeColor={FONT_COLOR}
                    style={{ fontSize: "11pt" }}
                >
                    {role}
                </ResumePDFText>
            </View>
            <View
                style={{
                    ...styles.flexCol,
                    marginTop: spacing["0.5"],
                }}
            >
                <View style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
                        <ResumePDFLink src={`mailto:${email}`} isPDF={isPDF}>
                            {email}
                        </ResumePDFLink>
                        {phone && <Text>|</Text>}
                        <ResumePDFLink src={`tel:${phone}`} isPDF={isPDF}>
                            {phone}
                        </ResumePDFLink>
                </View>
                <View style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
                        <ResumePDFLink src={linkedInUrl} isPDF={isPDF}>
                            {linkedInUrl}
                        </ResumePDFLink>
                        {githubUrl && <Text>|</Text>}
                        <ResumePDFLink src={githubUrl || ""} isPDF={isPDF}>
                            {githubUrl || ""}
                        </ResumePDFLink>
                </View>
            </View>

            <ResumePDFSection heading="PROFILE" style={{ marginTop: spacing["1.5"], paddingBottom: spacing["0.5"] }} themeColor={themeColor}>
                <ResumePDFText>{objective}</ResumePDFText>
            </ResumePDFSection>
        </View>
    )
}