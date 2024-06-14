import { Settings } from "./resume-types";

// RESUME DEFAULT STYLES
export const FONT_SIZE = '11';
export const FONT_FAMILY = 'Lato';
export const FONT_COLOR = '#171717';
export const COLOR_THEME = '#1452CC';

export const defaultSettings: Settings = {
    themeColor: COLOR_THEME,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    documentSize: "Letter",

    formOrder: {
        projects: true,
        skills: true,
        experience: true,
        education: true
    },
    formHeading: {
        projects: "PROJECTS",
        skills: "SKILLS",
        experience: "WORKS EXPERIENCES",
        education: "EDUCATION"
    },
    formsOrder: ["projects", "skills", "experience", "education"]
};