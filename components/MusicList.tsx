import React from "react";
import { Header, Image, ItemContent, List } from "semantic-ui-react";
import MusicItem from "./MusicItem";

interface MusicListProps {
  onMusicSelect: (music: any) => void;
  musics: any;
}

const MusicList: React.FC<MusicListProps> = ({ onMusicSelect, musics }) => {
  const renderedList = musics?.map((music: { id: React.Key | null | undefined }) => {
    return <MusicItem key={music.id} music={music} onMusicSelect={onMusicSelect} />;
  });
  return (
    <List className="hecla-list" relaxed divided>
      {musics ? (
        renderedList
      ) : (
        <List.Item className="music-item">
          <Image src="/favicon.ico" alt="nothing" rounded />
          <ItemContent>
            <Header>No results</Header>
          </ItemContent>
        </List.Item>
      )}
    </List>
  );
};

export default MusicList;
