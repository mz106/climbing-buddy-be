require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "We are good to go!"});
});

app.listen(80, () => {
    console.log("app is listening");
});