"use client";

import { Card } from "@/components/card";
import { DynamicInput } from "@/components/dynamic-input";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const FirstParagraphForm = () => {
    const { firstParagraph, setFirstParagraph } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <DynamicInput
                    id="firstParagraph"
                    type="text"
                    labelName="Intro: First Paragraph"
                    value={firstParagraph.text}
                    placeholder="Tell the reader of the letter which position you are applying for..."
                    onChange={(e) => { setFirstParagraph("text", e.target.value) }}
                />
            </aside>
        </Card>
    )
}