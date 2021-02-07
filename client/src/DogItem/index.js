import React from "react";
import { useDispatch } from "react-redux";

import * as dogSlice from "../redux/dogSlice";

const DogItem = ({ name, breed, location, neighborhood }) => {
    const dispatch = useDispatch();

    const setActiveDog = () => {
        const dogObject = { name, breed, location, neighborhood };
        dispatch(dogSlice.setActiveDog(dogObject));
    };
    return (
        <div>
            <a href="#" className="list-group-item list-group-item-action" onClick={setActiveDog}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{name}</h5>
                    <small className="text-muted">{neighborhood}</small>
                </div>
                <small className="text-muted">{breed}</small>
            </a>
        </div>
    );
};

export default DogItem;
