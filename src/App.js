import React from 'react';
import SearchBar from './components/SearchBar';
import spotify from './api/spotify';
import MusicList from './components/MusicList';
import MusicDetail from './components/MusicDetail';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const querystring = require('querystring');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMusic: null,
      tracks: [],
      albums: [],
      artists: [],
      clientId: 'dfdf35eef5d146278f21b11e31b07320',
      clientSecret: '2f1794f08c3440009dec13900a00b031',
      token: null,
    };
  }

  componentDidMount() {
    this.onTermSubmit('Coldplay');
  }

  onLoginClicked = () => {
    const state = Math.random().toString(36).substr(2, 11);
    // eslint-disable-next-line no-unused-vars
    const authorization = `Basic ${Buffer.from(
      `${this.state.clientId}:${this.state.clientSecret}`,
    ).toString('base64')}`;
    spotify.get(`${proxyurl}https://accounts.spotify.com/authorize`, {
      params: {
        client_id: this.state.clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:3000',
        state,
      },
    });
  };

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
              type: 'album,artist,track',
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
              selectedMusic: queryResponse.data.tracks.items[0],
            });
          });
      });
  };

  onMusicSelect = music => {
    this.setState({ selectedMusic: music });
    spotify.put(
      '/me/player/play',
      {
        context_uri: music.uri,
      },
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
          <button
            type="button"
            onClick={this.onLoginClicked}
            className="ui button"
          >
            Login/Logout
          </button>
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <MusicDetail music={this.state.selectedMusic} />
              </div>
              <div className="five wide column">
                <MusicList
                  onMusicSelect={this.onMusicSelect}
                  musics={this.state.tracks}
                />
              </div>
            </div>
          </div>
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
