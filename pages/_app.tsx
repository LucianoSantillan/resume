import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Router from "next/router"

import styles from './Loading.module.css';

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

  return loading ? <Loading /> : <Component {...pageProps} />
}
