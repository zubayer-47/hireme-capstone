"use client";

import {
    ResumeNavBarCSR,
    ResumeNavBarBorder
} from './resume-navbar';
import {
    useLoadFonts,
    useHyphenationCallback
} from '@/hooks/use-register-font';
import { ResumePDF } from './resume-pdf';
import { useState, useMemo } from 'react';
import { ResumeIframeCSR } from './resume-iframe';
import { useResumeStore } from '@/store/resume-store';
import { FlexboxSpacer } from '@/components/flexbox-spacer';
import { defaultSettings } from '@/store/resume-default-style';
import { DEBUG_RESUME_PDF_FLAG } from '@/lib/resume-dimensions';

export const Resume = () => {
    const [scale, setScale] = useState(0.8);
    const resume = useResumeStore();

    const document = useMemo(() => 
        <ResumePDF resume={resume} settings={defaultSettings} isPDF={true} />
    , [resume, defaultSettings]);
    
    useLoadFonts();
    useHyphenationCallback(defaultSettings.fontFamily)

    return (
        <>
            <div className="relative flex justify-center md:justify-start">
                <FlexboxSpacer maxWidth={50} className="hidden md:block" />
                <div className="relative">
                    <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
                        <ResumeIframeCSR
                            scale={scale}
                            enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
                            documentSize={defaultSettings.documentSize}
                        >
                            <ResumePDF
                                resume={resume}
                                settings={defaultSettings}
                                isPDF={DEBUG_RESUME_PDF_FLAG}
                            />
                        </ResumeIframeCSR>
                    </section>
                    <ResumeNavBarCSR
                        scale={scale}
                        setScale={setScale}
                        document={document}
                        documentSize={defaultSettings.documentSize}
                        fileName={resume.profile.name + " - Resume"}
                    />
                </div>
                <ResumeNavBarBorder />
            </div>
        </>
    )
}