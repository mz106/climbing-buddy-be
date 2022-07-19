const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = {session: false};

const router = require("express").Router();


router.post("/register", passport.authenticate("register", config), register);



module.exports = router;