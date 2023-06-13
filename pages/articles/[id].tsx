import React from 'react'
import { useRouter } from 'next/router'

export default function Article() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Article: {id}</h1>
    </div>
  )
}
