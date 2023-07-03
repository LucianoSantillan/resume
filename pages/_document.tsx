import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface DocumentProps {
  session: Session
}

export default function Document({ session }: DocumentProps) {
  return (
    <Html lang="en">
      <Head />
      <body>
        <SessionProvider session={session}>
          <Main />
          <NextScript />
        </SessionProvider>
      </body>
    </Html>
  )
}
