import React from "react";
import { Header, Image, ItemContent, List } from "semantic-ui-react";

interface MusicItemProps {
  music: any;
  onMusicSelect: (music: any) => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ music, onMusicSelect }) => {
  return (
    <List.Item className="music-item" onClick={() => onMusicSelect(music)}>
      <Image src={music.album.images[2].url} alt={music.name} rounded />
      <ItemContent>
        <Header>{music.name}</Header>
      </ItemContent>
    </List.Item>
  );
};

export default MusicItem;
