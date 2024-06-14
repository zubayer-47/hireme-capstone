"use client";

import Link from "next/link";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePDF } from "@react-pdf/renderer";
import { Download, ChevronsUpDown, Sparkles } from "lucide-react";
import { useSetDefaultScale } from "@/hooks/use-set-default-scale";

type ResumeNavbarProps = {
    scale: number;
    fileName: string;
    documentSize: string;
    document: JSX.Element;
    setScale: (scale: number) => void;
}

const ResumeNavbar = ({
    scale,
    document,
    fileName,
    setScale,
    documentSize,
}: ResumeNavbarProps) => {
    const { setScaleOnResize } = useSetDefaultScale({
        setScale,
        documentSize
    });


    const [instance, update] = usePDF({ document });

    useEffect(() => {
        update(document)
    }, [document, update])

    if (instance.loading) return (<div className="sticky bottom-5 left-0 right-0 flex text-center items-center justify-center px-[var(--resume-padding)] text-stone-500 lg:justify-between">
        <div className="flex items-center justify-center gap-2 ">Loading...</div></div>)

    return (
        <div className="relative border border-gray-100 shadow-md rounded-lg bg-card text-card-foreground py-2 flex items-center justify-center px-[var(--resume-padding)] text-neutral-600 md:justify-between">
            <div className="flex items-center gap-2">
                <ChevronsUpDown className="h-5 w-5" aria-hidden="true" />
                <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.01}
                    value={scale}
                    onChange={(e) => {
                        setScaleOnResize(false);
                        setScale(Number(e.target.value));
                    }}
                    className="bg-app-color"
                />
                <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
            </div>
            <Link
                download={fileName}
                href={instance.url!}
                className="mr-2 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
                <Download className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Download Resume</span>
            </Link>
            <Link
                href="/builder/optimize"
                className="inline-flex h-10 animate-background-shine text-sm items-center justify-center rounded-md border border-input bg-[linear-gradient(110deg,#ffffff,45%,#edede9,55%,#ffffff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium hover:text-accent-foreground transition-colors focus:outline-none hover:bg-accent focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Optimize Resume</span>
            </Link>
        </div>
    );
};


export const ResumeNavBarCSR = dynamic(
    () => Promise.resolve(ResumeNavbar),
    {
        ssr: false,
    }
);