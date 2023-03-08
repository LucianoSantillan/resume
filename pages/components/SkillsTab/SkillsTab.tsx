import styles from '@/styles/Home.module.css'
import { FC } from 'react';

const SkillItem: FC<{ content: string, link?: string }> = ({ content, link }) => {
    return (
        <span className={styles.skillListItem}>
            <span className={styles.skillListItemBall}></span>{content}
        </span>
    )
}

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

export default function SkillsTab() {
    return (
        <>
            <span className={styles.skill}>
                <span className={styles.skillType}>Front-end</span>
                <span className={styles.skillContent}>
                    <span className={styles.skillContentTitle}>JavaScript</span>
                    <br />
                    <span className={styles.skillContentList}>
                        {skills.map((skill) => <SkillItem key={skill.label} content={skill.label} />)}
                    </span>
                    <br />
                    <br />
                    <span className={styles.skillContentTitle}>HTML & CSS</span>
                    <br />
                    <span className={styles.skillContentList}>
                        {cssSkills.map((skill) => <SkillItem key={skill.label} content={skill.label} />)}
                    </span>

                </span>
            </span>
            <br />
            <br />
            <span className={styles.skill}>
                <span className={styles.skillType}>Back-end</span>
                <span className={styles.skillContent}>
                    <span className={styles.skillContentList}>
                        {backendSkills.map((skill) => <SkillItem key={skill.label} content={skill.label} />)}
                    </span>
                </span>
            </span>
            <br />
            <br />
            <span className={styles.skill}>
                <span className={styles.skillType}>Others</span>
                <span className={styles.skillContent}>
                    <span className={styles.skillContentList}>
                        {othersSkills.map((skill) => <SkillItem key={skill.label} content={skill.label} />)}
                    </span>
                </span>
            </span>
        </>
    )
}