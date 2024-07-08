import ResultType from "../_types/ai-result-type";

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
            <h3 className="text-lg font-semibold">Job Description Summary</h3>
            <p><strong>Position:</strong> {job_description_summary["Job Position"]}</p>
            <p><strong>Company:</strong> {job_description_summary["Company Name"]}</p>
            <p><strong>Location:</strong> {job_description_summary["Location"]}</p>
            <p><strong>Employment Type:</strong> {job_description_summary["Employment Type"]}</p>
            <h4 className="mt-4 text-md font-semibold">Responsibilities</h4>
            <ul className="list-disc pl-5">
                {job_description_summary.Responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Required Skills</h4>
            <ul className="list-disc pl-5">
                {job_description_summary["Required Skills"].map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Preferred Qualifications</h4>
            <ul className="list-disc pl-5">
                {job_description_summary["Preferred Qualifications"].map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Experience Level</h4>
            <p>{job_description_summary["Experience Level"]}</p>
            <h4 className="mt-4 text-md font-semibold">Educational Requirements</h4>
            <p>{job_description_summary["Educational Requirements"]}</p>




            <h3 className="mt-6 text-lg font-semibold">Extracted Keywords</h3>
            <h4 className="mt-4 text-md font-semibold">High Importance</h4>
            <ul className="list-disc pl-5">
                {extracted_keywords.high_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Medium Importance</h4>
            <ul className="list-disc pl-5">
                {extracted_keywords.medium_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Low Importance</h4>
            <ul className="list-disc pl-5">
                {extracted_keywords.low_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>




            <h3 className="mt-6 text-lg font-semibold">User Feedback</h3>
            <h4 className="mt-4 text-md font-semibold">Matching Elements</h4>
            <ul className="list-disc pl-5">
                {user_feedback.matching_elements.length > 0 ? (
                    user_feedback.matching_elements.map((element, index) => (
                        <li key={index}>{element}</li>
                    ))
                ) : (
                    <li>None</li>
                )}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Missing Elements</h4>
            <ul className="list-disc pl-5">
                {user_feedback.missing_elements.map((element, index) => (
                    <li key={index}>{element}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Suggestions</h4>
            <ul className="list-disc pl-5">
                {user_feedback.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </>
    );
}