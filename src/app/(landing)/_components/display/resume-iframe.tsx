"use client";

import {
    A4_WIDTH_PX,
    A4_WIDTH_PT,
    A4_HEIGHT_PX,
    LETTER_WIDTH_PX,
    LETTER_WIDTH_PT,
    LETTER_HEIGHT_PX,
} from "@/lib/resume-dimensions";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Frame from "react-frame-component";
import { ENGLISH_FONT_FAMILIES } from "@/lib/resume-fonts";

const loadInitialContent = (isA4: boolean) => {
    const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
    const allFontFamilies = [...ENGLISH_FONT_FAMILIES];

    const allFontLoadedLinks = allFontFamilies.map(
        (
          font
        ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
  @font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
      )
      .join("");

    const allFontFaces = allFontFamilies.map((font) => (
        `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
        @font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )).join("");

    return `<!DOCTYPE html>
            <html>
            <head>
                ${allFontLoadedLinks}
                <style>
                ${allFontFaces}
                </style>
            </head>
            <body style='overflow: hidden; width: ${width}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
                <div></div>
            </body>
            </html>`
}

type ResumeIframeProps = {
    scale: number;
    documentSize: string;
    children: React.ReactNode;
    enablePDFViewer?: boolean;
}

const ResumeIframe = ({
    scale,
    children,
    documentSize,
    enablePDFViewer = false,
}: ResumeIframeProps) => {
    const isA4 = documentSize === "A4";
    const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
    const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

    const iframeInitialContent = useMemo(() => {
        loadInitialContent(isA4)
    }, [isA4]);

    if (enablePDFViewer) {
        return (
            <DynamicPDFViewer className="h-full w-full">
                {children as any}
            </DynamicPDFViewer>
        )
    }

    return (
        <div style={{
            maxWidth: `${width * scale}px`,
            maxHeight: `${height * scale}px`,
        }}>
            <div
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scale(${scale})`,
                }}
                className={`origin-top-left bg-white shadow-lg`}
            >
                <Frame style={{ width: "100%", height: "100%" }} initialContent={iframeInitialContent!} key={isA4 ? "A4" : "LETTER"}>
                    {children}
                </Frame>
            </div>

        </div>
    )
}

export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
    ssr: false,
});

const DynamicPDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
    {
        ssr: false,
    }
);