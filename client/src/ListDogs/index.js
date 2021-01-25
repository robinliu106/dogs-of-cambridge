import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DogItem from "../DogItem";

const ListDogs = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();

    let page = query.get("page") ? Number(query.get("page")) : 1;
    const [dogs, setDogs] = useState();

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch(`http://localhost:5000/dogs?page=${page}`);

                const jsonData = await response.json();
                console.log("data", jsonData);
                setDogs(jsonData);
            } catch (error) {
                console.log(error.message);
            }
        };
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
                <li className={num == page ? "page-item active" : "page-item"} key={num}>
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
                    <a className="page-link" href={`?page=${page - pageDifference}`}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            );
        }

        if (page < 95) {
            pageNumbers.push(
                <li className="page-item" key={"right-arrow"}>
                    <a className="page-link" href={`?page=${page + pageDifference}`}>
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
            {<PaginationNav />}
        </div>
    );
};

export default ListDogs;
