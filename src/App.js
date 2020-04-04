import React from 'react';
import PropTypes from 'prop-types'

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

const musicILove = [
    {
        id: 1,
        track: "Sahara Love",
        artist: "Above & Beyond",
        album: "Common Ground",
        picture: "https://img.discogs.com/dk9xCftpIiVWTIse8o8mIKjqeyY=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11494464-1518129905-7041.jpeg.jpg",
        plays: 2127627
    },
    {
        id: 2,
        track: "Mr Fear",
        artist: "SIAMÉS",
        album: "Bounce Into The Music",
        picture: "https://img.discogs.com/bWSPamIKRZyccr4rTrkegtmSKds=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13506702-1560705343-8159.jpeg.jpg",
        plays: 8796854
    },
    {
        id: 3,
        track: "Will We Remain?",
        artist: "Ilan Bluestone",
        album: "Scars",
        picture: "https://img.discogs.com/xVKM5d4PxDve4eA9dLx8TAExvwE=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11922647-1524817669-1306.jpeg.jpg",
        plays: 1186403
    }
];


function App() {
    return (
        <div className="App">
            {musicILove.map(one => (
                <Music key={one.id} track={one.track} artist={one.artist} album={one.album} picture={one.picture}
                       plays={one.plays}/>
            ))}
        </div>
    );
}

export default App;
