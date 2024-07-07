import type { Style } from "@react-pdf/types";
import { Text, View, Link } from "@react-pdf/renderer";
import { FONT_COLOR } from "@/store/resume-default-style";
import { DEBUG_RESUME_PDF_FLAG } from "@/lib/resume-dimensions";
import { styles, spacing } from "../resume-pdf-utils/resume-pdf-styles";

type ResumePDFSectionProps = {
    style?: Style;
    heading: string;
    themeColor?: string;
    children: React.ReactNode;
}

export const ResumePDFSection = ({
    heading,
    children,
    style = {},
    themeColor
}: ResumePDFSectionProps) => {

    return (
        <View
            style={{
                ...styles.flexCol,
                gap: spacing["2"],
                marginTop: spacing["1.5"],
                ...style,
            }}
        >
            <View style={{ ...styles.flexCol }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: "10pt",
                        color: themeColor
                    }}
                    debug={DEBUG_RESUME_PDF_FLAG}
                >
                    {heading}
                </Text>
            </View>
            {children}
        </View>
    )
}


type ResumePDFTextProps = {
    style?: Style;
    bold?: boolean;
    themeColor?: string;
    children: React.ReactNode;
}

export const ResumePDFText = ({
    bold = false,
    themeColor,
    style = {},
    children
}: ResumePDFTextProps) => {
    return (
        <Text
            style={{
                color: themeColor || FONT_COLOR,
                fontWeight: bold ? "bold" : "normal",
                fontSize: "10pt",
                ...style,

            }}
            debug={DEBUG_RESUME_PDF_FLAG}
        >
            {children}
        </Text>
    )
}

type ResumePDFLinkProps = {
    src: string;
    isPDF: boolean;
    themeColor?: string;
    children: React.ReactNode;
}

export const ResumePDFLink = ({
    src,
    isPDF,
    children,
    themeColor,
}: ResumePDFLinkProps) => {
    if (isPDF) {
        return (
            <Link 
                src={src} 
                style={{ 
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "10pt",
                    color: themeColor ? themeColor : FONT_COLOR
                }} 
            >
                {children}
            </Link>
        )
    }

    return (
        <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{ 
                fontWeight: "bold",
                fontSize: "10pt",
                color: themeColor
            }}
        >
            {children}
        </a>
    )
}


type ResumePDFBulletList = {
    items: string[];
}

export const ResumePDFBulletList = ({
    items,
}: ResumePDFBulletList) => {
    return (
        <>
            {items && items.map((item, idx) => (
                <View style={{ ...styles.flexCol, gap: spacing["2"]}} key={idx}>
                <View style={{ ...styles.flexRow }} >
                    <ResumePDFText
                        style={{
                            lineHeight: "1.3",
                            paddingLeft: spacing["2"],
                            paddingRight: spacing["2"],
                        }}
                    >
                        {"•"}
                    </ResumePDFText>
                    <ResumePDFText style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}>
                        {item || ""}
                    </ResumePDFText>
                </View>
                </View>
            ))}
        </>
    )
}