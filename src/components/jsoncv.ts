import { Style } from '@react-pdf/types';


namespace CV {
    export enum sectionType {
        BIBLOGRAPHY = "biblography",
        EXPERIENCE = "experience",
        EDUCATION = "education",
        CONTACT = "contactInfo",
        SKILL = "skills",

    }
    export interface CV {
        header: header
        content: content
    }
    export interface style extends Style {
        bodySide?: "left" | "right"
        dateFlex?: number
        contentFlex?: number


    }
    export interface header {
        style?: style
        name: string
        title?: string
    }
    export interface body {
        style?: style
        sections: section[]
    }
    export interface aside {
        style?: style
        sections: section[]
    }
    export interface content {
        style?: style
        body: body
        aside: aside
    }

    export interface section {
        type: sectionType
        title?: string
    }
    export interface biblography extends section {
        type: sectionType.BIBLOGRAPHY
        content: string
    }
    export interface experience extends section {
        type: sectionType.EXPERIENCE
        experiences: [experienceItem, ...experienceItem[]]
        style: style
    }
    export interface experienceItem {
        title: string
        role?: string
        company: string
        from: Date,
        to: Date | "present",
        responsibility: [string, ...string[]]

    }
    export interface education extends section {
        type: sectionType.EDUCATION,
        educations: [educationItem, ...educationItem[]]
        style: style
    }
    export interface educationItem {
        dateOfCompletetion: string,
        institution: string,
        attained: string,
        gpa: number
        major: string
        minor?: [string, ...string[]]
    }
    export interface contactInfo extends section {
        type: sectionType.CONTACT
        infos: [infosItem, ...infosItem[]]

    }
    export interface infosItem {
        label: string,
        FontAwesomeIcon?: string,
        value: string
    }
    export interface skills extends section {
        type: sectionType.SKILL,
        skills: [skillItem, ...skillItem[]]
    }
    export interface skillItem {
        label: string,
        styleScore?: style | style[]
        styleFull?: style | style[]
        type?: "line" | "none",
        full?: number
        score?: number
        comment?: string
    }
}

export default CV