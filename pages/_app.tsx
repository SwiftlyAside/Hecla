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
import CurrentPlaybackResponse = SpotifyApi.CurrentPlaybackResponse

type GlobalContextProps = {
  searchResponse?: SearchResponse
  setSearchResponse?: Dispatch<SetStateAction<SearchResponse | undefined>>
  currentPlayback?: CurrentPlaybackResponse
  setCurrentPlayback?: Dispatch<
    SetStateAction<CurrentPlaybackResponse | undefined>
  >
  isPlaying?: boolean
  setIsPlaying?: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextProps>({})

function Website({ Component, pageProps, router }: AppProps) {
  const [searchResponse, setSearchResponse] = useState<SearchResponse>()
  const [currentPlayback, setCurrentPlayback] =
    useState<CurrentPlaybackResponse>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{
        searchResponse: searchResponse,
        setSearchResponse: setSearchResponse,
        currentPlayback: currentPlayback,
        setCurrentPlayback: setCurrentPlayback,
        isPlaying: isPlaying,
        setIsPlaying: setIsPlaying
      }}
    >
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Layout router={router}>
            <AnimatePresence
              mode="wait"
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
