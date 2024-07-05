"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store"
import { Tiptap } from "@/components/text-editor/tiptap";
import { DynamicInput } from "@/components/dynamic-input";

export const ProjectForm = () => {
    const { projects, setProjects, deleteForm } = useResumeStore();

    return (
        <Card>
            {projects.map((project, index) => (
                <div key={index}>
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`projectName-${index}`}
                                    type="text"
                                    labelName="Project Name & Feature"
                                    value={project.name}
                                    placeholder="Company Name | Project Feature"
                                    onChange={(e) => { setProjects(index, "name", e.target.value) }}
                                />
                            </hgroup>
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`role-${index}`}
                                    type="text"
                                    labelName="Role"
                                    value={project.role}
                                    placeholder="Your Role (Lead Coder, Data Scientiest, Backend Engineer, UX Designer, etc..."
                                    onChange={(e) => { setProjects(index, "role", e.target.value) }}
                                />
                            </hgroup>
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`date-${index}`}
                                    type="date"
                                    labelName="Date Created"
                                    value={project.date}
                                    placeholder="July 2024"
                                    onChange={(e) => { setProjects(index, "date", e.target.value) }}
                                />
                            </hgroup>
                            <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`industry-${index}`}
                                    type="text"
                                    labelName="Industry"
                                    value={project.industry}
                                    placeholder="Enter the industry you worked on this project..."
                                    onChange={(e) => { setProjects(index, "industry", e.target.value) }}
                                />
                            </hgroup>
                        </div>
                        <hgroup className="grid gap-2">
                                <DynamicInput
                                    id={`url-${index}`}
                                    type="url"
                                    labelName="Project URL"
                                    value={project.url}
                                    placeholder="Enter your project link..."
                                    onChange={(e) => { setProjects(index, "url", e.target.value) }}
                                />
                            </hgroup>
                        <hgroup className="grid gap-2">
                            <label htmlFor={`descriptions-${index}`} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Descriptions</label>
                            <Tiptap content={project.descriptions} onChange={(newText: string) => setProjects(index, "descriptions", newText)} />
                        </hgroup>
                    </div>
                    {projects.length > 1 && (
                        <Button className="w-full mt-4" variant="destructive" size="sm" onClick={() => deleteForm(index, "projects")}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
        </Card>
    )
}