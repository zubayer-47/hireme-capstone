import {
    ResumePDFSection,
    ResumePDFHeadingLink,
    ResumePDFBulletList,
} from './common/resume-pdf-components';
import { View } from "@react-pdf/renderer";
import type { Projects } from "@/store/resume-types";
import { customHTMLParser } from '@/lib/custom-html-parser';
import { styles } from "./resume-pdf-utils/resume-pdf-styles";

type PDFProjectsProps = {
    heading: string;
    themeColor: string;
    projects: Projects[];
}

export const PDFProjects = ({
    heading,
    projects,
    themeColor
}: PDFProjectsProps) => {
    return (
        <ResumePDFSection themeColor={themeColor} heading={heading}>
            {projects.map(({
                url,
                name,
                descriptions
            }, index) => (
                <View key={index}>
                    <ResumePDFHeadingLink src={url} themeColor={themeColor}>{name}</ResumePDFHeadingLink>
                    <View
                        style={{
                            ...styles.flexCol,
                        }}>
                        <ResumePDFBulletList items={customHTMLParser(descriptions)} />
                    </View>
                </View>
            ))}
        </ResumePDFSection>
    )
}