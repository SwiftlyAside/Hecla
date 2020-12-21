import React from 'react';
import MusicItem from './MusicItem';

const MusicList = ({ onMusicSelect, musics }) => {
  const renderedList = musics.map(music => {
    return (
      <MusicItem key={music.id} onMusicSelect={onMusicSelect} music={music} />
    );
  });
  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default MusicList;
