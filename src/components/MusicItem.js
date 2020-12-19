import './MusicItem.css';
import React from 'react';

const MusicItem = ({ music }) => {
  return (
    <div className="music-item item">
      <img
        className="ui image"
        src={music.album.images[1].url}
        alt={music.name}
      />
      <div className="content">
        <div className="header">{music.name}</div>
      </div>
    </div>
  );
};

export default MusicItem;
