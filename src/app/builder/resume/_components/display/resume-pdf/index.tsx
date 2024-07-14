import type { Resume } from "@/store/resume-types";
import { Doc } from "@/convex/_generated/dataModel";
import type { Settings } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/document-default-style";

import { PDFSkills } from "./pdf-skills";
import { PDFProfile } from "./pdf-profile";
import { PDFProjects } from "./pdf-projects";
import { PDFEducation } from "./pdf-education";
import { PDFWorkExperience } from "./pdf-work-experience";

import { Page, View, Document } from "@react-pdf/renderer";
import { SuppressWarnings } from "../../../../_components/supress-warnings";
import { styles, spacing } from '../../../../_components/pdf-styles';


type ResumePDFProps = {
    resume: Resume;
    isPDF?: boolean;
    settings: Settings;
    resumeDetails: Doc<"resume">
}

export const ResumePDF = ({
    resume,
    settings,
    isPDF,
    resumeDetails
}: ResumePDFProps) => {
    const { profile, projects, skills, experiences, education } = resume;
    const { themeColor: appColor, documentSize, fontFamily, fontSize } = settings;
    const themeColor = appColor || FONT_COLOR;

    return (
        <>
            <Document title={`${profile.name} Resume`} author={profile.name} producer={"Hireme"}>
                <Page
                    size={documentSize === "A4" ? "A4" : "LETTER"}
                    style={{
                        ...styles.flexCol,
                        color: FONT_COLOR,
                        fontFamily: fontFamily,
                        fontSize: fontSize + "pt"
                    }}>
                    <View
                        style={{
                            ...styles.flexCol,
                            padding: `${spacing[5]} ${spacing[10]}`
                        }}
                    >
                        <PDFProfile
                            profile={resumeDetails.profile ?? profile}
                            themeColor={themeColor}
                            isPDF={isPDF!}
                        />
                        <PDFSkills
                            heading="SKILLS"
                            themeColor={themeColor}
                            skills={resumeDetails.skills ?? skills}
                        />
                        <PDFProjects
                            heading="PROJECTS"
                            themeColor={themeColor}
                            projects={resumeDetails.projects ?? projects}
                            isPDF={isPDF!}
                        />
                        <PDFWorkExperience
                            heading="WORK EXPERIENCE"
                            themeColor={themeColor}
                            experiences={resumeDetails.workExperience ?? experiences}
                        />
                        <PDFEducation
                            heading="EDUCATION"
                            themeColor={themeColor}
                            educations={resumeDetails.education ?? education}
                        />
                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}