"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Inbox, X } from "lucide-react";


const defaultFileState = {
    name: "",
    size: 0,
    fileUrl: ""
}

export const UploadPDFDropzone = ({ onFileUrlChange }: { onFileUrlChange: (fileUrl: string) => void; }) => {
    const [file, setFile] = useState(defaultFileState);
    const [isHovered, setIsHovered] = useState(false);
    const [hasNonPdfFile, setHasNonePdfFile] = useState(false);

    const hasFile = Boolean(file.name);

    const setNewFile = (newFile: File) => {
        if (file.fileUrl) {
            URL.revokeObjectURL(file.fileUrl)
        }

        const { name, size } = newFile;
        const fileUrl = URL.createObjectURL(newFile);
        setFile({ name, fileUrl, size });
        onFileUrlChange(fileUrl)
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const newFile = event.dataTransfer.files[0];

        if (newFile.name.endsWith(".pdf")) {
            setHasNonePdfFile(false);
            setNewFile(newFile);
        } else {
            setHasNonePdfFile(true);
        }
        setIsHovered(false);
    };

    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFile = files[0];
        setNewFile(newFile)
    };

    const onRemove = () => {
        setFile(defaultFileState);
        onFileUrlChange("");
    };


    return (
        <section
            className={cn("flex justify-center rounded-lg dark:border-white/[0.2] border-black/[0.2] px-6", isHovered && "dark:border-white/[0.5] border-black/[0.5]")}
            onDragOver={(event) => {
                event.preventDefault();
                setIsHovered(true)
            }}
            onDragLeave={() => setIsHovered(false)}
            onDrop={onDrop}
        >
            <aside className="text-center space-y-2">
                {!hasFile ? (
                    <>
                        <Inbox className="h-10 w-10 mx-auto text-app-color" />
                        <p className="pt-3 dark:text-neutral-200 text-neutral-800 text-base font-semibold">
                            Drag & Drop Your PDF File here
                        </p>
                    </>
                ) : (
                    <>
                        <FileText className="h-10 w-10 mx-auto text-app-color" />
                        <hgroup className="flex items-center justify-center gap-3 pt-3">
                            <h3 className="text-sm pl-7 font-semibold dark:text-neutral-200 text-neutral-800">
                                {file.name} - {getFileSizeString(file.size)}
                            </h3>
                            <Button onClick={() => onRemove()} type="button" variant="ghost" size="icon" className="rounded-full" >
                                <X className="h-6 w-6" />
                            </Button>
                        </hgroup>
                    </>
                )}
                <div className="pt-4">
                    {!hasFile ? (
                        <>
                            <label className="cursor-pointer text-sm dark:text-neutral-400 text-neutral-600 hover:text-app-color transition-all">
                                Browse File
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept=".pdf"
                                    onChange={onInputChange}
                                />
                            </label>
                            {hasNonPdfFile && (
                                <p className="mt-6 dark:text-rose-400 text-rose-600">Only PDF file is supported.</p>
                            )}
                        </>
                    ) : null}
                </div>
            </aside>

        </section>
    )
}

const getFileSizeString = (fileSizeB: number) => {
    const fileSizeKB = fileSizeB / 1024;
    const fileSizeMB = fileSizeKB / 1024;
    if (fileSizeKB < 1000) {
        return fileSizeKB.toPrecision(3) + " KB";
    } else {
        return fileSizeMB.toPrecision(3) + " MB";
    }
};