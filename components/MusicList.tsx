import React from 'react'
import MusicItem from './MusicItem'
import {
  Box,
  Center,
  Heading,
  List,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import PagingObject = SpotifyApi.PagingObject

interface MusicListProps {
  onMusicSelect: (music: TrackObjectFull) => void
  musics: PagingObject<TrackObjectFull> | undefined
}

const MusicList: React.FC<MusicListProps> = ({ onMusicSelect, musics }) => {
  const renderedList = musics?.items.map(music => {
    return (
      <MusicItem key={music.id} music={music} onMusicSelect={onMusicSelect} />
    )
  })
  if (musics && musics.total !== 0) {
    return (
      <Box py={5} height="80vh" borderRadius="lg" className="hecla-segment">
        <Tabs variant="soft-rounded" height="100%" overflowY="scroll">
          <TabList>
            <Tab>Tracks</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading>Tracks</Heading>
              <List className="hecla-list">{renderedList}</List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    )
  } else {
    return (
      <Box py={5} height="80vh" borderRadius="lg" className="hecla-segment">
        <Center height="100%">
          <Heading>No results</Heading>
        </Center>
      </Box>
    )
  }
}

export default MusicList
