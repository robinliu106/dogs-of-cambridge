CREATE DATABASE dogsDB;

CREATE TABLE dogs(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    breed VARCHAR(255),
    location point,
    neighborhood VARCHAR(255)

);