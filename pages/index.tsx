import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Banner from './components/Banner/Banner';
import About from './components/About/About';
import SkillsTab from './components/SkillsTab/SkillsTab';

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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner />
        <About />
        <div className={styles.skillsAndExperience}>
          <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '870px' }}>
              <Tabs value={0} onChange={() => { }}>
                <Tab label="SKILLS" {...a11yProps(0)} />
                {/* <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={0} index={0}>
              <SkillsTab />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel> */}
          </Box>
        </div>
      </main>
    </>
  )
}
