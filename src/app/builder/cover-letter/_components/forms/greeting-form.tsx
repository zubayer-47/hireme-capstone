"use client";

import { Card } from "@/components/card";
import { DynamicInput } from "@/components/dynamic-input";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const GreetingForm = () => {
    const { greeting, setGreeting } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <DynamicInput
                    id="greeting"
                    type="text"
                    labelName="Formal Greeting"
                    value={greeting.greeting}
                    placeholder="Dear Mr./Ms. Lastname"
                    onChange={(e) => { setGreeting("greeting", e.target.value) }}
                />
            </aside>
        </Card>
    )
}