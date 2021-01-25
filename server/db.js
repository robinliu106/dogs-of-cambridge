const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: "robinliu",
    password: process.env.REACT_APP_DB_PASS,
    host: "localhost",
    post: 5432,
    database: process.env.REACT_APP_DB_NAME,
});

module.exports = pool;
