import { View } from "@react-pdf/renderer";
import { Greeting } from "@/store/cover-letter-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { PDFText } from "../../../../_components/common/pdf-components";
import { spacing } from "@/app/builder/_components/pdf-styles";

export const PDFGreeting = ({ greeting }: { greeting: Greeting }) => {

    const { greeting: formalGreeting } = greeting;

    return (
        <PDFText
            themeColor={FONT_COLOR}
            style={{ 
                fontSize: "10pt",
                marginTop: spacing["4"],
            }}
        >
            {formalGreeting}
        </PDFText>

    )
}