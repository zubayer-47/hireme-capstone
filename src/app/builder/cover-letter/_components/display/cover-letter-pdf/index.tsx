import type { Resume } from "@/store/resume-types";
import { Doc } from "@/convex/_generated/dataModel";
import type { Settings } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/document-default-style";


import { Page, View, Document } from "@react-pdf/renderer";
import { SuppressWarnings } from "@/app/builder/_components/supress-warnings";
import { styles, spacing } from "@/app/builder/_components/pdf-styles";
import { CoverLetter } from "@/store/cover-letter-types";
import { PDFHeading } from "./pdf-heading";

type CoverLetterPdfProps = {
    isPDF?: boolean;
    settings: Settings;
    coverLetter: CoverLetter;
}


export const CoverLetterPdf = ({ 
    isPDF,
    settings,
    coverLetter
}: CoverLetterPdfProps) => {
    const { heading, recruiterInfo, greeting, firstParagraph, middleParagraph, closingParagraph} = coverLetter;
    const { themeColor: appColor, documentSize, fontFamily, fontSize } = settings;
    const themeColor = appColor || FONT_COLOR;
    return (
        <>
            <Document title={"Cover Letter"} author={"Me"} producer={"Hireme"}>
                <Page
                    size={documentSize === "A4" ? "A4" : "LETTER"}
                    style={{
                        ...styles.flexCol,
                        color: FONT_COLOR,
                        fontFamily: fontFamily,
                        fontSize: fontSize + "pt"
                    }}
                >
                    <View
                        style={{
                            ...styles.flexCol,
                            padding: `${spacing[10]} ${spacing[20]}`
                        }}
                    >
                        <PDFHeading 
                            isPDF={isPDF!}
                            heading={heading}
                            themeColor={themeColor}
                        />
                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}