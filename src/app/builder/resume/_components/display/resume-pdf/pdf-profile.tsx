import {
    ResumePDFText,
    ResumePDFLink,
    ResumePDFSection
} from "./common/resume-pdf-components";
import { View } from "@react-pdf/renderer";
import type { Profile } from "@/store/resume-types";
import { FONT_COLOR } from "@/store/resume-default-style";
import { styles, spacing } from './resume-pdf-utils/resume-pdf-styles';
import { ResumePDFIcon, type IconType } from "./common/resume-pdf-icon";

type PDFProfileProps = {
    isPDF: boolean;
    profile: Profile;
    themeColor: string;
}

export const PDFProfile = ({
    isPDF,
    profile,
    themeColor,
}: PDFProfileProps) => {

    const { name, role, email, phone, location, linkedInUrl, githubUrl, objective } = profile;
    const iconProps = { email, phone, location, linkedInUrl, githubUrl }

    return (
        <View style={{
            ...styles.flexCol,
            gap: spacing["2"],
            marginTop: spacing["5"],
        }} >
            <ResumePDFText
                bold={true}
                themeColor={themeColor}
                style={{ fontSize: "12pt", textAlign: "center" }}
            >
                {name}
            </ResumePDFText>
            <ResumePDFText
                bold={true}
                themeColor={FONT_COLOR}
                style={{ fontSize: "12pt", textAlign: "center", marginTop: spacing["2"] }}
            >
                {role}
            </ResumePDFText>

            <View
                style={{
                    ...styles.flexRowBetween,
                    flexWrap: "wrap",
                    marginTop: spacing["0.5"],

                }}
            >
                {Object.entries(iconProps).map(([key, value]) => {
                    if (!value) return null;

                    let iconType = key as IconType;
                    const links = ["email", "url", "phone", "linkedInUrl", "githubUrl"].includes(key);

                    const Wrapper = ({ children }: {
                        children: React.ReactNode
                    }) => {
                        if (!links) return <>{children}</>

                        let src = "";
                        switch (key) {
                            case "email": {
                                src = `mailto:${value}`;
                                break;
                            }
                            case "phone": {
                                src = `tel:${value.replace(/[^\d+]/g, "")}`;
                                break;
                            }
                            default: {
                                src = value.startsWith("http") ? value : `https://${value}`;
                            }
                        }

                        return (
                            <ResumePDFLink src={src} isPDF={isPDF}>
                                {children}
                            </ResumePDFLink>
                        );
                    }

                    return (
                        <View
                            key={key}
                            style={{
                                ...styles.flexRow,
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                
                                gap: spacing["4"],
                            }}
                        >
                            {/* <ResumePDFIcon type={iconType} isPDF={isPDF} /> */}
                            <Wrapper >
                                <ResumePDFText>{value}</ResumePDFText>
                            </Wrapper>
                        </View>
                    );
                })}
            </View>
            <ResumePDFSection heading="PROFILE" style={{ marginTop: spacing["4"] }} themeColor={themeColor}>
                <ResumePDFText>{objective}</ResumePDFText>
            </ResumePDFSection>
        </View>
    )
}