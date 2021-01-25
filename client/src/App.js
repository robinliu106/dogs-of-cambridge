import React from "react";

import ListDogs from "./ListDogs";
import DogInfo from "./DogInfo";

function App() {
    return (
        <div className="container">
            <div className="row justify-content-end">
                <div className="col">
                    <ListDogs />
                </div>
                <div className="col">
                    <DogInfo />
                </div>
            </div>
        </div>
    );
}

export default App;
