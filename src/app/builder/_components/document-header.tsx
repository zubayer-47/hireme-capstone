"use client";

import { ButtonLink } from "@/components/button-link";

type DocumentHeaderProps = {
    documentName: string;
    currentScore?: string;
}

export const DocumentHeader = ({
    documentName,
    currentScore,
}: DocumentHeaderProps) => {
    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                <h2>{documentName}</h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink name="Go Back" href="/builder" />
                <ButtonLink name="Enhance" href="/builder" />
            </nav>
        </header>
    )
}