import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as dogSlice from "../redux/dogSlice";
import SkeletonLoader from "../SkeletonLoader";

const DogInfo = () => {
    const activeDog = useSelector(dogSlice.selectActiveDog);
    const [dogInfo, setDogInfo] = useState({});
    const [dogImage, setDogImage] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // console.log("activeDog", activeDog);
    useEffect(() => {
        setLoading(true);
        const fetchDogInfo = async () => {
            try {
                const infoResponse = await fetch(
                    "https://api.thedogapi.com/v1/breeds/search?" +
                        new URLSearchParams({
                            q: activeDog?.breed,
                            api_key: process.env.REACT_APP_DOG_API_KEY,
                        })
                );

                const infoJSON = await infoResponse.json();

                const { id: dogID, name: dogBreed } = infoJSON[0] ?? null;
                console.log("dog Info", dogID, dogBreed);
                //TODO add some error checking here

                // const imageResponseTwo = await fetch(
                //     `https://dog.ceo/api/breed/${dogBreed.toLowerCase()}/images/random`
                // );
                // const imageJSONTwo = await imageResponseTwo.json();
                // const imageURL = await imageJSONTwo.message;
                // console.log("image Response Two", imageURL);

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
        // console.log("dogInfo", dogInfo);
        const imageSource = dogInfo.url ?? "client/public/dogs-illustration.png";
        const dogName = activeDog?.name ?? "unknown";
        const bredFor = dogInfo?.breeds?.[0]?.bred_for ?? "unknown";
        const lifeSpan = dogInfo?.breeds?.[0]?.life_span ?? "unknown";
        const temperament = dogInfo?.breeds?.[0]?.temperament ?? "unknown";

        if (dogInfo) {
            return (
                <div className="card">
                    <img src={imageSource} className="card-img-top" alt="Doggo" />

                    <div className="card-body">
                        <h5 className="card-title">{dogName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{`Bred For: ${bredFor}`}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{`Life Span: ${lifeSpan}`}</h6>
                        <p className="card-text">{`Temperament: ${temperament}`}</p>
                    </div>
                </div>
            );
        }
    };

    const ErrorCard = ({ details }) => {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{details.title}</h5>
                    <p className="card-text">{details.text}</p>
                </div>
            </div>
        );
    };
    // console.log("dogInfo ", !!dogInfo, "activeDog ", !!activeDog, "error ", !!error);
    const DisplayInfo = () => {
        if (dogInfo && !error) {
            return isLoading ? <SkeletonLoader /> : <InfoCard />;
        } else if (!activeDog && error) {
            return <ErrorCard details={{ title: "Select a Dog!", text: "" }} />;
        } else {
            return <ErrorCard details={{ title: "Could not find info", text: "Try another dog!" }} />;
        }
    };

    return (
        <div>
            <DisplayInfo />
        </div>
    );
};

export default DogInfo;

// const DisplayInfo = () => (isLoading ? <SkeletonLoader /> : <InfoCard />);

// return <div>{dogInfo && !error ? <DisplayInfo /> : <ErrorCard />}</div>;
