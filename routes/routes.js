const express = require('express');
const { getHealth } = require("../controllers/health");
// const {setReqHeaders} = require('../middlewares/setHealthHeader')

const appRouter = express.Router();

//check service instance health
appRouter.all("/healthz", getHealth);

module.exports = appRouter;