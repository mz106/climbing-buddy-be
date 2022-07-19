// const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../user/model");

const mappings = {usernameField: "username", passwordField: "password"};

const register = async (username, password, done) => {
    
    try {

        // password will be hashed on save by a hook in the model
        const user = await User.build(
            {
                username, 
                password, 
            }
        );

        try {
            await user.save();
            return done(null, user);
        } catch (error) {
            console.log(user, error)
            return done(null, {});
        }
    } catch (error) {
        return done(error);
    }
};

const login = async (username, password, done) => {
    try {
        const user = await User.findOne({where: { username }});
        
        if (!user) {
            console.log("not user")
            return done(null, false, {msg: "This user was not found"})
            
        }

        // use the function added to the model to validate the password
        const match = user.validatePassword(password);
        
        if (!match) {
            
            return done(null, false, {msg: "Your password has not matched"})
        }

        return done(null, {id: user.id, username: user.username});

    } catch (error) {
        console.log(error)
        done(error);
        
    }
};

const registerStrategy = new LocalStrategy(mappings, register);
const loginStrategy = new LocalStrategy(mappings, login);

module.exports = {
    registerStrategy,
    loginStrategy,
};
