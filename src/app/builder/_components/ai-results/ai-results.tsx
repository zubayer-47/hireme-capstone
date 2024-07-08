import {ResultType} from "../../_types/ai-result-type";
import { ExtractedKeywords } from "./extracted-keywords";
import { JobDescriptionSummary } from "./job-description-summary";
import { UserFeedback } from "./user-feedback";

export const AIResults = ({ results }: { results: ResultType | null }) => {
    if (!results) return null;

    const {
        job_description_summary,
        extracted_keywords,
        user_feedback
    } = results;
    console.log(job_description_summary)
    return (
        <>
            <JobDescriptionSummary jobDescriptionSummary={job_description_summary} />
            <ExtractedKeywords extractedKeywords={extracted_keywords} />
            <UserFeedback userFeedback={user_feedback} />
        </>
    );
}