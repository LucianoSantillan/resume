import React from 'react';
import styles from './SkillsAndExperience.module.css';
import { Box, NoSsr, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SkillsTab from '../SkillsTab/SkillsTab';
import VerticalTabs from '../ExperienceTab/ExperienceTab';

export const SKILLS_AND_EXPERIENCE_SECTION_ID = 'skills-and-experience-section';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ overflow: 'auto', maxWidth: '100%' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        style: { fontSize: '23px' },
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SkillsAndExperience() {

    const [tab, setTab] = useState<number>(0)

    return (

        <div id={SKILLS_AND_EXPERIENCE_SECTION_ID} className={styles.skillsAndExperience}>
            <div className={styles.container}>
                <div className={styles.tabsContainer}>
                    <Tabs value={tab} onChange={(_, value) => { console.log(value); setTab(value) }}>
                        <Tab label="SKILLS" {...a11yProps(0)} />
                        <Tab label="EXPERIENCE" {...a11yProps(1)} />
                    </Tabs>
                </div>
                <TabPanel data-aos="fade-left" value={tab} index={0}>
                    <SkillsTab />
                </TabPanel>
                <TabPanel data-aos="fade-left" value={tab} index={1}>
                    <VerticalTabs />
                </TabPanel>
            </div>
            <Button
                variant="contained"
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/luciano-santill%C3%A1n-b11ab4178/"
                target="_blank"
                rel="noopener"
                role='button'
                className={styles.linkedInButton}
            >
                LinkedIn
            </Button>
        </div>
    )
}
