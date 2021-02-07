import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as dogSlice from "../redux/dogSlice";
import SkeletonLoader from "../SkeletonLoader";

const DogInfo = () => {
    const activeDog = useSelector(dogSlice.selectActiveDog);
    const [dogInfo, setDogInfo] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    console.log("in dog info");
    useEffect(() => {
        setLoading(true);
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
                // console.log("dog Info", infoJSON[0].id);

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
                // console.log("dog image info", imageJSON[0]);
                setDogInfo(imageJSON[0]);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                console.log(error.message);
            }
        };
        fetchDogInfo();
    }, [activeDog]);

    const InfoCard = () => {
        console.log("info card", dogInfo);
        const imageSource = dogInfo.url ?? "client/public/dogs-illustration.png";
        if (dogInfo) {
            return (
                <div className="card">
                    <img src={imageSource} class="card-img-top" alt="Doggo" />

                    <div className="card-body">
                        <h5 className="card-title">{activeDog.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{`Bred for: ${
                            dogInfo?.breeds?.[0]?.bred_for ?? "unknown"
                        }`}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{`Life span: ${
                            dogInfo?.breeds?.[0]?.life_span ?? "unknown"
                        }`}</h6>

                        <p className="card-text">{`${dogInfo?.breeds?.[0]?.temperament ?? "unknown"}`}</p>
                    </div>
                </div>
            );
        }
    };

    const ErrorCard = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Could not find Info</h5>
                    <p className="card-text">Try another dog!</p>
                </div>
            </div>
        );
    };

    const DisplayInfo = () => (isLoading ? <SkeletonLoader /> : <InfoCard />);

    return <div>{dogInfo && !error ? <DisplayInfo /> : <ErrorCard />}</div>;
};

export default DogInfo;
