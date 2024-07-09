import { JobDescriptionSummary as JobDescriptionSummaryType } from "../../_types/ai-result-type"

import {
    BriefcaseBusiness,
    Building2,
    MapPinned,
    Type,

} from "lucide-react";

import { Avatar } from "@/components/avatar";

export const JobDescriptionSummary = ({ jobDescriptionSummary }: { jobDescriptionSummary: JobDescriptionSummaryType }) => {
    const companyInitials = jobDescriptionSummary.companyName.split(" ")[0][0];

    return (
        <>
            <h3 className="text-lg font-semibold pb-2">Job Description Summary</h3>
            <hgroup className="flex items-start gap-2">
                <Avatar initials={companyInitials} />
                <aside>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><BriefcaseBusiness className="h-4 w-4 text-app-color" /> {jobDescriptionSummary.jobPosition}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><Building2 className="h-4 w-4 text-app-color" /> {jobDescriptionSummary.companyName}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><MapPinned className="h-4 w-4 text-app-color" />  {jobDescriptionSummary.location}</p>
                    <p className="flex items-center gap-1 text-sm dark:text-neutral-200 text-neutral-800 tracking-tight truncate"><Type className="h-4 w-4 text-app-color" />  {jobDescriptionSummary.employmentType}</p>
                </aside>
            </hgroup>

            <hgroup>
                <h4 className="mt-4 text-md font-semibold">Responsibilities</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                    ))}
                </ul>
            </hgroup>

            <hgroup>
                <h4 className="mt-4 text-md font-semibold">Required Skills</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary.requiredSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </hgroup>

            <hgroup>

                <h4 className="mt-4 text-md font-semibold">Preferred Qualifications</h4>
                <ul className="list-disc pl-5">
                    {jobDescriptionSummary.preferredQualifications.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                    ))}
                </ul>
                <h4 className="mt-4 text-md font-semibold">Experience Level</h4>
                <p>{jobDescriptionSummary.experienceLevel}</p>
                <h4 className="mt-4 text-md font-semibold">Educational Requirements</h4>
                <p>{jobDescriptionSummary.educationalRequirement}</p>
                {jobDescriptionSummary.salaryRange != null && (
                    <>
                        <h4 className="mt-4 text-md font-semibold">Salary Range</h4>
                        <p>{jobDescriptionSummary.salaryRange}</p>
                    </>
                )}

                {jobDescriptionSummary.benefits != null && (
                    <>
                        <h4 className="mt-4 text-md font-semibold">Benefits</h4>
                        <p>{jobDescriptionSummary.benefits}</p>
                    </>
                )}
            </hgroup>

        </>
    )
}