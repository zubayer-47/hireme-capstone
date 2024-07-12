import { ResultType } from "../../_lib/ai-result-type";
import { CollapsibleDetails } from "./collapsible-details";
import { ExtractedKeywords } from "./extracted-keywords";
import { JobDescriptionSummary } from "./job-description-summary";
import { UserFeedback } from "./user-feedback";

export const AIResults = ({ results }: { results: ResultType | null | undefined }) => {
    if (!results) return null;

    const {
        jobDescriptionSummary,
        extractedKeywords,
        userFeedback
    } = results;

    return (
        <>
            <CollapsibleDetails title="Job Description Summary">
                <JobDescriptionSummary jobDescriptionSummary={jobDescriptionSummary} />
            </CollapsibleDetails>
            <CollapsibleDetails title="Extracted Keywords">
                <ExtractedKeywords extractedKeywords={extractedKeywords} />
            </CollapsibleDetails>

            <CollapsibleDetails title="User Feedback">
                <UserFeedback userFeedback={userFeedback} />
            </CollapsibleDetails>
        </>
    );
}