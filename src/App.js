import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import spotify from './api/spotify';
import MusicList from './components/MusicList';
import MusicDetail from './components/MusicDetail';
import useMusics from './hooks/useMusics';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState(null);
  const [musics, token, search] = useMusics('P*Light');
  const [selectedMusic, setSelectedMusic] = useState(null);

  const onLoginClicked = () => {
    const state = Math.random().toString(36).substr(2, 11);
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=dfdf35eef5d146278f21b11e31b07320&response_type=code&redirect_uri=https:%2F%2hecla.vercel.app&state=${state}`,
    );
  };

  useEffect(() => {
    setSelectedMusic(musics[0]);
  }, [musics]);

  const onMusicSelect = music => {
    setSelectedMusic(music);
    spotify.put(
      '/me/player/play',
      {
        context_uri: music.uri,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  };

  /*    // eslint-disable-next-line react/no-this-in-sfc
    const search = this.props.location;
    if (search !== undefined) {
      const params = new URLSearchParams(search);
      setCode(params.get('code'));
    } */

  return (
    <div>
      <div className="ui container">
        <button type="button" onClick={onLoginClicked} className="ui button">
          {code === null ? 'Login' : 'Logout'}
        </button>
        <SearchBar onFormSubmit={search} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <MusicDetail music={selectedMusic} />
            </div>
            <div className="five wide column">
              <MusicList onMusicSelect={onMusicSelect} musics={musics} />
            </div>
          </div>
        </div>
        <h3>
          {musics.length}
          &nbsp;Tracks.&nbsp;
        </h3>
      </div>
    </div>
  );
};

export default App;
