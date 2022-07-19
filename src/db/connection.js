const { Sequelize } = require("sequelize");




if (process.env.NODE_ENV === "production") {

    module.exports.connection = new Sequelize(`${process.env.DATABASE_URL}`, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

} else {
    
    module.exports.connection = new Sequelize(process.env.DEV_DB_CONNECTION);
}
