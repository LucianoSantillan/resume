import React from 'react';
import styles from './SkillsTab.module.css'
import { FC } from 'react';
import { Chip, NoSsr, Paper } from '@mui/material';

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
        <Chip label={content} style={{ backgroundColor: '#6eadeb', color: 'white' }} />
    );
};

const SkillCategory: FC<{ title: string, skills: { label: string, link?: string }[] }> = ({ title, skills }) => {
    return (
        <Paper component="div" className={styles.skill}>
            <div className={styles.skillType}>{title}</div>
            <div className={styles.skillContent}>
                <div className={styles.skillContentList}>
                    {skills.map((skill) => (
                        <SkillItem key={skill.label} content={skill.label} />
                    ))}
                </div>
            </div>
        </Paper>
    );
};

export default function SkillsTab() {
    return (
        <div>
            <SkillCategory title="FRONT-END" skills={[...skills, ...cssSkills]} />
            <br />
            <br />
            <SkillCategory title="BACK-END" skills={backendSkills} />
            <br />
            <br />
            <SkillCategory title="OTHERS" skills={othersSkills} />
        </div>
    );
}