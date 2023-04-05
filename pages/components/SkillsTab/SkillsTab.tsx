import React from 'react';
import styles from './SkillsTab.module.css'
import { FC } from 'react';

const skills = [
    { label: "Single-page Applications (SPA)", link: "" },
    { label: "ES6", link: "" },
    { label: "React", link: "" },
    { label: "TypeScript", link: "" },
    { label: "Next.js", link: "" },
    { label: "Gatsby", link: "" },
    { label: "Apollo", link: "" },
    { label: "Webpack", link: "" },
    { label: "Redux", link: "" },
    { label: "MobX", link: "" },
    { label: "Context", link: "" },
]

const cssSkills = [
    { label: "Responsive websites", link: "" },
    { label: "Emotion", link: "" },
    { label: "styled-components", link: "" },
    { label: "Material UI", link: "" },
    { label: "SASS", link: "" },
]

const backendSkills = [
    { label: "NET Core", link: "" },
    { label: "SQL Server", link: "" },
    { label: "EF Core ORM", link: "" },
    { label: "ASP.NET MVC", link: "" },
]

const othersSkills = [
    { label: "Jest", link: "" },
    { label: "React testing library", link: "" },
    { label: "Git / Git Flow", link: "" },
    { label: "EsLint", link: "" },
    { label: "Sonar", link: "" },
    { label: "Figma ", link: "" }
]

const SkillItem: FC<{ content: string, link?: string }> = ({ content, link }) => {
    return (
        <span className={styles.skillListItem}>
            <span className={styles.skillListItemBall}></span>{content}
        </span>
    );
};

const SkillCategory: FC<{ title: string, skills: { label: string, link?: string }[] }> = ({ title, skills }) => {
    return (
        <span className={styles.skill}>
            <span className={styles.skillType}>{title}</span>
            <span className={styles.skillContent}>
                <span className={styles.skillContentList}>
                    {skills.map((skill) => (
                        <SkillItem key={skill.label} content={skill.label} />
                    ))}
                </span>
            </span>
        </span>
    );
};

export default function SkillsTab() {
    return (
        <>
            <SkillCategory title="Front-end" skills={[...skills, ...cssSkills]} />
            <br />
            <br />
            <SkillCategory title="Back-end" skills={backendSkills} />
            <br />
            <br />
            <SkillCategory title="Others" skills={othersSkills} />
        </>
    );
}