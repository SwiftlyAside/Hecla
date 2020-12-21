import './MusicItem.css';
import React from 'react';

const MusicItem = ({ music, onMusicSelect }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={() => onMusicSelect(music)} className="music-item item">
      <img
        className="ui image"
        src={music.album.images[2].url}
        alt={music.name}
      />
      <div className="content">
        <div className="header">{music.name}</div>
      </div>
    </div>
  );
};

export default MusicItem;
