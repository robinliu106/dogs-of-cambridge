const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request.body

//routes

//create a dog
// app.post("/dogs", async (req, res) => {
//     try {
//         // console.log(req.body);
//         const { name, breed, location, neighborhood } = req.body;
//         const newDog = await pool.query(
//             "INSERT INTO dogs (name,breed,location,neighborhood) VALUES ($1,$2,$3,$4) RETURNING *",
//             [name, breed, location, neighborhood]
//         );

//         res.json(newDog.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// });

//get dogs
app.get("/dogs", async (req, res) => {
    let dbQuery = "SELECT * FROM dogs";

    const page = Number(req.query?.page);

    if (page) {
        const end = page * 10;
        const start = end - 9;
        dbQuery += ` WHERE id >= ${start} AND id <= ${end};`;
    }

    console.log("dbQuery ", dbQuery);

    try {
        const allDogs = await pool.query(dbQuery);
        res.json(allDogs.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a dog by key
app.get("/dog-info/:key", async (req, res) => {
    const breed = req.query?.breed;
    const location = req.query?.location;
    const neighborhood = req.query?.neighborhood;

    try {
        const { key } = req.params;
        const dog = await pool.query(`SELECT * FROM dogs WHERE ${key}=$1`, [key]);
        res.json(dog.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;

//         const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2", [description, id]);
//         res.json("TODO was updated");
//     } catch (error) {
//         console.log(error.message);
//     }
// });

//delete a dog
app.delete("/dogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDog = await pool.query("DELETE FROM dogs WHERE id=$1", [id]);
        res.json("dog was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`server is up on ${port}`);
});
