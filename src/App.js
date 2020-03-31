import React from 'react';

function Cat({kinds, picture}) {
    return (
        <div>
            <h2>I love {kinds}.</h2>
            <img src={picture} alt={kinds}/>
        </div>
    )
}

const catILove = [
    {
        id: 1,
        kinds: "American Shorthair",
        picture: "https://www.thesprucepets.com/thmb/QVUzJyAhwdxLpP8fAfzjX1Aus_0=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-925319984-36b97d913d934d229d8b0d528a7da64e.jpg"
    },
    {
        id: 2,
        kinds: "Munchkin",
        picture: "https://www.thesprucepets.com/thmb/uu7O05OIOe1jfe9pDvHdIiOteFk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/munchkin-cat-relaxing-in-the-garden-johannesburg-667587109-57d9bb0f5f9b5865168d616a.jpg"
    },
    {
        id: 3,
        kinds: "Russian Blue",
        picture: "https://www.thesprucepets.com/thmb/WlQeWMTYIRhhABWIsX915b2kg1o=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-russian-blue-cat-sitting-on-the-bed--female-cat--498731394-5c2a695746e0fb00015354ac.jpg"
    }
];


function App() {
    return (
        <div className="App">
            {catILove.map(one => (
                <Cat key={one.id} kinds={one.kinds} image={one.picture}/>
            ))}
        </div>
    );
}

export default App;
