import React from 'react';

function Cat({kinds, image}) {
    return (
        <div>
            <h2>I love {kinds}.</h2>
            <img src={image}/>
        </div>
    )
}

const catILove = [
    {
        kinds: "American Shorthair",
        image: "https://www.thesprucepets.com/thmb/QVUzJyAhwdxLpP8fAfzjX1Aus_0=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-925319984-36b97d913d934d229d8b0d528a7da64e.jpg"
    },
    {
        kinds: "Munchkin",
        image: "https://www.thesprucepets.com/thmb/uu7O05OIOe1jfe9pDvHdIiOteFk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/munchkin-cat-relaxing-in-the-garden-johannesburg-667587109-57d9bb0f5f9b5865168d616a.jpg"
    },
    {
        kinds: "Russian Blue",
        image: "https://www.thesprucepets.com/thmb/WlQeWMTYIRhhABWIsX915b2kg1o=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-russian-blue-cat-sitting-on-the-bed--female-cat--498731394-5c2a695746e0fb00015354ac.jpg"
    }
];

function App() {
    return (
        <div className="App">
            <h1>Hello, hello</h1>
            {catILove.map(cat => (
                <Cat kinds={cat.kinds} image={cat.image}/>
            ))}
        </div>
    );
}

export default App;
