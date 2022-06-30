import { Router } from 'next/router'
import React, { useContext } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../navbar'
import MiniPlayer from '../mini-player'
import { GlobalContext } from '../../pages/_app'

type MainLayoutProps = {
  children: React.ReactNode
  router: Router
}

const Layout = ({ children, router }: MainLayoutProps) => {
  const { track } = useContext(GlobalContext)

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Hecla, a web music player powered by spotify"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Ilan Kim" />
        <title>
          {track && `${track.name} By ${track.artists[0].name} : `}Hecla
        </title>
      </Head>
      <Navbar path={router.asPath} terms={''} />
      <Container maxW="container.lg" pt={20}>
        {children}
      </Container>
      {track && <MiniPlayer track={track} />}
    </Box>
  )
}

export default Layout
