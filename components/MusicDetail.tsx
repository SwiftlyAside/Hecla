import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

interface MusicDetailProps {
  music: any | undefined;
}

const MusicDetail: React.FC<MusicDetailProps> = ({ music }) => {
  const renderedArtists = music?.artists.map((artist: { name: any }, index: number) => {
    return `By ${artist.name}${index < music.artists.length - 1 ? ", " : ""}`;
  });
  return (
    <>
      <Segment style={{ height: "350px" }}>
        <Image
          src={music ? music.album.images[1].url : "/favicon.ico"}
          alt={music ? music.name : "Default"}
          centered
          rounded
        />
      </Segment>
      <Segment textAlign="center">
        <Header size="large">{music ? music.name : "Not playing!"}</Header>
        <Header>{music ? renderedArtists : "Not playing!"}</Header>
      </Segment>
    </>
  );
};

export default MusicDetail;
