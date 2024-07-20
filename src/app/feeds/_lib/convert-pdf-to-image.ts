import * as pdfjs from "pdfjs-dist";
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const convertPDFToImages = async (pdfUrl: string): Promise<string[]> => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const targetResult = e.target?.result;
            if (typeof targetResult === "string") {
                const binaryString = atob(targetResult.replace(/.*base64,/, ""));
                const length = binaryString.length;
                const arrayBuffer = new Uint8Array(new ArrayBuffer(length));
                for (let i = 0; i < length; i++) {
                    arrayBuffer[i] = binaryString.charCodeAt(i);
                }
                try {
                    const images = await renderPage(arrayBuffer);
                    resolve(images);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject("Expected a string from FileReader result.");
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const renderPage = async (data: Uint8Array): Promise<string[]> => {
    const imagesList: string[] = [];
    const pdf = await pdfjs.getDocument({ data }).promise;

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

    return imagesList;
};
