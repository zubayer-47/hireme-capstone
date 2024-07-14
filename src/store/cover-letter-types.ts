// -------------------------------------------------------------
// ------------------- Resume Store Types ----------------------
// -------------------------------------------------------------
export type Heading = {
    name: string;
    role: string;
    email: string;
    phone: string;
    date: string;
    linkedInUrl: string;
    githubUrl?: string;
}

export type RecruiterInfo = {
    name: string;
    title: string;
    companyName: string;
    address: string;
    cityStateZip: string;
}

export type Greeting = {
    greeting: string;
}

export type FirstParagraph= {
    text: string;
}

export type MiddleParagraph = {
    text: string;
}

export type ClosingParagraph = {
    text: string;
}

export type CoverLetter = {
    heading: Heading;
    recruiterInfo: RecruiterInfo;
    greeting: Greeting;
    firstParagraph: FirstParagraph;
    middleParagraph: MiddleParagraph;
    closingParagraph: ClosingParagraph;
}

// -------------------------------------------------------------
// ------------------- Settings Store Types --------------------
// -------------------------------------------------------------
export type Settings = {
    themeColor: string;
    fontFamily: string;
    fontSize: string;
    documentSize: string;

    formOrder: {
        projects: boolean;
        skills: boolean;
        experience: boolean;
        education: boolean;
    };

    formHeading: {
        projects: string;
        skills: string;
        experience: string;
        education: string;
    };

    formsOrder: DisplayOrderForm[]

}

export type DisplayOrderForm = keyof Settings["formOrder"];






