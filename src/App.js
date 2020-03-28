import React from 'react';

function Cat({kinds}) {
    return <h2>I love {kinds}.</h2>
}

function App() {
    return (
        <div className="App">
            <h1>Hello, hello</h1>
            <Cat kinds="American short-hair"/>
            <Cat kinds="Munchkin"/>
            <Cat kinds="Russian Blue"/>
        </div>
    );
}

export default App;
