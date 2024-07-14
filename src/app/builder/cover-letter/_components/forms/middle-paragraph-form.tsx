"use client";

import { Card } from "@/components/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const MiddleParagraphForm = ({ coverLetterMiddleParagraph }: { coverLetterMiddleParagraph: Doc<"coverLetter">["middleParagraph"] }) => {
    const { middleParagraph, setMiddleParagraph } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <Label htmlFor="middleParagraph">Sell Yourself</Label>
                <Textarea
                    cols={5}
                    id="middleParagraph"
                    value={coverLetterMiddleParagraph?.text ?? middleParagraph.text}
                    placeholder="Talk about your qualities and skills that would be helpful in that job..."
                    onChange={(e) => { setMiddleParagraph("text", e.target.value) }}
                >
                </Textarea>
            </aside>
        </Card>
    )
}