const {sequelize} = require('./connection');

const getServerStatus = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        return true;
    } catch (error) {
        console.error("'Unable to connect to the database");
        return false;
    }
}

module.exports = getServerStatus;