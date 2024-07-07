"use client";

import { Card } from "@/components/card";
import { useResumeStore } from "@/store/resume-store";
import { DynamicInput } from "@/components/dynamic-input";

type ProfileFormProps = {
    resumeProfile?: {
        githubUrl?: string | undefined;
        name: string;
        role: string;
        email: string;
        phone: string;
        linkedInUrl: string;
        objective: string;
    } | undefined
}

export const ProfileForm = ({ resumeProfile } : ProfileFormProps) => {
    const { profile, setProfile } = useResumeStore();

    return (
        <Card >
            <aside className="grid gap-2">
                <DynamicInput
                    id="name"
                    type="text"
                    labelName="Full Name"
                    value={resumeProfile?.name ?? profile.name}
                    placeholder="Steve Jobs"
                    onChange={(e) => { setProfile("name", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="role"
                    type="text"
                    labelName="Role"
                    value={resumeProfile?.role ?? profile.role}
                    placeholder="The role you are applying for?"
                    onChange={(e) => { setProfile("role", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="email"
                    type="email"
                    labelName="Email"
                    value={resumeProfile?.email ??profile.email}
                    placeholder="steve.jobs@apple.com"
                    onChange={(e) => { setProfile("email", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="phone"
                    type="tel"
                    labelName="Phone Number"
                    value={resumeProfile?.phone ??profile.phone}
                    placeholder="+1 234 567 890"
                    onChange={(e) => { setProfile("phone", e.target.value) }}
                />
            </aside>
            <aside className="grid grid-cols-2 gap-4">
                <aside className="grid gap-2">
                    <DynamicInput
                        id="linkedInUrl"
                        type="url"
                        labelName="LinkedIn URL"
                        value={resumeProfile?.linkedInUrl ??profile.linkedInUrl}
                        placeholder="www.linkedin.com/in/username"
                        onChange={(e) => { setProfile("linkedInUrl", e.target.value) }}
                    />
                </aside>
                <aside className="grid gap-2">
                    <DynamicInput
                        id="githubUrl"
                        type="url"
                        labelName="Github URL"
                        value={resumeProfile?.githubUrl ?? profile.githubUrl ?? ""}
                        placeholder="www.github.com/username"
                        onChange={(e) => { setProfile("githubUrl", e.target.value) }}
                    />
                </aside>
            </aside>
            <aside className="grid gap-2">
                <label htmlFor="objective" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Objective</label>
                <textarea
                    required
                    id="objective"
                    value={resumeProfile?.objective ??profile.objective}
                    placeholder="Tell who you are under 2-3 sentences..."
                    onChange={(e) => setProfile("objective", e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
            </aside>
        </Card>
    )
}