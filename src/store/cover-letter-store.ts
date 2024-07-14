import { create } from "zustand";
import { 
    Heading,
    Greeting,
    CoverLetter,
    RecruiterInfo,
    FirstParagraph,
    MiddleParagraph,
    ClosingParagraph, 
} from "./cover-letter-types";

export const defaultHeading: Heading = {
    name: "",
    role: "",
    email: "",
    phone: "",
    date: "",
    linkedInUrl: "",
    githubUrl: "",
}

export const defaultRecruiterInfo: RecruiterInfo = {
    name: "",
    title: "",
    companyName: "",
    address: "",
    cityStateZip: "",
}

export const defaultGreeting: Greeting = {
    greeting: "",
}

export const defaultFirstParagraph: FirstParagraph= {
    text: "",
}

export const defaultMiddleParagraph: MiddleParagraph = {
    text: "",
}

export const defaultClosingParagraph: ClosingParagraph = {
    text: "",
}

export const defaultCoverLetter: CoverLetter = {
    heading: defaultHeading,
    recruiterInfo: defaultRecruiterInfo,
    greeting: defaultGreeting,
    firstParagraph: defaultFirstParagraph,
    middleParagraph: defaultMiddleParagraph,
    closingParagraph: defaultClosingParagraph,
}

type UpdateCoverLetter = {
    // -------------- Update Heading Function ---------------
    setHeading: (
        name: keyof Heading,
        newHeading: Heading[keyof Heading]
    ) => void;

    // -------------- Update RecruiterInfo Function ---------------
    setRecruiterInfo: (
        name: keyof RecruiterInfo,
        newRecruiterInfo: RecruiterInfo[keyof RecruiterInfo]
    ) => void;

    // -------------- Update Greeting Function ---------------
    setGreeting: (
        name: keyof Greeting,
        newGreeting: Greeting[keyof Greeting]
    ) => void;

    // -------------- Update First Paragraph Function ---------------
    setFirstParagraph: (
        name: keyof FirstParagraph,
        newParagraph: FirstParagraph[keyof FirstParagraph]
    ) => void;

    // -------------- Update Middle Paragraph Function ---------------
    setMiddleParagraph: (
        name: keyof MiddleParagraph,
        newParagraph: MiddleParagraph[keyof MiddleParagraph]
    ) => void;

    // -------------- Update Closing Paragraph Function ---------------
    setClosingParagraph: (
        name: keyof ClosingParagraph,
        newParagraph: ClosingParagraph[keyof ClosingParagraph]
    ) => void;
}


export const useCoverLetterStore = create<CoverLetter & UpdateCoverLetter>()((set) => ({
    ...defaultCoverLetter,

    setHeading: (name, newHeading) => {
        set((state) => ({
            heading: {
                ...state.heading,
                [name]: newHeading
            }
        }))
    },

    setRecruiterInfo: (name, newRecruiterInfo) => {
        set((state) => ({
            recruiterInfo: {
                ...state.recruiterInfo,
                [name]: newRecruiterInfo
            }
        }))
    },

    setGreeting: (name, newGreeting) => {
        set((state) => ({
            greeting: {
                ...state.greeting,
                [name]: newGreeting
            }
        }))
    },

    setFirstParagraph: (name, newParagraph) => {
        set((state) => ({
            firstParagraph: {
                ...state.firstParagraph,
                [name]: newParagraph
            }
        }))
    },

    setMiddleParagraph: (name, newParagraph) => {
        set((state) => ({
            middleParagraph: {
                ...state.middleParagraph,
                [name]: newParagraph
            }
        }))
    },

    setClosingParagraph: (name, newParagraph) => {
        set((state) => ({
            closingParagraph: {
                ...state.closingParagraph,
                [name]: newParagraph
            }
        }))
    },
}))