import {
    PDFText,
    PDFSection,
    PDFLink
} from "../../../../_components/common/pdf-components";
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
                <PDFText
                    bold={true}
                    themeColor={themeColor}
                    style={{ fontSize: "12pt" }}
                >
                    {name}
                </PDFText>
                {role && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                <PDFText
                    bold={true}
                    themeColor={FONT_COLOR}
                    style={{ fontSize: "11pt" }}
                >
                    {role}
                </PDFText>
            </View>
            <View
                style={{
                    ...styles.flexCol,
                    marginTop: spacing["0.5"],
                }}
            >
                <View style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
                    <PDFLink
                        src={`mailto:${email}`}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {email}
                    </PDFLink>

                    {phone && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                    <PDFLink
                        src={`tel:${phone}`}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {phone}
                    </PDFLink>
                </View>
                <View style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
                    <PDFLink
                        src={linkedInUrl}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {linkedInUrl}
                    </PDFLink>
                    {githubUrl && <Text style={{ color: "#737373", fontWeight: "bold"}}>|</Text>}
                    {githubUrl && <PDFLink
                        src={githubUrl}
                        isPDF={isPDF}
                        fontSize="9pt"
                        noTextDecoration
                    >
                        {githubUrl}
                    </PDFLink>}
                </View>
            </View>

            <PDFSection heading="PROFILE" style={{ marginTop: spacing["1.5"], paddingBottom: spacing["0.5"] }} themeColor={themeColor}>
                <PDFText>{objective}</PDFText>
            </PDFSection>
        </View>
    )
}