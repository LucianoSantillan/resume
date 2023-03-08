import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutSectionTitle}>ABOUT ME</div>
      <div className={styles.aboutDetails}>
        I am a frontend developer. I have worked in many different industries such as insurance, bank, credit agencies, accountability,
        trucks port management, and more. I`ve participied in more than 9 software solutions. I create fast, clean, and maintainable
        web applications. I can help you deliver a seamless and engaging experience to your users. Background as a full-stack developer
        as well.
        <br />
        <br />
        I have over 5 years of experience in developing web applications by using the technical techniques to make sure changes will be
        easier in the future and code to be understandable for the incoming developers.
        <br />
        <br />
        I’m available during the week to discuss for future opportunities.
      </div>
    </div>
  )
}
