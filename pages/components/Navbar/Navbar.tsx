import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { scroller } from 'react-scroll';
import { ABOUT_SECTION_ID } from '../About/About';
import { SKILLS_AND_EXPERIENCE_SECTION_ID } from '../SkillsAndExperience/SkillsAndExperience';
import { CONTACT_SECTION_ID } from '../ContactForm/ContactForm';

const handleClick = (elementId: string) => {
  scroller.scrollTo(elementId, {
    duration: 1000,
    delay: 0,
    smooth: 'easeInOutQuint'
  });
};

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: 'black', top: 0 }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Button onClick={() => handleClick(ABOUT_SECTION_ID)} color="inherit">About</Button>
        <Button onClick={() => handleClick(SKILLS_AND_EXPERIENCE_SECTION_ID)} color="inherit">Experience</Button>
        <Button onClick={() => handleClick(CONTACT_SECTION_ID)} color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
