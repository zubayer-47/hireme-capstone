"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePDF } from "@react-pdf/renderer";
import { Download, ChevronsUpDown } from "lucide-react";
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
    const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
        setScale,
        documentSize
    });


    const[instance, update] = usePDF({document});

    useEffect(() => {
        update(document)
    }, [document, update])

    if (instance.loading) return <>Loading...</>

    return (
        <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between">
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
                />
                <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
                <label className="hidden items-center gap-1 lg:flex">
                    <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4"
                        checked={scaleOnResize}
                        onChange={() => setScaleOnResize((prev) => !prev)}
                    />
                    <span className="select-none">Autoscale</span>
                </label>
            </div>
            <a
                download={fileName}
                href={instance.url!}
                className="ml-1 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 cursor-pointer"
            >
                <Download className="h-4 w-4" />
                <span className="whitespace-nowrap">Download Resume</span>
            </a>
        </div>
    );
};


export const ResumeNavBarCSR = dynamic(
    () => Promise.resolve(ResumeNavbar),
    {
        ssr: false,
    }
);

export const ResumeNavBarBorder = () => (
    <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-background/10" />
);