import {
  Box,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion'
import CurrentPlaybackResponse = SpotifyApi.CurrentPlaybackResponse

interface MiniPlayerProps {
  playbackState?: CurrentPlaybackResponse
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ playbackState }) => {
  const currentItem = playbackState?.item
  const imageSrc =
    currentItem && 'album' in currentItem
      ? currentItem.album?.images[1].url
      : currentItem?.show.images[1].url
  const artists =
    currentItem && 'album' in currentItem
      ? currentItem?.artists.map(
          (artist, index) => `${index !== 0 ? `, ` : ''}${artist.name}`
        )
      : currentItem?.show.publisher

  const progress = (playbackState?.progress_ms ?? 0) / 1000

  const max = (playbackState?.item?.duration_ms ?? 1) / 1000

  const backgroundColor = useColorModeValue('#ffffff40', '#20202380')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        position="fixed"
        as="footer"
        w="100%"
        bg={backgroundColor}
        css={{ backdropFilter: 'blur(10px)' }}
        zIndex={1}
        bottom={0}
        borderRadius={10}
        className="mini-player"
      >
        <Stack direction="row" p={5}>
          <Image
            width={50}
            height={50}
            src={imageSrc}
            alt={currentItem?.name}
          />
          <Box className="mini-player-info">
            <Text>{currentItem?.name}</Text>
            <Text fontSize="sm">{artists}</Text>
          </Box>
        </Stack>
        <Progress size="sm" max={max} value={progress} />
      </Box>
    </motion.div>
  )
}

export default MiniPlayer
