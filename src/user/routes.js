const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = {session: false};

const router = require("express").Router();

const { register, login } = require("./helpers");

router.post("/register", passport.authenticate("register", config), register);
router.post("/login", login);



module.exports = router;
