import React from 'react'
import { Header } from 'semantic-ui-react'
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import TrackObjectFull = SpotifyApi.TrackObjectFull

interface MusicDetailProps {
  music: TrackObjectFull | undefined
}

const MusicDetail: React.FC<MusicDetailProps> = ({ music }) => {
  const renderedArtists = music?.artists.map(
    (artist, index: number) =>
      `By ${artist.name}${index < music.artists.length - 1 ? ', ' : ''}`
  )
  const backgroundColor = useColorModeValue('white', 'black')
  return (
    <Box minHeight="80vh" borderRadius="lg" backdropBlur={10}>
      <Grid templateRows={`${music && `7fr`} repeat(2,1fr)`} height="100%">
        {music && (
          <GridItem>
            <Center pt={5}>
              <Image
                boxSize="lg"
                src={music ? music.album.images[1].url : '/favicon.ico'}
                alt={music ? music.name : 'Default'}
              />
            </Center>
            <Divider
              backgroundColor={backgroundColor}
              orientation="horizontal"
              alignSelf="center"
              width="98%"
              my={5}
            />
          </GridItem>
        )}
        <GridItem>
          <Center height="100%">
            <Heading size="lg" textAlign="center">
              {music ? music.name : 'Not playing!'}
            </Heading>
          </Center>
        </GridItem>
        <GridItem>
          <Center height="100%">
            <Heading size="sm" textAlign="center">
              {music ? renderedArtists : 'Not playing!'}
            </Heading>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default MusicDetail
