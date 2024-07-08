import { JobDescriptionSummary as JobDescriptionSummaryType } from "../../_types/ai-result-type"

import {
    BriefcaseBusiness,
    Building2,
    MapPinned,
    Type,

} from "lucide-react";

import { Avatar } from "@/components/avatar";

export const JobDescriptionSummary = ({ jobDescriptionSummary }: { jobDescriptionSummary: JobDescriptionSummaryType }) => {
    const companyInitials = jobDescriptionSummary["Company Name"].split(" ")[0][0];

    return (
        <>
            <h3 className="text-lg font-semibold pb-2">Job Description Summary</h3>
            <hgroup className="flex items-start gap-2">
                <Avatar initials={companyInitials} />
                <aside>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><BriefcaseBusiness className="h-4 w-4 text-app-color" /> {jobDescriptionSummary["Job Position"]}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><Building2 className="h-4 w-4 text-app-color" /> {jobDescriptionSummary["Company Name"]}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><MapPinned className="h-4 w-4 text-app-color" />  {jobDescriptionSummary["Location"]}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><Type className="h-4 w-4 text-app-color" />  {jobDescriptionSummary["Employment Type"]}</p>
                </aside>
            </hgroup>

            <hgroup>
                <h4 className="mt-4 text-md font-semibold">Responsibilities</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary.Responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                    ))}
                </ul>
            </hgroup>

            <hgroup>
                <h4 className="mt-4 text-md font-semibold">Required Skills</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary["Required Skills"].map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </hgroup>

            <hgroup>

                <h4 className="mt-4 text-md font-semibold">Preferred Qualifications</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary["Preferred Qualifications"].map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                    ))}
                </ul>
                <h4 className="mt-4 text-md font-semibold">Experience Level</h4>
                <p>{jobDescriptionSummary["Experience Level"]}</p>
                <h4 className="mt-4 text-md font-semibold">Educational Requirements</h4>
                <p>{jobDescriptionSummary["Educational Requirements"]}</p>
                {jobDescriptionSummary["Salary Range"] != null && (
                    <>
                        <h4 className="mt-4 text-md font-semibold">Salary Range</h4>
                        <p>{jobDescriptionSummary["Salary Range"]}</p>
                    </>
                )}

                {jobDescriptionSummary["Benefits"] != null && (
                    <>
                        <h4 className="mt-4 text-md font-semibold">Benefits</h4>
                        <p>{jobDescriptionSummary["Benefits"]}</p>
                    </>
                )}
            </hgroup>

        </>
    )
}