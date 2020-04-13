import React from 'react'
import axios from 'axios'

/*
function Music({track, artist, album, picture, plays}) {
    return (
        <div>
            <h2>{track}</h2>
            <h4>Artist: {artist}</h4>
            <h4>Album: {album}</h4>
            <h4>This song was played {plays} times on Spotify.</h4>
            <img src={picture} alt={track}/>
        </div>
    )
}

Music.propTypes = {
    track: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    plays: PropTypes.number.isRequired
}
*/

class App extends React.Component {
    state = {
        plays: 123805,
        isLoading: true,
        musics: [],
    };

    add = () => {
        this.setState(current => ({plays: current.plays + 1}));
    }

    // 'https://api.spotify.com/v1/users/{user_id}/playlists?limit={limit}&offset={offset}'
    getMusics = async () => {
        const client_id = 'dfdf35eef5d146278f21b11e31b07320'
        const client_secret = '88d73d703a01425287796c10e89af5ae'

        const musics = await axios.post(
          'https://accounts.spotify.com/api/token', {
              Authorization: `Basic ${new Buffer(
                client_id + ':' + client_secret).toString('base64')}`,
              form: {
                  grant_type: 'client_credentials',
              },
              json: true,
          }).then((body) => {
              var token = body.access_token

              axios.get(
                'https://api.spotify.com/v1/users/siderilust/playlists?limit=10&offset=5',
                {})
          },
        )

        const musics1 = await axios({
            url: 'https://api.spotify.com/v1/users/siderilust/playlists?limit=10&offset=5',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                // User implicit OAuth
                // "Authorization": "Bearer BQDrRK5sf3AQyWc6EjpeBuKkXF2tvJRxI15si0FYThpYSAcgGTL_ZbP1XK6cqTy3wAWcV9jBrdFyyUG4fvl5_nogSoXeba7wdegQN-qnXaqLrAokjAhGTAw0C_A8ElSNrkJL4hnNoVLSfEQ",

                // App Credential Auth, Client ID + Client Secret (base64)
                'Authorization': 'Basic ZGZkZjM1ZWVmNWQxNDYyNzhmMjFiMTFlMzFiMDczMjA6ODhkNzNkNzAzYTAxNDI1Mjg3Nzk2YzEwZTg5YWY1YWU=',
            },
        });
    }

    componentDidMount() {
        this.getMusics();
    }

    render() {
        return (
            <div>
                <h1>This song was played {this.state.plays} times on Spotify.</h1>
                <button onClick={this.add}>Play</button>
                <button>Pause</button>
            </div>
        );
    }
}

export default App;
