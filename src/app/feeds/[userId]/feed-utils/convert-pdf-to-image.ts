"use client";
import * as pdfjs from "pdfjs-dist";
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import { useEffect, useMemo, useState } from "react";

type ConvertPDFToImageProps = {
    pdfUrl: string;
    fileName: string;
}

export const ConvertPDFToImage = ({ pdfUrl, fileName }: ConvertPDFToImageProps) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [numOfPages, setNumOfPages] = useState(0);
    const [selectedImage, setSelectedImage] = useState<{ url: string, index: number } | null>(null);

    useEffect(() => {
        setIsLoading(false)
    }, [imageUrls]);

    const handleClickOpen = (url: string, index: number) => {
        setSelectedImage({ url, index });
        setOpen(true)
    };

    const handleClose = () => {
        setSelectedImage(null);
        setOpen(false);
    }

    const urlUploader = (url: string) => {
        fetch(url).then((res) => {
            res.blob().then((blob) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const targetResult = e.target?.result;
                    if (typeof targetResult === "string") {
                        const data = atob(targetResult?.replace(/.*base64,/, ""));
                    } else {
                        console.error("Expected a string from FileReader result.")
                    }
                }
                reader.readAsDataURL(blob)
            })
        })
    }

    useMemo(() => {
        urlUploader(pdfUrl)
    }, []);

    const renderPage = async (data: Uint8Array) => {
        setIsLoading(true);
        const imagesList: string[] = [];
        const pdf = await pdfjs.getDocument({ data }).promise;
        setNumOfPages(pdf.numPages);

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (context) {
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext).promise;
                imagesList.push(canvas.toDataURL("image/png"));
            }
        }

        setImageUrls((e) => [...e, ...imagesList]);
        setNumOfPages((e) => e + pdf.numPages);
        setIsLoading(false);
    };
}