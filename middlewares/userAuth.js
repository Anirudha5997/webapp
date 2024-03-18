var auth = require('basic-auth');
const User = require("../models/userModel")
const bcrypt = require("bcrypt");

require("../config/logger");
const winston = require("winston");
const webappLogger = winston.loggers.get("webappLogger");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            webappLogger.info("User Token missing");
            res.status(401).json({message: "UNAUTHORIZED: Token missing"});
            return;
        }
        
        let creds = Buffer.from(token, "base64").toString("utf8").split(":"); 
        let username = creds[0];
        let password = creds[1];
        
        const user = await User.findOne({ where: { email : username}});
        const passwordMatched = await bcrypt.compare(password, user?.password);

        if(user && passwordMatched){
            req.user = user;
            webappLogger.info(`${user.email} logged in successfully`);
            next();
            return;
        } 
    
        res.status(400).json({ message: "incorrect password"}); 
        webappLogger.info(`${user.email} tired logging with incorrect credentials`);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
        webappLogger.error("Error in userAuth middleware");
        return;
    }
};

module.exports = verifyToken;