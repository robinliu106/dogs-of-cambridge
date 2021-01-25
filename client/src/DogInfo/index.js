import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as dogSlice from "../redux/dogSlice";
import SkeletonLoader from "../SkeletonLoader";

const DogInfo = () => {
    const activeDog = useSelector(dogSlice.selectActiveDog);
    const [dogInfo, setDogInfo] = useState({});

    useEffect(() => {
        const fetchDogInfo = async () => {
            try {
                const infoResponse = await fetch(
                    "https://api.thedogapi.com/v1/breeds/search?" +
                        new URLSearchParams({
                            q: activeDog.breed,
                            api_key: process.env.REACT_APP_DOG_API_KEY,
                        })
                );

                const infoJSON = await infoResponse.json();

                const dogID = infoJSON[0].id;
                console.log("dog Info", infoJSON[0].id);

                //TODO add some error checking here

                const imageResponse = await fetch(
                    "https://api.thedogapi.com/v1/images/search?" +
                        new URLSearchParams({
                            size: "small",
                            mime_types: "jpg",
                            format: "json",
                            has_breeds: true,
                            order: "RANDOM",
                            limit: 1,
                            breed_id: dogID,
                        }),
                    {
                        method: "GET",
                        headers: { "Content-type": "application/json" },
                    }
                );

                const imageJSON = await imageResponse.json();
                console.log("dog image info", imageJSON[0]);
                setDogInfo(imageJSON[0]);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchDogInfo();
    }, [activeDog]);

    const InfoCard = () => {
        console.log("info card url", dogInfo.url);
        const imageSource = dogInfo.url ? dogInfo.url : "client/public/dogs-illustration.png";
        return (
            <div className="card">
                <img src={imageSource} class="card-img-top" alt="Doggo" />

                <div className="card-body">
                    <h5 className="card-title">{activeDog.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
            </div>
        );
    };

    return <div>{dogInfo ? <InfoCard /> : <SkeletonLoader />}</div>;
};

export default DogInfo;
