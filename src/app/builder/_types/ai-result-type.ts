export interface JobDescriptionSummary {
    "Job Position": string;
    "Company Name": string;
    "Location": string;
    "Employment Type": string;
    "Responsibilities": string[];
    "Required Skills": string[];
    "Preferred Qualifications": string[];
    "Experience Level": string;
    "Educational Requirements": string;
    "Salary Range": string | null;
    "Benefits": string | null;
}

export interface Keyword {
    keyword: string;
}

export interface ExtractedKeywords {
    high_importance: Keyword[];
    medium_importance: Keyword[];
    low_importance: Keyword[];
}

export interface UserFeedback {
    matching_elements: string[];
    missing_elements: string[];
    suggestions: string[];
}

export interface ResultType {
    job_description_summary: JobDescriptionSummary;
    extracted_keywords: ExtractedKeywords;
    user_feedback: UserFeedback;
}

