"use client";

import { Card } from "@/components/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const ClosingParagraphForm = () => {
    const { closingParagraph, setClosingParagraph } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <Label htmlFor="closingParagraph">Conclusion</Label>
                <Textarea
                    cols={5}
                    id="closingParagraph"
                    value={closingParagraph.text}
                    placeholder="Repeat your interest in the position in the position and thank the hiring manager for considering your position..."
                    onChange={(e) => { setClosingParagraph("text", e.target.value) }}
                >
                </Textarea>
            </aside>
        </Card>
    )
}