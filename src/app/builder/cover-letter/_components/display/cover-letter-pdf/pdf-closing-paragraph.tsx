import { ClosingParagraph } from "@/store/cover-letter-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { PDFText } from "../../../../_components/common/pdf-components";
import { spacing } from "@/app/builder/_components/pdf-styles";

export const PDFClosingParagraph = ({ closingParagraph }: { closingParagraph: ClosingParagraph }) => {

    const { text } = closingParagraph;

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