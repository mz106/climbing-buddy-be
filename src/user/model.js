// hooks :: https://sequelize.org/docs/v6/other-topics/hooks/
// useful src :: https://github.com/sequelize/sequelize/blob/v6/src/hooks.js#L7


// id       - integer (auto create by MySql/Postgres), PK
// username - String, unique, required
// hashedPassword - String, unique, required // my proposal, because we know passwords are actually hashed, and we'll also abstract it as well
// hasRopes - Boolean, required
// location - String, required


const bcrypt = require("bcryptjs");

const { DataTypes } = require("sequelize");
const { connection } = require("../db/connection");

const User = connection.define( "User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hasRopes: {
            type: DataTypes.BOOLEAN,
        },
        location: {
            type: DataTypes.STRING,
        }
    },
    {
        indexes: [{unique: true, fields: ['username']}]
    }
);


// hash the password for the user provided as parameter
//edited by MZ issue #24 - changed user.password to user.hashedpassword to allow for no null fields
const hashPassword = async(user, options) => {
    const saltRounds = process.env.SALT_ROUNDS;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hash = await bcrypt.hash(user.hashedPassword, salt);
    delete user.hashedPassword;       // the unhashed password (that was received from the FE) gets removed
    user.hashedPassword = hash;
}


// hash the password before on create, update
User.addHook('beforeCreate', hashPassword);
User.addHook('beforeUpdate', hashPassword);



// validate that the provided password is correct
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.hashedPassword);
}


module.exports = User;

// password will be hashed right before saving
// test if a password is correct with User.validatePassword( passwordToTest )
