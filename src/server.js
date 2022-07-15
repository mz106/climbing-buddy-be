require("dotenv").config();

const express = require("express");
const cors = require("cors");

const port = process.env.PORT 

const app = express();

const testRouter = require("./testRoutes/testRoutes");

app.use(cors());
app.use(express.json());

app.use("/test", testRouter);

app.listen(port, () => {
    console.log("app is listening");
});
