import styles from './Banner.module.css'
import Button from '@mui/material/Button';
import { scroller as scroll } from 'react-scroll';

const handleClick = () => {
  scroll.scrollTo('about-section', {
    duration: 1000,
    delay: 0, // Delay before scrolling starts
    smooth: 'easeInOutQuint'
  });
};

export default function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerContent}>
                <div className={styles.shapeOuterChevronRight}>
                    <div className={styles.shapeInnerChevronRight}></div>
                </div>
                <div className={styles.bannerTextAndBtn}>
                    <div className={styles.sayHi}> Hi! My name is Luciano</div>
                    <div className={styles.whoIAm}>
                        I’m a Frontend Developer, specialized in development of web applications using React, Next.js, and more!
                    </div>
                    <Button onClick={handleClick} variant="contained">FIND OUT MORE</Button>
                </div>
            </div>
        </div>
    )
}
