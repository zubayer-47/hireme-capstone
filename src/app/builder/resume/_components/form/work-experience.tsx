"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store"
import { Tiptap } from "@/components/text-editor/tiptap";
import { DynamicInput } from "@/components/dynamic-input";

export const WorkExperienceForm = () => {
    const { experiences, setExperience, deleteForm } = useResumeStore();

    return (
        <Card>
            {experiences.map((experience, index) => (
                <div className="space-y-4" key={index}>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`projectName-${index}`}
                            type="text"
                            labelName="Company Name"
                            value={experience.company}
                            placeholder="Enter the company name..."
                            onChange={(e) => { setExperience(index, "company", e.target.value) }}
                        />
                    </hgroup>

                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`title-${index}`}
                            type="text"
                            labelName="Job Title"
                            value={experience.title}
                            placeholder="Enter your job title..."
                            onChange={(e) => { setExperience(index, "title", e.target.value) }}
                        />
                    </hgroup>

                    <div className="grid grid-cols-2 gap-4">
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`startDate-${index}`}
                                type="text"
                                labelName="Start Date"
                                value={experience.startDate}
                                placeholder="Month - Year"
                                onChange={(e) => { setExperience(index, "startDate", e.target.value) }}
                            />
                        </hgroup>
                        <hgroup className="grid gap-2">
                            <DynamicInput
                                id={`endDate-${index}`}
                                type="text"
                                labelName="End Date"
                                value={experience.endDate}
                                placeholder="Month - Year | Present"
                                onChange={(e) => { setExperience(index, "endDate", e.target.value) }}
                            />
                        </hgroup>
                    </div>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`location-${index}`}
                            type="text"
                            labelName="Job Location"
                            value={experience.location}
                            placeholder="Enter your job location..."
                            onChange={(e) => { setExperience(index, "location", e.target.value) }}
                        />
                    </hgroup>
                    <hgroup className="grid gap-2">
                        <label htmlFor={`descriptions-${index}`} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Job Descriptions</label>
                        <Tiptap content={experience.descriptions}  onChange={(newText: string) => setExperience(index, "descriptions", newText)} />
                    </hgroup>
                    {experiences.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "experience")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}