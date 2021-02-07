import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DogItem from "../DogItem";
import { useDispatch } from "react-redux";

import * as dogSlice from "../redux/dogSlice";
import dogDump from "../data/dogDump.json";

const ListDogs = () => {
    const dispatch = useDispatch();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    let query = useQuery();

    let page = query.get("page") ? Number(query.get("page")) : 1;
    const [dogs, setDogs] = useState();

    useEffect(() => {
        const fetchDogs = async () => {
            let start = 1;
            let end = 10;
            if (page) {
                end = page * 10;
                start = end - 9;
            }
            const filteredDogs = dogDump.filter((item) => item.id >= start && item.id <= end);
            setDogs(filteredDogs);
        };

        // const fetchDogs = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:5000/dogs?page=${page}`);

        //         const jsonData = await response.json();
        //         console.log("fetchDogs data", jsonData);
        //         setDogs(jsonData);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // };
        // fetchDogs();
        fetchDogs();
    }, [page]);

    const RenderDogs = () => (
        <div className="list-group">
            {dogs.map((dog) => (
                <DogItem key={dog.id} {...dog} />
            ))}
        </div>
    );

    const PaginationNav = () => {
        const pageDifference = 4;
        let pageNumbers = [];

        for (let num = page; num <= page + pageDifference && num <= 100; num++) {
            pageNumbers.push(
                <li className={num === page ? "page-item active" : "page-item"} key={num}>
                    <a className="page-link" href={`?page=${num}`}>
                        <span>{num}</span>
                    </a>
                </li>
            );
        }
        //Add left and right arrow buttons
        if (page > 4) {
            pageNumbers.unshift(
                <li className="page-item" key={"left-arrow"}>
                    <a
                        className="page-link"
                        href={`?page=${page - pageDifference}`}
                        onClick={() => dispatch(dogSlice.setActiveDog(null))}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            );
        }

        if (page < 95) {
            pageNumbers.push(
                <li className="page-item" key={"right-arrow"}>
                    <a
                        className="page-link"
                        href={`?page=${page + pageDifference}`}
                        onClick={() => dispatch(dogSlice.setActiveDog(null))}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            );
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">{pageNumbers}</ul>
            </nav>
        );
    };

    return (
        <div>
            {dogs && <RenderDogs />}
            <PaginationNav />
        </div>
    );
};

export default ListDogs;
