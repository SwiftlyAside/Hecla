import React from "react";
import { Divider, Header, Image, Segment } from "semantic-ui-react";

interface MusicDetailProps {
  music: any | undefined;
}

const MusicDetail: React.FC<MusicDetailProps> = ({ music }) => {
  const renderedArtists = music?.artists.map((artist: { name: any }, index: number) => {
    return `By ${artist.name}${index < music.artists.length - 1 ? ", " : ""}`;
  });
  return (
    <Segment padded className="hecla-segment">
      <Image
        size="medium"
        src={music ? music.album.images[1].url : "/favicon.ico"}
        alt={music ? music.name : "Default"}
        centered
        rounded
      />
      <Divider section />
      <Header size="large" textAlign="center">
        {music ? music.name : "Not playing!"}
      </Header>
      <Header textAlign="center">{music ? renderedArtists : "Not playing!"}</Header>
    </Segment>
  );
};

export default MusicDetail;
