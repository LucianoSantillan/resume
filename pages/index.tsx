import React from 'react';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/Banner/Banner';
import About from '@/components/About/About';;
import Navbar from '@/components/Navbar/Navbar';
import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';
import SkillsAndExperience from '@/components/SkillsAndExperience/SkillsAndExperience'

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
        <Navbar></Navbar>
        <Banner />
        <About />
        <SkillsAndExperience />
        <ContactForm></ContactForm>
        <Footer />
      </main>
    </>
  )
}
