// id - integer (auto create by MySql/Postgres), PK

// username - String, unique, required

// hashedPassword - String, unique, required

// hasRopes - Boolean, required

// location - String, required

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

module.exports = User;

