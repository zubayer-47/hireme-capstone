
import { PDFSkills } from "./pdf-skills";
import { PDFProfile } from "./pdf-profile";
import { PDFProjects } from "./pdf-projects";
import { PDFEducation } from "./pdf-education";
import type { Resume } from "@/store/resume-types";
import type { Settings } from "@/store/resume-types";
import { PDFWorkExperience } from "./pdf-work-experience";
import { FONT_COLOR } from "@/store/resume-default-style";
import { Page, View, Document } from "@react-pdf/renderer";
import { SuppressWarnings } from "./common/supress-warnings";
import { styles, spacing } from './resume-pdf-utils/resume-pdf-styles';

type ResumePDFProps = {
    resume: Resume;
    isPDF?: boolean;
    settings: Settings;
}

export const ResumePDF = ({
    resume,
    settings,
    isPDF
}: ResumePDFProps) => {
    const { profile, projects, skills, experiences, education } = resume;
    const { themeColor: appColor, documentSize, fontFamily, fontSize } = settings;
    const themeColor = appColor || FONT_COLOR;


    return (
        <>
            <Document title={`${profile.name} Resume`} author={profile.name} producer={"HireMe"}>
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
                            padding: `${spacing[10]} ${spacing[20]}`
                        }}
                    >
                        <PDFProfile
                            profile={profile}
                            themeColor={themeColor}
                            isPDF={isPDF!}
                        />
                        <PDFProjects
                            heading="PROJECTS"
                            themeColor={themeColor}
                            projects={projects}
                        />
                        <PDFSkills
                            heading="SKILLS"
                            themeColor={themeColor}
                            skills={skills}
                        />
                        <PDFWorkExperience
                            heading="WORK EXPERIENCE"
                            themeColor={themeColor}
                            experiences={experiences}
                        />
                        <PDFEducation
                            heading="EDUCATION"
                            themeColor={themeColor}
                            educations={education}
                        />
                    </View>
                </Page>
            </Document>
            <SuppressWarnings />
        </>
    )
}