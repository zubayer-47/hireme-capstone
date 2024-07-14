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
import { Doc } from "@/convex/_generated/dataModel";

type CoverLetterPdfProps = {
    isPDF?: boolean;
    settings: Settings;
    coverLetter: CoverLetter;
    coverLetterDetails: Doc<"coverLetter">
}

export const CoverLetterPdf = ({
    isPDF,
    settings,
    coverLetter,
    coverLetterDetails
}: CoverLetterPdfProps) => {
    const { heading, recruiterInfo, greeting, firstParagraph, middleParagraph, closingParagraph } = coverLetter;
    const { themeColor: appColor, documentSize, fontFamily, fontSize } = settings;
    const themeColor = appColor || FONT_COLOR;
    return (
        <>
            <Document title={`${coverLetterDetails?.heading?.name!} Cover Letter`} author={`${coverLetterDetails?.heading?.name!}`} producer={"Hireme"}>
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
                            heading={coverLetterDetails.heading ?? heading}
                            themeColor={themeColor}
                        />
                        <PDFRecruiterInfo
                            recruiterInfo={coverLetterDetails.recruiterInfo ?? recruiterInfo}
                        />
                        <PDFGreeting
                            greeting={coverLetterDetails.greeting ?? greeting}
                        />
                        <PDFFirstParagraph
                            firstParagraph={coverLetterDetails.firstParagraph ?? firstParagraph}
                        />
                        <PDFMiddleParagraph
                            middleParagraph={coverLetterDetails.middleParagraph ?? middleParagraph}
                        />
                        <PDFClosingParagraph
                            closingParagraph={coverLetterDetails.closingParagraph ?? closingParagraph}
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
                                {coverLetterDetails?.heading?.name! ?? heading.name}
                            </PDFText>
                        </View>

                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}