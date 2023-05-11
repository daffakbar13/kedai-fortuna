import { Stack } from '@mui/material'
import Head from 'next/head'
import React from 'react'

export default function RootLayout(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <>
      <Head>
        <title>Kedai Fortuna</title>
        <meta name="description" content="Kasir Kedai Fortuna" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack id="root-layout" height="100vh" margin="auto">
        {children}
      </Stack>
    </>
  )
}
