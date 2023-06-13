import React, { useState } from 'react';
import { AppBar, Button, Toolbar, IconButton } from '@mui/material';
import { scroller } from 'react-scroll';
import { ABOUT_SECTION_ID } from '../About/About';
import { SKILLS_AND_EXPERIENCE_SECTION_ID } from '../SkillsAndExperience/SkillsAndExperience';
import { CONTACT_SECTION_ID } from '../ContactForm/ContactForm';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

function Navbar() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const router = useRouter();

  enum NavItem {
    about = "About",
    experience = "Experience",
    contact = "Contact",
    articles = "Articles"
  }

  const scrollToElement = (elementId: string) => {
    scroller.scrollTo(elementId, {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuint'
    });
  }

  const handleNavLinkClick = (clickedNavItem: NavItem) => {
    setBurgerMenuOpen(false);
    if (clickedNavItem === NavItem.about) {
      if (router.pathname === '/') {
        scrollToElement(ABOUT_SECTION_ID);
      } else {
        router.push(`/#${ABOUT_SECTION_ID}`);
      }
    } else if (clickedNavItem === NavItem.experience) {
      if (router.pathname === '/') {
        scrollToElement(SKILLS_AND_EXPERIENCE_SECTION_ID);
      } else {
        router.push(`/#${SKILLS_AND_EXPERIENCE_SECTION_ID}`);
      }
    } else if (clickedNavItem === NavItem.contact) {
      if (router.pathname === '/') {
        scrollToElement(CONTACT_SECTION_ID);
      } else {
        router.push(`/#${CONTACT_SECTION_ID}`);
      }
    } else if (clickedNavItem === NavItem.articles) {
      router.push('/articles');
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: 'black', top: 0 }}>
      <Toolbar>
        <div className={styles.navbar}>
          <Button onClick={() => handleNavLinkClick(NavItem.about)} color="inherit">About</Button>
          <Button onClick={() => handleNavLinkClick(NavItem.experience)} color="inherit">Experience</Button>
          <Button onClick={() => handleNavLinkClick(NavItem.contact)} color="inherit">Contact</Button>
          <Button onClick={() => handleNavLinkClick(NavItem.articles)} color="inherit">Articles</Button>
        </div>
        <div className={styles.burgerMenu}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleBurgerMenuClick}
          >
            {burgerMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </Toolbar>
      {/* {burgerMenuOpen && (
        <Toolbar>
          <Button onClick={() => handleNavLinkClick(ABOUT_SECTION_ID)} color="inherit">About</Button>
          <Button onClick={() => handleNavLinkClick(SKILLS_AND_EXPERIENCE_SECTION_ID)} color="inherit">Experience</Button>
          <Button onClick={() => handleNavLinkClick(CONTACT_SECTION_ID)} color="inherit">Contact</Button>
        </Toolbar>
      )} */}
    </AppBar>
  );
}

export default Navbar;

