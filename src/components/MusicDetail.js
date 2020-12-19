import React from 'react';

const MusicDetail = ({ music }) => {
  if (!music) {
    return <div>Not playing</div>;
  }

  const renderedArtists = music.artists.map((artist, index) => {
    return `${artist.name}${index < music.artists.length - 1 ? ', ' : ''}`;
  });

  return (
    <div>
      <div className="ui segment">
        <img
          className="ui image centered"
          src={music.album.images[1].url}
          alt={music.name}
        />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{music.name}</h4>
        <p>{renderedArtists}</p>
      </div>
    </div>
  );
};

export default MusicDetail;
