require("dotenv").config();

const express = require("express");
const cors = require("cors");

const port = process.env.PORT 

const User = require("./user/model");

const app = express();

const userRouter = require("./user/routes");
const testRouter = require("./testRoutes/testRoutes");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/test", testRouter);

app.listen(port, async (err) => {
    if(!err) {
        await User.sync({alter: true});
        console.log("app is listening");
    } else {
        console.log(err);
    }
});
