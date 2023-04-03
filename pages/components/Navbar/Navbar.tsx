import { AppBar, Button, Toolbar } from '@mui/material';
import { scroller as scroll } from 'react-scroll';

const handleClick = (elementId: string) => {
  scroll.scrollTo(elementId, {
    duration: 1000, // Duration of the animation
    delay: 0, // Delay before scrolling starts
    smooth: 'easeInOutQuint' // Easing function
  });
};

function Navbar() {
  return (
    <AppBar position="fixed" sx={{backgroundColor: "#fff", color: 'black', top: 0}}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Button onClick={() => handleClick("about-section")} color="inherit">About</Button>
        <Button onClick={() => handleClick("skills-and-experience-section")} color="inherit">Experience</Button>
        <Button onClick={() => handleClick("contact-section")} color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
