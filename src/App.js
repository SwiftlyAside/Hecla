import React from 'react';
import SearchBar from './components/SearchBar';
import spotify from './api/spotify';
import MusicList from './components/MusicList';

const querystring = require('querystring');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      albums: [],
      artists: [],
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
        spotify
          .get('/search', {
            params: {
              q: term,
            },
            headers: {
              Authorization: `Bearer ${authResponse.data.access_token}`,
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

  render() {
    return (
      <div>
        <div className="ui container">
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <MusicList musics={this.state.tracks} />
          <h1>
            {this.state.tracks.length}
            &nbsp;Tracks.&nbsp;
            {this.state.albums.length}
            &nbsp;Albums.&nbsp;
            {this.state.artists.length}
            &nbsp;Artists.&nbsp;
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
