import React from 'react';
import MusicItem from './MusicItem';

const MusicList = ({ musics }) => {
  const renderedList = musics.map(music => {
    return <MusicItem music={music} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default MusicList;
