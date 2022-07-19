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
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    indexes: [{unique: true, fields: ['email']}]
  }
);

module.exports = User;

