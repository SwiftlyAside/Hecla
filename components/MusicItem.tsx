import React from 'react'
import {
  Heading,
  Image,
  ListItem,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import TrackObjectFull = SpotifyApi.TrackObjectFull

interface MusicItemProps {
  music: TrackObjectFull
  onMusicSelect: (music: TrackObjectFull) => void
}

const MusicItem: React.FC<MusicItemProps> = ({ music, onMusicSelect }) => {
  return (
    <ListItem
      _hover={{ bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.500') }}
      py={2}
      borderRadius={10}
      className="music-item"
      onClick={() => onMusicSelect(music)}
    >
      <Image src={music.album.images[2].url} alt={music.name} px={2} />
      <Stack direction="column">
        <Heading size="sm">{music.name}</Heading>
        <Heading color="grey" size="tiny">
          {music.artists[0].name} · {music.album.name}
        </Heading>
      </Stack>
    </ListItem>
  )
}

export default MusicItem
