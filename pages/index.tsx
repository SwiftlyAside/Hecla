import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import MusicList from '../components/MusicList'
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { GlobalContext } from './_app'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { motion } from 'framer-motion'
import { getDevices, play } from '../lib/spotify'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const { searchResponse, setTrack } = useContext(GlobalContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const onMusicSelect = async (track: TrackObjectFull) => {
    if (!session) {
      onOpen()
      return
    }
    console.log(await getDevices(`${session?.accessToken}`))
    if (setTrack) {
      setTrack(track)
    }
    await play(`${session?.accessToken}`, {
      context_uri: track.uri,
      uris: [track.uri]
    })
  }

  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 }
  }

  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="5px"
        />
        <ModalContent>
          <ModalHeader>Play Failed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You must login to play a song.</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container
        maxW="container.lg"
        backgroundColor={useColorModeValue('whiteAlpha.500', 'blackAlpha.500')}
        borderRadius="lg"
      >
        <MusicList
          musics={searchResponse?.tracks}
          onMusicSelect={onMusicSelect}
        />
      </Container>
    </motion.article>
  )
}

export default Home
