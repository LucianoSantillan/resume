import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Router from "next/router"
import styles from './Loading.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/contexts/toastProvider';

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return <ToastProvider> {loading ? <Loading /> : <SessionProvider><Component {...pageProps} /></SessionProvider>}</ToastProvider>
}
