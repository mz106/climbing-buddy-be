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

const login = async (username, password, done) => {
    try {
        const user = await User.findOne({where: { username }});
        
        if (!user) {
            console.log("not user")
            return done(null, false, {msg: "This user was not found"})
            
        }

        const match = await bcrypt.compare(password, user.hashedPassword);
        
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
