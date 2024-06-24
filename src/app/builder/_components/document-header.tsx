"use client";

import Link from "next/link"
import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { useParams } from "next/navigation";

type DocumentHeaderProps = {
    documentName: string;
    currentScore?: string;
}

export const DocumentHeader = ({
    documentName,
    currentScore,
}: DocumentHeaderProps) => {
    const {documentId} = useParams();

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b dark:border-white/[0.2] border-black/[0.2] bg-neutral-50 dark:bg-neutral-900 px-4 lg:h-[60px] lg:px-6">
            <nav>
                <h2 className="dark:text-neutral-200 text-neutral-800 text-sm">{documentName}</h2>
            </nav>
            <nav className="flex items-center space-x-2">
                <ButtonLink name="Go Back" href="/builder" size="sm" />
                <Link
                    href={`/builder/resume/${documentId}/enhancer`}
                    className="flex items-center gap-1 text-sm h-9 px-3 bg-app-color hover:bg-app-color/80 text-neutral-200 translate-hover rounded-lg"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="whitespace-nowrap">Enhance</span>
                </Link>
            </nav>
        </header>
    )
}