//create migrations
const {sequelize, initialize} = require("./config/connection");
const User = require("./models/userModel");
initialize()
    .then(_ => {
        sequelize.sync({alter: true})
    .then((result) => {
        console.log(result.models)    
    })
    .catch((err) => console.log(err));
    })

    .catch(e => {
        console.log("Initialize Error", e)
    });