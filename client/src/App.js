import React from "react";

import ListDogs from "./ListDogs";
import DogInfo from "./DogInfo";
function App() {
    return (
        <div className="container">
            <h1 className="display-2">Dogs of Cambridge</h1>

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
