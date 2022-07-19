require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");

const port = process.env.PORT 

const User = require("./user/model");

const { registerStrategy } = require("./auth/auth");

const userRouter = require("./user/routes");
const testRouter = require("./testRoutes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());

passport.use("register", registerStrategy)

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
