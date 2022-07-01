import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/provider'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'
import { AnimatePresence } from 'framer-motion'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import SearchResponse = SpotifyApi.SearchResponse
import TrackObjectFull = SpotifyApi.TrackObjectFull

type GlobalContextProps = {
  searchResponse?: SearchResponse
  setSearchResponse?: Dispatch<SetStateAction<SearchResponse | undefined>>
  track?: TrackObjectFull
  setTrack?: Dispatch<SetStateAction<TrackObjectFull | undefined>>
  isPlaying?: boolean
  setIsPlaying?: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextProps>({})

function Website({
  Component,
  pageProps: { session, ...pageProps },
  router
}: AppProps) {
  const [searchResponse, setSearchResponse] = useState<SearchResponse>()
  const [track, setTrack] = useState<TrackObjectFull>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{
        searchResponse: searchResponse,
        setSearchResponse: setSearchResponse,
        track: track,
        setTrack: setTrack,
        isPlaying: isPlaying,
        setIsPlaying: setIsPlaying
      }}
    >
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Layout router={router}>
            <AnimatePresence
              exitBeforeEnter
              initial={true}
              onExitComplete={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }
              }}
            >
              <Component {...pageProps} />
            </AnimatePresence>
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </GlobalContext.Provider>
  )
}

export default Website
