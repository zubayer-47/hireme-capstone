import { Page, View, Document } from "@react-pdf/renderer";
import type { Settings } from "@/store/resume-types";
import { CoverLetter } from "@/store/cover-letter-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { PDFHeading } from "./pdf-heading";
import { PDFGreeting } from "./pdf-greeting";
import { PDFRecruiterInfo } from "./pdf-recruiter-info";
import { PDFFirstParagraph } from "./pdf-first-paragraph";
import { PDFMiddleParagraph } from "./pdf-middle-paragraph";
import { PDFClosingParagraph } from "./pdf-closing-paragraph";

import { styles, spacing } from "@/app/builder/_components/pdf-styles";
import { PDFText } from "@/app/builder/_components/common/pdf-components";
import { SuppressWarnings } from "@/app/builder/_components/supress-warnings";

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
    const { heading, recruiterInfo, greeting, firstParagraph, middleParagraph, closingParagraph } = coverLetter;
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
                        <PDFRecruiterInfo
                            recruiterInfo={recruiterInfo}
                        />
                        <PDFGreeting
                            greeting={greeting}
                        />
                        <PDFFirstParagraph
                            firstParagraph={firstParagraph}
                        />
                        <PDFMiddleParagraph
                            middleParagraph={middleParagraph}
                        />
                        <PDFClosingParagraph
                            closingParagraph={closingParagraph}
                        />
                        <View style={{ ...styles.flexCol, gap: spacing["1.5"], marginTop: spacing["4"] }}>
                            <PDFText
                                themeColor={FONT_COLOR}
                                style={{
                                    fontSize: "10pt",
                                }}
                            >
                                Sincerely,
                            </PDFText>
                            <PDFText
                                themeColor={FONT_COLOR}
                                style={{
                                    fontSize: "10pt",
                                }}
                            >
                                {heading.name}
                            </PDFText>
                        </View>

                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}