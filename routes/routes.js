const express = require('express');
const { getHealth } = require("../controllers/health");
const { registerUser, getUser, updateUser } = require('../controllers/userControllers');
const verifyToken = require('../middlewares/userAuth');


const appRouter = express.Router();

//check service instance health
appRouter.all("/healthz", getHealth);

appRouter.post("/v1/user", registerUser);
appRouter.get("/v1/user/self", verifyToken , getUser);
appRouter.put("/v1/user/self", verifyToken, updateUser);

module.exports = appRouter;