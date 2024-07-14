import type { Resume } from "@/store/resume-types";
import { Doc } from "@/convex/_generated/dataModel";
import type { Settings } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/document-default-style";


import { Page, View, Document } from "@react-pdf/renderer";
import { SuppressWarnings } from "@/app/builder/resume/_components/display/resume-pdf/common/supress-warnings";
import { styles, spacing } from "@/app/builder/resume/_components/display/resume-pdf/resume-pdf-utils/resume-pdf-styles";

type CoverLetterPdfProps = {
    settings: Settings;
}


export const CoverLetterPdf = ({ settings }: CoverLetterPdfProps) => {
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
                            padding: `${spacing[5]} ${spacing[10]}`
                        }}
                    >

                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}