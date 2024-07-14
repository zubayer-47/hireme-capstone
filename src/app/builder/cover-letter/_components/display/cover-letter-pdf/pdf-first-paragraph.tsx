import { FirstParagraph } from "@/store/cover-letter-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { PDFText } from "../../../../_components/common/pdf-components";
import { spacing } from "@/app/builder/_components/pdf-styles";

export const PDFFirstParagraph = ({ firstParagraph }: { firstParagraph: FirstParagraph }) => {

    const { text } = firstParagraph;

    return (
        <PDFText
            themeColor={FONT_COLOR}
            style={{
                fontSize: "10pt",
                marginTop: spacing["4"],
                textAlign: "justify"
            }}
        >
            {text}
        </PDFText>

    )
}