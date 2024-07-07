// -------------------------------------------------------------
// ------------------- Resume Store Types ----------------------
// -------------------------------------------------------------
export type Profile = {
    name: string;
    role: string;
    email: string;
    phone: string;
    linkedInUrl: string;
    githubUrl?: string;
    objective: string;
}

export type Experiences = {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    descriptions: string;
}

export type Education = {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    location: string;
}

export type Projects = {
    name: string;
    url: string;
    role: string;
    date: string;
    industry: string;
    descriptions: string[]
}

export type Skills = {
    heading: string;
    featuredSkills: string;
}

export type Resume = {
    profile: Profile;
    projects: Projects[];
    skills: Skills[];
    experiences: Experiences[];
    education: Education[];
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

// Exclude most of Settings types besides the resumeStyle type
export type GeneralSetting = Exclude<keyof Settings,
    "orderForm" | "formHeading" | "formsOrder"
>




