var auth = require('basic-auth');
const User = require("../models/userModel")
const bcrypt = require("bcrypt");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
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
            next();
            return;
        } 
    
        res.status(401).json({ message: "incorrect password"}); 
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        return;
    }
};

module.exports = verifyToken;