import React from 'react';
import styles from './About.module.css'

export const ABOUT_SECTION_ID = 'about-section';

export default function About() {
  return (
    <div id={ABOUT_SECTION_ID} className={styles.aboutSection}>
      <div data-aos="fade-left" className={styles.aboutSectionTitle}>ABOUT ME</div>
      <div data-aos="fade-left" className={styles.aboutDetails}>
        I am a frontend developer with experience across a variety of industries, including insurance, banking, credit agencies, accountability, truck port management, and more. I have contributed to the development of over 9 software solutions, creating fast, clean, and maintainable web applications. My skills can help you deliver a seamless and engaging experience to your users. In addition, I have a background as a full-stack developer.
        <br />
        <br />
        With over 5 years of experience, I focus on using technical techniques that ensure changes are easier in the future and the code is understandable for other developers. I am available during the week to discuss future opportunities.      </div>
    </div>
  )
}
