import React from 'react';
import SearchBar from './components/SearchBar';
import spotify from './api/spotify';
import MusicList from './components/MusicList';
import MusicDetail from './components/MusicDetail';

const querystring = require('querystring');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selectedMusic: null,
      tracks: [],
      albums: [],
      artists: [],
      token: null,
    };
  }

  onTermSubmit = async term => {
    const clientId = 'dfdf35eef5d146278f21b11e31b07320';
    const clientSecret = '2f1794f08c3440009dec13900a00b031';
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
        this.setState({ token: `Bearer ${authResponse.data.access_token}` });
        spotify
          .get('/search', {
            params: {
              q: term,
            },
            headers: {
              Authorization: this.state.token,
            },
          })
          .then(queryResponse => {
            console.log(queryResponse.data);
            this.setState({
              tracks: queryResponse.data.tracks.items,
              albums: queryResponse.data.albums.items,
              artists: queryResponse.data.artists.items,
            });
          });
      });
  };

  onMusicSelect = music => {
    this.setState({ selectedMusic: music });
    spotify.put(
      '/me/player/play',
      {},
      {
        headers: {
          Authorization: this.state.token,
        },
      },
    );
  };

  render() {
    return (
      <div>
        <div className="ui container">
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <MusicDetail music={this.state.selectedMusic} />
          <MusicList
            onMusicSelect={this.onMusicSelect}
            musics={this.state.tracks}
          />
          <h3>
            {this.state.tracks.length}
            &nbsp;Tracks.&nbsp;
            {this.state.albums.length}
            &nbsp;Albums.&nbsp;
            {this.state.artists.length}
            &nbsp;Artists.&nbsp;
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
