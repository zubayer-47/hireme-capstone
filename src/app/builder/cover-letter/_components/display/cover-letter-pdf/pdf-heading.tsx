import {
    PDFText,
    PDFLink
} from "../../../../_components/common/pdf-components";
import { View, Text, } from "@react-pdf/renderer";
import { Heading } from "@/store/cover-letter-types";
import { DEBUG_PDF_FLAG } from "@/lib/pdf-dimensions";
import { FONT_COLOR, SUB_COLOR } from "@/store/document-default-style";
import { styles, spacing } from '../../../../_components/pdf-styles';



type PDFHeadingProps = {
    isPDF: boolean;
    heading: Heading;
    themeColor: string;
}

export const PDFHeading = ({
    isPDF,
    heading,
    themeColor,
}: PDFHeadingProps) => {

    const { name, role, email, phone, linkedInUrl, githubUrl, date } = heading;

    return (
        <>
        <View style={{
            ...styles.flexCol,
            alignItems: "center",
            gap: spacing["1"],
        }} >
            <View
                style={{
                    ...styles.flexCol,
                    alignItems: "center",
                    gap: spacing["1"]
                }}
            >
                <PDFText
                    bold={true}
                    themeColor={themeColor}
                    style={{ fontSize: "14pt" }}
                >
                    {name}
                </PDFText>
                <PDFText
                    bold={true}
                    themeColor={FONT_COLOR}
                    style={{ fontSize: "11pt" }}
                >
                    {role}
                </PDFText>
            </View>

            <View style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
                marginTop: spacing["1"]
            }}
            >
                <PDFLink
                    src={`mailto:${email}`}
                    isPDF={isPDF}
                    fontSize="9pt"
                    noTextDecoration
                >
                    {email}
                </PDFLink>

                {phone && <Text style={{ color: SUB_COLOR, fontWeight: "bold" }}>|</Text>}
                <PDFLink
                    src={`tel:${phone}`}
                    isPDF={isPDF}
                    fontSize="9pt"
                    noTextDecoration
                >
                    {phone}
                </PDFLink>
                {linkedInUrl && <Text style={{ color: SUB_COLOR, fontWeight: "bold" }}>|</Text>}
                <PDFLink
                    src={linkedInUrl}
                    isPDF={isPDF}
                    fontSize="9pt"
                    noTextDecoration
                >
                    {linkedInUrl}
                </PDFLink>
                {githubUrl && <Text style={{ color: SUB_COLOR, fontWeight: "bold" }}>|</Text>}
                {githubUrl && <PDFLink
                    src={githubUrl}
                    isPDF={isPDF}
                    fontSize="9pt"
                    noTextDecoration
                >
                    {githubUrl}
                </PDFLink>}
            </View>
            <View
                style={{
                height: "3.75pt",
                width: "100%",
                backgroundColor: themeColor,
            }}
                debug={DEBUG_PDF_FLAG}
            />
        </View>
        <PDFText style={{
                textAlign: "left",
                marginTop: spacing["4"], 
                paddingBottom: spacing["0.5"]
            }}>
                {date}
            </PDFText>
        </>
    )
}