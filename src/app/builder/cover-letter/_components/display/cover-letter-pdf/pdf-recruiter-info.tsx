import { View } from "@react-pdf/renderer";
import { RecruiterInfo } from "@/store/cover-letter-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { styles, spacing } from '../../../../_components/pdf-styles';
import { PDFText } from "../../../../_components/common/pdf-components";

export const PDFRecruiterInfo = ({ recruiterInfo }: { recruiterInfo: RecruiterInfo }) => {

    const { name, title, companyName, address, cityStateZip } = recruiterInfo;

    return (
        <View
            style={{
                ...styles.flexCol,
                alignItems: "flex-start",
                gap: spacing["0.5"],
                marginTop: spacing["4"]
            }}
        >
            <PDFText
                bold={true}
                themeColor={FONT_COLOR}
                style={{ fontSize: "10pt" }}
            >
                {name}
            </PDFText>
            <PDFText
                themeColor={FONT_COLOR}
                style={{ fontSize: "10pt" }}
            >
                {title}
            </PDFText>
            <PDFText
                themeColor={FONT_COLOR}
                style={{ fontSize: "10pt" }}
            >
                {companyName}
            </PDFText>
            <PDFText
                themeColor={FONT_COLOR}
                style={{ fontSize: "10pt" }}
            >
                {address}
            </PDFText>
            <PDFText
                themeColor={FONT_COLOR}
                style={{ fontSize: "10pt" }}
            >
                {cityStateZip}
            </PDFText>
        </View>
    )
}