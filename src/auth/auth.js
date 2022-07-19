const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../user/model");

const mappings = {usernameField: "username", passwordField: "password"};

const register = async (username, password, done) => {
    
    const saltRounds = process.env.SALT_ROUNDS;
    
    try {
        
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        const hash = await bcrypt.hash(password, salt);
        const user = await User.build(
            {
                username, 
                hashedPassword: hash, 
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

const registerStrategy = new LocalStrategy(mappings, register);

module.exports = {
    registerStrategy,
};
