import { v } from "convex/values";
/* -------------------------------------------------------------------------- */
/*                                   Resume                                   */
/* -------------------------------------------------------------------------- */
export const Profile = v.object({
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    objective: v.string(),
    linkedInUrl: v.string(),
    githubUrl: v.optional(v.string()),
})

export const Projects = v.object({
    url: v.string(),
    name: v.string(),
    role: v.string(),
    date: v.string(),
    industry: v.string(),
    descriptions: v.array(v.string()),
});

export const Skills = v.object({
    heading: v.string(),
    featuredSkills: v.array(v.string()),
});

export const WorkExperience = v.object({
    title: v.string(),
    company: v.string(),
    endDate: v.string(),
    startDate: v.string(),
    location: v.string(),
    descriptions: v.array(v.string()),
});

export const Education = v.object({  
    school: v.string(),
    degree: v.string(),
    location: v.string(),
    endDate: v.string(),
    startDate: v.string(),
})

/* -------------------------------------------------------------------------- */
/*                             Cover Letter                                   */
/* -------------------------------------------------------------------------- */
export const Heading = v.object({
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    date: v.string(),
    linkedInUrl: v.string(),
    githubUrl: v.optional(v.string()),
})

export const RecruiterInfo = v.object({
    name: v.string(),
    title: v.string(),
    companyName: v.string(),
    address: v.string(),
    cityStateZip: v.string(),
});

export const Greeting = v.object({
    greeting: v.string()
});

export const FirstParagraph = v.object({
    text: v.string()
});

export const MiddleParagraph = v.object({
    text: v.string()
});

export const ClosingParagraph = v.object({
    text: v.string()
});



/* -------------------------------------------------------------------------- */
/*                                Applications                                */
/* -------------------------------------------------------------------------- */
export const ApplicationStatus = v.union(
    v.literal("applied"),
    v.literal("interviewed"),
    v.literal("offered"),
    v.literal("rejected"),
)

/* -------------------------------------------------------------------------- */
/*                                 AI RESULTS                                 */
/* -------------------------------------------------------------------------- */
export interface JobDescriptionSummary {
    jobPosition: string;
    companyName: string;
    location: string;
    employmentType: string;
    salaryRange: string;
    experienceLevel: string;
    benefits: string[];
    requiredSkills: string[];
    responsibilities: string[];
    educationalRequirement: string;
    preferredQualifications: string[];
}

export interface ExtractedKeywords {
    highImportance: string[];
    mediumImportance: string[];
    lowImportance: string[];
}

export interface UserFeedback {
    matchingElements: string[];
    missingElements: string[];
    suggestions: string[];
}

export interface ResultType {
    jobDescriptionSummary: JobDescriptionSummary;
    extractedKeywords: ExtractedKeywords;
    userFeedback: UserFeedback;
}


