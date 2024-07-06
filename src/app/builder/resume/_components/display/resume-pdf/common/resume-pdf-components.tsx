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
                marginTop: spacing["5"],
                ...style,
            }}
        >
            <View style={{ ...styles.flexCol }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: "11pt",
                        paddingBottom: spacing["2"],
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
    children: React.ReactNode;
}

export const ResumePDFLink = ({
    src,
    isPDF,
    children
}: ResumePDFLinkProps) => {
    if (isPDF) {
        return (
            <Link src={src} style={{ fontWeight: "bold" }} >
                {children}
            </Link>
        )
    }

    return (
        <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
        >
            {children}
        </a>
    )
}


type ResumePDFHeadingLinkProps = {
    src: string;
    themeColor: string;
    children: React.ReactNode;
}

export const ResumePDFHeadingLink = ({
    src,
    children,
    themeColor,
}: ResumePDFHeadingLinkProps) => {
    return (
        <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{
                fontSize: "11pt",
                fontWeight: "bold",
                color: themeColor,
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
                <View style={{ ...styles.flexCol, gap: spacing["2"]}}>
                <View style={{ ...styles.flexRow }} key={idx}>
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