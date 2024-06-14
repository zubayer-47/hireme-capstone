"use client";

import { useEffect } from "react";
import { Font } from "@react-pdf/renderer";
import { ENGLISH_FONT_FAMILIES } from "@/lib/resume-fonts";

export const useLoadFonts = () => {
    useEffect(() => {
        const allFontFamilies = [...ENGLISH_FONT_FAMILIES];
        allFontFamilies.forEach((fontFamily) => {
            Font.register({
                family: fontFamily,
                fonts: [
                    {
                        src: `/fonts/${fontFamily}-Regular.ttf`,
                    },
                    {
                        src: `/fonts/${fontFamily}-Bold.ttf`,
                        fontWeight: "bold",
                    },
                ],
            });
        });
    }, []);
};

export const useHyphenationCallback = (fontFamily: string) => {
    useEffect(() => {
        if (ENGLISH_FONT_FAMILIES.includes(fontFamily as any)) {
            Font.registerHyphenationCallback((word) => [word]);
        } else {
            Font.registerHyphenationCallback((word) =>
                word
                    .split("")
                    .map((char) => [char, ""])
                    .flat()
            );
        }
    }, [fontFamily]);
};
