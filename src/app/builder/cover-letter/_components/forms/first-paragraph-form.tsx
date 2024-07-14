"use client";

import { Card } from "@/components/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const FirstParagraphForm = () => {
    const { firstParagraph, setFirstParagraph } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <Label htmlFor="firstParagraph">Introduction</Label>
                <Textarea
                    cols={5}
                    id="firstParagraph"
                    value={firstParagraph.text}
                    placeholder="Tell the reader of the letter which position you are applying for..."
                    onChange={(e) => { setFirstParagraph("text", e.target.value) }}
                >
                </Textarea>
            </aside>
        </Card>
    )
}