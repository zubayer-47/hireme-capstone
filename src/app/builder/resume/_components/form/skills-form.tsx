"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store";
import { DynamicInput } from "@/components/dynamic-input";
import { BulletListTextarea } from "@/components/bullet-list-textarea";

type SkillsFormProps = {
    resumeSkills?: {
        heading: string;
        featuredSkills: string[];
    }[] | undefined
}

export const SkillsForm = ({ resumeSkills }: SkillsFormProps) => {
    const { skills, setSkills, deleteForm } = useResumeStore();

    const combinedSkills = resumeSkills && resumeSkills.length > 0 ? resumeSkills : skills;

    const handleFeaturedSkillsUpdate = (index: number, newFeaturedSkills: string[]) => {
        setSkills(index, "featuredSkills", newFeaturedSkills);
    }

    return (
        <Card >
            {combinedSkills.map((skill, index) => (
                <div className="space-y-4 mt-4" key={index}>
                    <hgroup className="grid gap-2">
                        <DynamicInput
                            id={`skills-${index}`}
                            type="text"
                            labelName="Skill Title"
                            value={skill.heading}
                            placeholder="Frontend | Backend | Database"
                            onChange={(e) => { setSkills(index, "heading", e.target.value) }}
                        />
                    </hgroup>
                    <hgroup className="grid gap-2">
                        <label htmlFor={`skills-${index}`} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Featured Skills</label>
                        <BulletListTextarea
                            descriptions={skill.featuredSkills}
                            onUpdate={(newDescriptions) => handleFeaturedSkillsUpdate(index, newDescriptions)}
                            placeholder="Write an accomplishment statement to highlight your achievements, contributions, and skills used."
                        />
                    </hgroup>
                    {combinedSkills.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "skills")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}
