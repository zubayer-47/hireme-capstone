"use client";

import {
    useLoadFonts,
    useHyphenationCallback
} from '@/hooks/use-register-font';
import { useState, useMemo } from 'react';
import { CoverLetterPdf } from './cover-letter-pdf';
import { DEBUG_PDF_FLAG } from '@/lib/pdf-dimensions';
import { useCoverLetterStore } from '@/store/cover-letter-store';
import { defaultSettings } from '@/store/document-default-style';

import { FlexboxSpacer } from '@/components/flexbox-spacer';
import { PDFIframeCSR } from '../../../_components/pdf-iframe';
import { PDFNavbarCSR } from '../../../_components/pdf-navbar';

export const CoverLetter = () => {
    const [scale, setScale] = useState(0.8);
    const coverLetter = useCoverLetterStore();
    const document = useMemo(() => 
        <CoverLetterPdf  coverLetter={coverLetter} settings={defaultSettings} isPDF={true} />
    , [coverLetter]);
    
    useLoadFonts();
    useHyphenationCallback(defaultSettings.fontFamily)

    return (
        <>
            <div className="relative h-screen flex justify-center md:justify-start">
                <FlexboxSpacer maxWidth={50} className="hidden md:block" />
                <div className="relative">
                    <section className="flex justify-center overflow-hidden md:p-[var(--resume-padding)]">
                        <PDFIframeCSR
                            scale={scale}
                            enablePDFViewer={DEBUG_PDF_FLAG}
                            documentSize={defaultSettings.documentSize}
                        >
                            <CoverLetterPdf
                                coverLetter={coverLetter}
                                settings={defaultSettings}
                                isPDF={DEBUG_PDF_FLAG}
                            />
                        </PDFIframeCSR>
                        
                    </section>
                    <PDFNavbarCSR
                        scale={scale}
                        setScale={setScale}
                        document={document}
                        buttonName="Cover Letter"
                        documentSize={defaultSettings.documentSize}
                        fileName={"Cover Letter"}
                    />
                    
                </div>
            </div>
        </>
    )
}