import { useState, useEffect } from 'react';
import spotify from '../api/spotify';

const querystring = require('querystring');

const useMusics = defaultSearchTerm => {
  const clientId = 'dfdf35eef5d146278f21b11e31b07320';
  const clientSecret = '2f1794f08c3440009dec13900a00b031';
  const [musics, setMusics] = useState([]);
  const [token, setToken] = useState(null);

  const search = async term => {
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
            setMusics(queryResponse.data.tracks.items);
          });
      });
  };

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  return [musics, token, search];
};

export default useMusics;
