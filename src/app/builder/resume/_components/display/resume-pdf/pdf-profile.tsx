import {
    ResumePDFText,
    ResumePDFSection,
    ResumePDFLink
} from "./common/resume-pdf-components";
import { View, Text, } from "@react-pdf/renderer";
import type { Profile } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/document-default-style";
import { styles, spacing } from '../../../../_components/pdf-styles';

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
                {role && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
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
                    <ResumePDFLink
                        src={`mailto:${email}`}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {email}
                    </ResumePDFLink>

                    {phone && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                    <ResumePDFLink
                        src={`tel:${phone}`}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {phone}
                    </ResumePDFLink>
                </View>
                <View style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
                    <ResumePDFLink
                        src={linkedInUrl}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {linkedInUrl}
                    </ResumePDFLink>
                    {githubUrl && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                    {githubUrl && <ResumePDFLink
                        src={githubUrl}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {githubUrl}
                    </ResumePDFLink>}
                </View>
            </View>

            <ResumePDFSection heading="PROFILE" style={{ marginTop: spacing["1.5"], paddingBottom: spacing["0.5"] }} themeColor={themeColor}>
                <ResumePDFText>{objective}</ResumePDFText>
            </ResumePDFSection>
        </View>
    )
}