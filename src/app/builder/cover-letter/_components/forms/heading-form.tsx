"use client";

import { Card } from "@/components/card";
import { DynamicInput } from "@/components/dynamic-input";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const HeadingForm = () => {
    const { heading, setHeading } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <DynamicInput
                    id="name"
                    type="text"
                    labelName="Full Name"
                    value={heading.name}
                    placeholder="Steve Jobs"
                    onChange={(e) => { setHeading("name", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="role"
                    type="text"
                    labelName="Role"
                    value={heading.role}
                    placeholder="The role you are applying for?"
                    onChange={(e) => { setHeading("role", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="email"
                    type="email"
                    labelName="Email"
                    value={heading.email}
                    placeholder="steve.jobs@apple.com"
                    onChange={(e) => { setHeading("email", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="phone"
                    type="tel"
                    labelName="Phone Number"
                    value={heading.phone}
                    placeholder="+1 234 567 890"
                    onChange={(e) => { setHeading("phone", e.target.value) }}
                />
            </aside>
            <aside className="grid grid-cols-2 gap-4">
                <aside className="grid gap-2">
                    <DynamicInput
                        id="linkedInUrl"
                        type="url"
                        labelName="LinkedIn URL"
                        value={heading.linkedInUrl}
                        placeholder="www.linkedin.com/in/username"
                        onChange={(e) => { setHeading("linkedInUrl", e.target.value) }}
                    />
                </aside>
                <aside className="grid gap-2">
                    <DynamicInput
                        id="githubUrl"
                        type="url"
                        labelName="Github URL"
                        value={heading.githubUrl ?? ""}
                        placeholder="www.github.com/username"
                        onChange={(e) => { setHeading("githubUrl", e.target.value) }}
                    />
                </aside>
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="dateApplied"
                    type="dateApplied"
                    labelName="Date Applied"
                    value={heading.date}
                    onChange={(e) => { setHeading("date", e.target.value) }}
                />
            </aside>
        </Card>
    )
}