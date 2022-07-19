// hooks :: https://sequelize.org/docs/v6/other-topics/hooks/
// useful src :: https://github.com/sequelize/sequelize/blob/v6/src/hooks.js#L7


// id       - integer (auto create by MySql/Postgres), PK
// username - String, unique, required
// password - String, unique, required // my proposal, because we know passwords are actually hashed, and we'll also abstract it as well
// fullName - String, required
// email    - String, required, unique
// bio      - Text
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        bio: {
            type: DataTypes.TEXT,
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
const hashPassword = async(user, options) => {
    const saltRounds = process.env.SALT_ROUNDS;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hash = await bcrypt.hash(user.password, salt);
    //console.log('-> User.beforeCreate: user = ', user);
    user.password = hash;
}

// hash the passwords of all the users n the list provided
const hashPasswordBulk = async (userList) => {
    const saltRounds = process.env.SALT_ROUNDS;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    
    for (user of userList){
        const hash = await bcrypt.hash(user.password, salt);
        //console.log('-> User.beforeCreate: user = ', user);
        user.password = hash;
    }
}


// hash the password before saving to database on create, update, save
User.addHook('beforeCreate', hashPassword);
User.addHook('beforeUpdate', hashPassword);
User.addHook('beforeSave', hashPassword);


// for bulk create -- if we're ever gonna use it
User.addHook('beforeBulkCreate', hashPasswordBulk)


// validate that the provided password is correct
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


module.exports = User;

// password will be hashed right before saving
// test if a password is correct with User.validatePassword( passwordToTest )
