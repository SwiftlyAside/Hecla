import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import spotify from './api/spotify';
import MusicList from './components/MusicList';
import MusicDetail from './components/MusicDetail';

const querystring = require('querystring');

const App = () => {
  const clientId = 'dfdf35eef5d146278f21b11e31b07320';
  const clientSecret = '2f1794f08c3440009dec13900a00b031';

  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [token, setToken] = useState(null);

  const onLoginClicked = () => {
    const state = Math.random().toString(36).substr(2, 11);
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=dfdf35eef5d146278f21b11e31b07320&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000&state=${state}`,
    );
  };

  const onTermSubmit = async term => {
    const authorization = `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`,
    ).toString('base64')}`;

    await spotify
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization: authorization,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(authResponse => {
        setToken(`Bearer ${authResponse.data.access_token}`);
        spotify
          .get('/search', {
            params: {
              q: term,
              type: 'album,artist,track',
            },
            headers: {
              Authorization: token,
            },
          })
          .then(queryResponse => {
            console.log(queryResponse.data);
            setTracks(queryResponse.data.tracks.items);
            setAlbums(queryResponse.data.albums.items);
            setArtists(queryResponse.data.artists.items);
            setSelectedMusic(queryResponse.data.tracks.items[0]);
          });
      });
  };

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

  useEffect(() => {
    /*    // eslint-disable-next-line react/no-this-in-sfc
    const search = this.props.location;
    if (search !== undefined) {
      const params = new URLSearchParams(search);
      setCode(params.get('code'));
    } */
    onTermSubmit('Coldplay');
  }, []);

  return (
    <div>
      <div className="ui container">
        <button type="button" onClick={onLoginClicked} className="ui button">
          Login/Logout
        </button>
        <SearchBar onFormSubmit={onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <MusicDetail music={selectedMusic} />
            </div>
            <div className="five wide column">
              <MusicList onMusicSelect={onMusicSelect} musics={tracks} />
            </div>
          </div>
        </div>
        <h3>
          {tracks.length}
          &nbsp;Tracks.&nbsp;
          {albums.length}
          &nbsp;Albums.&nbsp;
          {artists.length}
          &nbsp;Artists.&nbsp;
        </h3>
      </div>
    </div>
  );
};

export default App;
