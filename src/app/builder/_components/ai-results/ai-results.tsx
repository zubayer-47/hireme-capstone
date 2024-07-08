import { ResultType } from "../../_types/ai-result-type";
import { CollapsibleDetails } from "./collapsible-details";
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
            <CollapsibleDetails title="Job Description Summary">
                <JobDescriptionSummary jobDescriptionSummary={job_description_summary} />
            </CollapsibleDetails>
            <CollapsibleDetails title="Extracted Keywords">
                <ExtractedKeywords extractedKeywords={extracted_keywords} />
            </CollapsibleDetails>

            <CollapsibleDetails title="User Feedback">
                <UserFeedback userFeedback={user_feedback} />
            </CollapsibleDetails>
        </>
    );
}