"use client";

import {
    useLoadFonts,
    useHyphenationCallback
} from '@/hooks/use-register-font';
import { ResumePDF } from './resume-pdf';
import { useState, useMemo } from 'react';
import { Doc } from '@/convex/_generated/dataModel';
import { useResumeStore } from '@/store/resume-store';
import { DEBUG_PDF_FLAG } from '@/lib/pdf-dimensions';
import { defaultSettings } from '@/store/document-default-style';

import { FlexboxSpacer } from '@/components/flexbox-spacer';
import { PDFIframeCSR } from '../../../_components/pdf-iframe';
import { PDFNavbarCSR } from '../../../_components/pdf-navbar';

export const Resume = ({ resumeDetails } : { resumeDetails: Doc<"resume"> }) => {
    const [scale, setScale] = useState(0.8);
    const resume = useResumeStore();
    const document = useMemo(() => 
        <ResumePDF resumeDetails={resumeDetails} resume={resume} settings={defaultSettings} isPDF={true} />
    , [resume, resumeDetails]);
    
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
                            <ResumePDF
                                resume={resume}
                                resumeDetails={resumeDetails}
                                settings={defaultSettings}
                                isPDF={DEBUG_PDF_FLAG}
                            />
                        </PDFIframeCSR>
                        
                    </section>
                    <PDFNavbarCSR
                        scale={scale}
                        setScale={setScale}
                        document={document}
                        buttonName="Resume"
                        documentSize={defaultSettings.documentSize}
                        fileName={resume.profile.name + " - Resume"}
                    />
                    
                </div>
            </div>
        </>
    )
}