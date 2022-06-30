import TrackObjectFull = SpotifyApi.TrackObjectFull
import { Box, Image, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AnimatedArea from './animated-area'
import { motion } from 'framer-motion'

interface MiniPlayerProps {
  track?: TrackObjectFull
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ track }) => {
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
        bg={useColorModeValue('#ffffff40', '#20202380')}
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
            src={track?.album.images[0].url}
            alt={track?.name}
          />
          <div className="mini-player-info">
            <div className="mini-player-info-title">{track?.name}</div>
            <div className="mini-player-info-artist">
              {track?.artists.map(
                (artist, index) => `${index !== 0 ? `, ` : ''}${artist.name}`
              )}
            </div>
          </div>
        </Stack>
      </Box>
    </motion.div>
  )
}

export default MiniPlayer
