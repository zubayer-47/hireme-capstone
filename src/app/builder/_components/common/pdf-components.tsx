import type { Style } from "@react-pdf/types";
import { Text, View, Link } from "@react-pdf/renderer";
import { FONT_COLOR } from "@/store/document-default-style";
import { DEBUG_PDF_FLAG } from "@/lib/pdf-dimensions";
import { styles, spacing } from "../pdf-styles";

type PDFSectionProps = {
    style?: Style;
    heading: string;
    themeColor?: string;
    children: React.ReactNode;
}

export const PDFSection = ({
    heading,
    children,
    style = {},
    themeColor
}: PDFSectionProps) => {

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
                    debug={DEBUG_PDF_FLAG}
                >
                    {heading}
                </Text>
            </View>
            {children}
        </View>
    )
}


type PDFTextProps = {
    style?: Style;
    bold?: boolean;
    themeColor?: string;
    children: React.ReactNode;
}

export const PDFText = ({
    bold = false,
    themeColor,
    style = {},
    children
}: PDFTextProps) => {
    return (
        <Text
            style={{
                color: themeColor || FONT_COLOR,
                fontWeight: bold ? "bold" : "normal",
                fontSize: "10pt",
                ...style,

            }}
            debug={DEBUG_PDF_FLAG}
        >
            {children}
        </Text>
    )
}

type PDFLinkProps = {
    src: string;
    isPDF: boolean;
    isBold?: boolean;
    fontSize: string;
    themeColor?: string;
    noTextDecoration?: boolean;
    children: React.ReactNode;
}

export const PDFLink = ({
    src,
    isPDF,
    children,
    fontSize,
    themeColor,
    isBold,
    noTextDecoration
}: PDFLinkProps) => {
    if (isPDF) {
        return (
            <Link
                src={src}
                style={{
                    fontWeight: isBold ? "bold" : "normal",
                    fontSize: fontSize,
                    color: themeColor ? themeColor : "#525252",
                    textDecoration: noTextDecoration ? "none" : "underline"
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
                fontWeight: isBold ? "bold" : "normal",
                fontSize: fontSize,
                color: themeColor ? themeColor : FONT_COLOR,
                textDecoration: noTextDecoration ? "none" : "underline"
            }}
        >
            {children}
        </a>
    )
}


type PDFBulletList = {
    items: string[];
}

export const PDFBulletList = ({
    items,
}: PDFBulletList) => {
    return (
        <>
            {items && items.map((item, idx) => (
                <View style={{ ...styles.flexCol, gap: spacing["2"] }} key={idx}>
                    <View style={{ ...styles.flexRow }} >
                        <PDFText
                            style={{
                                lineHeight: "1.3",
                                paddingLeft: spacing["2"],
                                paddingRight: spacing["2"],
                            }}
                        >
                            {"•"}
                        </PDFText>
                        <PDFText style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}>
                            {item || ""}
                        </PDFText>
                    </View>
                </View>
            ))}
        </>
    )
}