import { Router } from 'next/router'
import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../navbar'
import MiniPlayer from '../mini-player'
import { usePlaybackState } from '../../lib/spotify'

type MainLayoutProps = {
  children: React.ReactNode
  router: Router
}

const Layout = ({ children, router }: MainLayoutProps) => {
  const { playbackState, isError } = usePlaybackState()

  const currentItem = playbackState?.item
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
          {`${
            currentItem &&
            `${currentItem.name} By ${
              'artists' in currentItem
                ? currentItem.artists[0].name
                : currentItem.show.publisher
            } : `
          }Hecla`}
        </title>
      </Head>
      <Navbar path={router.asPath} terms={''} />
      <Container maxW="container.lg" pt={20}>
        {children}
      </Container>
      {!isError && <MiniPlayer playbackState={playbackState} />}
    </Box>
  )
}

export default Layout
