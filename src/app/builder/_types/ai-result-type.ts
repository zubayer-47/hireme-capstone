import { Id } from "@/convex/_generated/dataModel";

export interface JobDescriptionSummary {
    jobPosition: string;
    companyName: string;
    location: string;
    employmentType: string;
    responsibilities: string[];
    requiredSkills: string[];
    preferredQualifications: string[];
    experienceLevel: string;
    educationalRequirement: string;
    salaryRange: string;
    benefits: string[];
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
    _id: Id<"results">;
    _creationTime: number;
    userId: Id<"users">;
    resumeId: Id<"resume">;
    jobDescriptionSummary: JobDescriptionSummary;
    extractedKeywords: ExtractedKeywords;
    userFeedback: UserFeedback;
}


