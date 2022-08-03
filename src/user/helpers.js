const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./model");
const config = {session: false};
const { addUserToDLL } = require("./userLinkedList")

const register = async (req, res, next) => {
    req.user.username
        ? 
        res.status(201).json({msg: "You have successfully registered", username: req.user.username}) 
        
        : 
        
        res.status(401).json({msg: "This user already exixts"});
};

const login = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        try {
        if (err) {
            return res.status(500).json({msg: "Internal server error", auth: false})
        } else if (!user) {
            return res.status(401).json({msg: "User has not been found", auth: false})
        }
        const token = jwt.sign({user: {id: user.id, username: user.username}}, process.env.SECRET_KEY);
        const fn = (error) => { 
            error? next(error) : res.status(200).json(
            {
                msg: "User authenticated", 
                email: user.username, 
                secret_token: token, 
                auth_status: true,
            }
        )};
        req.login(user, config, fn);
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
    
};



const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users)
        // const DDL = await addUserToDLL(users);
        // res.send({DDL})
        // console.log(DDL.head.val);
        // console.log("1!!!!!!!!!!!!!!!!!!!!!")
        // DDL.printList();
        res.status(200).send(users);
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
};
