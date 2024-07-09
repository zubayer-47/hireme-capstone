"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store"
import { DynamicInput } from "@/components/dynamic-input";

type EducationFormProps = {
    resumeEducation?: {
        school: string;
        degree: string;
        location: string;
        endDate: string;
        startDate: string;
    }[] | undefined
}

export const EducationForm = ({ resumeEducation }: EducationFormProps) => {
    const { education: educations, setEducation, deleteForm } = useResumeStore();

    const combineEducation = resumeEducation && resumeEducation.length > 0 ? resumeEducation : educations

    return (
        <Card>
            {combineEducation.map((education, index) => (
                <div className="space-y-4" key={index}>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`schoolName-${index}`}
                            type="text"
                            labelName="Name of Education"
                            value={education.school}
                            placeholder="Enter the school you attended..."
                            onChange={(e) => { setEducation(index, "school", e.target.value) }}
                        />
                    </hgroup>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`degree-${index}`}
                            type="text"
                            labelName="Education Degree"
                            value={education.degree}
                            placeholder="Enter your education degree..."
                            onChange={(e) => { setEducation(index, "degree", e.target.value) }}
                        />
                    </hgroup>
                    <div className="grid grid-cols-2 gap-4">
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`startDate-${index}`}
                                type="text"
                                labelName="Start Date"
                                value={education.startDate}
                                placeholder="Month - Year"
                                onChange={(e) => { setEducation(index, "startDate", e.target.value) }}
                            />
                        </hgroup>
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`endDate-${index}`}
                                type="text"
                                labelName="End Date"
                                value={education.endDate}
                                placeholder="Month - Year | Present"
                                onChange={(e) => { setEducation(index, "endDate", e.target.value) }}
                            />
                        </hgroup>
                    </div>
                    <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`location-${index}`}
                                type="text"
                                labelName="Location"
                                value={education.location}
                                placeholder="New York, NY"
                                onChange={(e) => { setEducation(index, "location", e.target.value) }}
                            />
                        </hgroup>
                    {combineEducation.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "education")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}