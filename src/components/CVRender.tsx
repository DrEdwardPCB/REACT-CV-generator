import { Document, Page, Svg, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { createHtmlStylesheet, HtmlStyle } from "../utils/pdfStylesheet";
import { Style } from "@react-pdf/types";
import React from "react";
import CV from "./jsoncv";
import getIcons from "./svg/index";
const html = createHtmlStylesheet(10);
export default function CVRender({ value }: { value: string }) {
    const [cv, setCv] = useState<CV.CV | null>(null);
    useEffect(() => {
        try {
            setCv(JSON.parse(value) as CV.CV);
        } catch (error) {
            console.log(error);
        }
    }, [value]);
    useEffect(() => {
        console.log(cv);
    }, [cv]);
    const renderHeader = (): JSX.Element => {
        return (
            <View style={cv?.header.style}>
                <Text style={[html.h1]}>{cv?.header.name}</Text>
                {cv?.header.title && (
                    <Text style={[html.h2]}>{cv?.header.title}</Text>
                )}
            </View>
        );
    };
    const renderContent = (): JSX.Element => {
        return (
            <View
                style={[
                    cv?.content.style ?? ({} as Style),
                    {
                        flexDirection:
                            cv?.content.style?.bodySide === "left"
                                ? "row-reverse"
                                : "row",
                    },
                ]}
            >
                {renderBody()}
                {renderAside()}
            </View>
        );
    };
    const renderBody = (): JSX.Element => {
        return (
            <View style={[cv?.content.body?.style ?? ({} as Style)]}>
                {(cv?.content.body.sections ?? ([] as CV.section[])).map(
                    (section) => renderSection(section)
                )}
            </View>
        );
    };
    const renderAside = (): JSX.Element => {
        return (
            <View style={[cv?.content.aside?.style ?? ({} as Style)]}>
                {(cv?.content.aside.sections ?? ([] as CV.section[])).map(
                    (section) => renderSection(section)
                )}
            </View>
        );
    };
    const renderSection = (section: CV.section): JSX.Element => {
        const renderTitle = (defaultTitle?: string) => {
            let title: string | undefined = section.title ?? defaultTitle;
            console.log(title);
            console.log(defaultTitle);
            return (
                title && (
                    <>
                        <Text style={html.h2}>{section.title}</Text>
                        <View style={html.hr}></View>
                    </>
                )
            );
        };
        switch (section.type) {
            case CV.sectionType.BIBLOGRAPHY:
                return (
                    <View>
                        {renderTitle()}
                        <Text style={html.p}>
                            {(section as CV.biblography).content}
                        </Text>
                    </View>
                );
            case CV.sectionType.EXPERIENCE:
                return (
                    <View>
                        {renderTitle("Experience")}
                        {(section as CV.experience).experiences.map((item) =>
                            renderExperience(
                                item,
                                (section as CV.experience).style
                            )
                        )}
                    </View>
                );
            case CV.sectionType.EDUCATION:
                return (
                    <View>
                        {renderTitle("Education")}
                        {(section as CV.education).educations.map((item) =>
                            renderEductation(
                                item,
                                (section as CV.education).style
                            )
                        )}
                    </View>
                );
            case CV.sectionType.CONTACT:
                return (
                    <View>
                        {renderTitle("Contact Info")}
                        {(section as CV.contactInfo).infos.map((item) =>
                            renderInfo(item)
                        )}
                    </View>
                );
            case CV.sectionType.SKILL:
                return (
                    <View>
                        {renderTitle("Skills")}
                        {(section as CV.skills).skills.map((item) =>
                            renderSkill(item)
                        )}
                    </View>
                );
            default:
                return <View></View>;
        }
    };
    const renderEductation = (item: CV.educationItem, style: CV.style) => {
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    padding: 2,
                }}
            >
                <View style={{ flex: style.dateFlex }}>
                    <Text style={{ ...html.p, fontWeight: 200 }}>
                        {`${item.dateOfCompletetion}`}
                    </Text>
                </View>
                <View style={{ flex: style.contentFlex }}>
                    <Text
                        style={{ ...html.h3, marginBottom: 0 }}
                    >{`${item.attained} Major in ${item.major}`}</Text>
                    <Text
                        style={{ ...html.h3, ...html.i, marginVertical: 0 }}
                    >{`${item.institution}`}</Text>
                    {item.minor && (
                        <View>
                            <Text
                                style={{
                                    ...html.h4,
                                    marginVertical: 0,
                                    marginTop: 4,
                                }}
                            >
                                {"Minor:"}
                            </Text>
                            <View style={{ ...html.ul, marginVertical: 1 }}>
                                {item.minor.map((resp) => (
                                    <View
                                        style={{
                                            ...html.li,
                                            ...html.p,
                                            marginVertical: 1,
                                        }}
                                    >
                                        <Text style={html.li_bullet}>•</Text>
                                        <Text style={html.li_content}>
                                            {resp}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                        }}
                    >
                        {item.gpa && (
                            <Text style={{ ...html.h4, ...html.i }}>
                                {`GPA: ${item.gpa}`}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    };
    const renderSkill = (item: CV.skillItem) => {
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    padding: 4,
                }}
            >
                <Text>
                    <Text style={html.h3}>{item.label}</Text>
                </Text>
                {item.type === "line" &&
                    item.full &&
                    item.score &&
                    !isNaN(item.full + item.score) && (
                        <View
                            style={{
                                width: "100%",
                                paddingVertical: 2,
                            }}
                        >
                            <View
                                style={{
                                    height: 5,
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        height: 5,
                                        flex: item.score,
                                        backgroundColor: "rgb(255,255,255)",
                                        ...item.styleScore,
                                    }}
                                ></View>
                                <View
                                    style={{
                                        height: 5,
                                        flex: item.full - item.score,
                                        backgroundColor: "rgb(255,255,255)",
                                        ...item.styleFull,
                                    }}
                                ></View>
                            </View>
                        </View>
                    )}
                {item.comment && (
                    <Text style={{ paddingTop: 4, paddingBottom: 6 }}>
                        <Text style={html.p}>{item.comment}</Text>
                    </Text>
                )}
            </View>
        );
    };
    const renderExperience = (item: CV.experienceItem, style: CV.style) => {
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    padding: 4,
                }}
            >
                <View style={{ flex: style.dateFlex }}>
                    <Text style={{ ...html.p, fontWeight: 200 }}>
                        {`${item.from} - ${item.to}`}
                    </Text>
                </View>
                <View style={{ flex: style.contentFlex }}>
                    <Text style={{ ...html.h3 }}>{`${item.title} ${
                        item.title && item.role && "-"
                    } ${item.role}`}</Text>
                    <Text
                        style={{ ...html.h3, ...html.i, marginVertical: 0 }}
                    >{`${item.company}`}</Text>
                    <View style={html.ul}>
                        {item.responsibility.map((resp) => (
                            <View
                                style={{
                                    ...html.li,
                                    ...html.p,
                                    marginVertical: 1,
                                }}
                            >
                                <Text style={html.li_bullet}>•</Text>
                                <Text style={html.li_content}>{resp}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );
    };
    const renderInfo = (item: CV.infosItem) => {
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    padding: 2,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    {item.FontAwesomeIcon &&
                        getIcons(
                            item.FontAwesomeIcon,
                            {
                                marginHorizontal: 4,
                                width: 13,
                                height: 13,
                            } as Style,
                            "black"
                        )}
                    <Text>
                        <Text style={html.h3}>{item.label}</Text>
                    </Text>
                </View>
                <Text style={{ ...html.p, marginHorizontal: 4 }}>
                    {item.value}
                </Text>
            </View>
        );
    };
    return (
        <Document>
            <Page
                size="LETTER"
                style={{
                    display: "flex",
                }}
            >
                {renderHeader()}
                {renderContent()}
            </Page>
        </Document>
    );
}
