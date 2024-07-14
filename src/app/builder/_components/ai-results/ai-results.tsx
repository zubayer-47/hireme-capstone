import { UserFeedback } from "./user-feedback";
import { ResultType } from "../../_lib/ai-result-type";
import { ExtractedKeywords } from "./extracted-keywords";
import { JobDescriptionSummary } from "./job-description-summary";
import { CollapsibleDetails } from "@/components/collapsible-details";

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