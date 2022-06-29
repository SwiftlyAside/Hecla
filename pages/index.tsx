import type { NextPage } from 'next'
import 'semantic-ui-css/semantic.min.css'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import MusicDetail from '../components/MusicDetail'
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
  SimpleGrid,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { GlobalContext } from './_app'
import TrackObjectFull = SpotifyApi.TrackObjectFull

const Home: NextPage = () => {
  const { data: session } = useSession()
  const { searchResponse, track, setTrack } = useContext(GlobalContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const onMusicSelect = (track: TrackObjectFull) => {
    if (!session) {
      onOpen()
      return
    }
    if (setTrack) {
      setTrack(track)
    }
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'put',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      },
      body: JSON.stringify({
        uris: [track.uri]
      })
    })
  }

  return (
    <>
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
        <SimpleGrid columns={[1, null, 2]} spacing="20px">
          <MusicDetail music={track} />
          <MusicList
            musics={searchResponse?.tracks}
            onMusicSelect={onMusicSelect}
          />
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Home
