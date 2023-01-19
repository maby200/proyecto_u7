import express from "express";
import dotenv from "dotenv";

// Estoy editando este script

const app = express();
dotenv.config();


app.get("/", (req, res) => {
    return res.status(200).send("<h1>Hello world!</h1>");
});

const port = process.env.PORT;


// Escogemos puerto
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

