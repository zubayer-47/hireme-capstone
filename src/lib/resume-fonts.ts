const SANS_SERIF_ENGLISH_FONT_FAMILIES = [
    "Lato",
    "Roboto",
    "Raleway",
    "OpenSans",
    "Montserrat",
] as const;

const SERIF_ENGLISH_FONT_FAMILIES = [
    "Lora",
    "Caladea",
    "RobotoSlab",
    "Merriweather",
    "PlayfairDisplay",
] as const;

export const ENGLISH_FONT_FAMILIES = [
    ...SANS_SERIF_ENGLISH_FONT_FAMILIES,
    ...SERIF_ENGLISH_FONT_FAMILIES,
];
type EnglishFontFamily = (typeof ENGLISH_FONT_FAMILIES)[number];


export type FontFamily = EnglishFontFamily;
export const FONT_FAMILY_TO_STANDARD_SIZE_IN_PT: Record<FontFamily, number> = {
    Lato: 11,
    Lora: 11,
    Roboto: 11,
    Raleway: 10,
    Caladea: 11,
    OpenSans: 10,
    Montserrat: 10,
    RobotoSlab: 10,
    Merriweather: 10,
    PlayfairDisplay: 10,
};

export const FONT_FAMILY_TO_DISPLAY_NAME: Record<FontFamily, string> = {
    Lato: "Lato",
    Lora: "Lora",
    Roboto: "Roboto",
    Raleway: "Raleway",
    Caladea: "Caladea",
    OpenSans: "Open Sans",
    RobotoSlab: "Roboto Slab",
    Montserrat: "Montserrat",
    Merriweather: "Merriweather",
    PlayfairDisplay: "Playfair Display",
};
