import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './ExperienceTab.module.css';

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={styles.tabPanel}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const jobData = [{
    position: "Frontend Developer", company: "Babel - Inditex", dates: "September 2022 - Present", tasks: ["User interface development", "Unit and Integration tests", "Project architecture and data flow design", "Next sprint backlog reviewer"]
  },
  {
    position: "React Frontend Developer",
    company: "Colppy",
    dates: "September 2021 - May 2022 (8 months)",
    tasks: [
      "User interface development",
      "Unit and Integration tests",
      "Error tracking technologies data collection/research responsibility"
    ]
  },
  {
    position: "React Frontend Developer",
    company: "Digbang Group",
    dates: "February 2021 - September 2021 (8 months)",
    tasks: [
      "User interface development",
      "Unit and Integration tests",
      "React Hooks initiation"
    ]
  },
  {
    position: "Full Stack Developer",
    company: "SoulIT Solutions",
    dates: "September 2019 - February 2021 (1 year and 6 months)",
    tasks: [
      "User interface development",
      "React classes initiation"
    ]
  },
  {
    position: "ASP.NET MVC FullStack developer",
    company: "Others",
    dates: "July 2018 - August 2019 (13 months)",
    tasks: [
      "FullStack development"
    ]
  }
  ];


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', height: 224, color: '#212529' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {jobData.map((job, index) => (
          <Tab key={job.company} label={job.company} {...a11yProps(index)} />
        ))}
      </Tabs>
      {jobData.map((job, index) => (
        // <div className={styles.tabPanel} >
        <TabPanel key={job.company} value={value} index={index}>
          <Typography className={styles.positionText}>
            {job.position}</Typography>
          <Typography className={styles.datesText} variant="h5">{job.dates}</Typography>
          <ul className={styles.list}>
            {job.tasks.map((task, taskIndex) => (
              <li key={taskIndex}>{task}</li>
            ))}
          </ul>
        </TabPanel>
        // </div>
      ))}

    </Box>
  );
}