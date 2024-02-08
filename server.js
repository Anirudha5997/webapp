const express = require("express");
const cors = require('cors');
const appRouter = require("./routes/routes");
const {sequelize, initialize} = require("./config/connection")
const User = require("./models/userModel")

require('dotenv').config()
const PORT = 8000;

const app = express();
app.use(cors());
//middlewares
app.use(express.json()); // returns json body object

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

app.listen(PORT, () => console.log("app is running on port 8000"));

app.use("", appRouter);