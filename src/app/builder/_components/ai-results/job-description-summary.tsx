import { JobDescriptionSummary as JobDescriptionSummaryType } from "../../_types/ai-result-type"


export const JobDescriptionSummary = ({ jobDescriptionSummary }: { jobDescriptionSummary: JobDescriptionSummaryType }) => {
    return (
        <>
            <h3 className="text-lg font-semibold">Job Description Summary</h3>
            <p><strong>Position:</strong> {jobDescriptionSummary ["Job Position"]}</p>
            <p><strong>Company:</strong> {jobDescriptionSummary ["Company Name"]}</p>
            <p><strong>Location:</strong> {jobDescriptionSummary ["Location"]}</p>
            <p><strong>Employment Type:</strong> {jobDescriptionSummary ["Employment Type"]}</p>
            <h4 className="mt-4 text-md font-semibold">Responsibilities</h4>
            <ul className="list-disc pl-5">
                {jobDescriptionSummary .Responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Required Skills</h4>
            <ul className="list-disc pl-5">
                {jobDescriptionSummary ["Required Skills"].map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Preferred Qualifications</h4>
            <ul className="list-disc pl-5">
                {jobDescriptionSummary ["Preferred Qualifications"].map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Experience Level</h4>
            <p>{jobDescriptionSummary ["Experience Level"]}</p>
            <h4 className="mt-4 text-md font-semibold">Educational Requirements</h4>
            <p>{jobDescriptionSummary ["Educational Requirements"]}</p>
        </>
    )
}