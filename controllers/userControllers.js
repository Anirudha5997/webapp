const User = require('../models/userModel')

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, password, username } = req.body;
        const existingUser = await User.findOne({ where: { email: username } });
        if(existingUser){
            res.status(400).json({message: "User already registered in the database"});
            return; 
        } 
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: username,
            password: password,
        })
        res.status(201).json({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.email,
            account_created: user.account_created,
            account_updated: user.account_updated
        });

    } catch (error) {
        res.status(400).send()
    }
};

const getUser = async (req, res) => {
    try {

        if(Object.keys(req.body).length !== 0) {
            res.status(400).send();
            return;
        }

        let user = req?.user?.dataValues;
        res.status(200).json({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            username: user.email,
            account_created: user.account_created,
            account_updated: user.account_updated
        });     
        return;  
    } catch (error) {
        console.log
        res.status(400).json({ message: error.message });
        return
    }
};

const updateUser = async (req, res) => {
    try {
        const allowedFields = ['firstName', 'lastName', 'password']
        const filteredFields = Object.keys(req.body).filter( e =>  !allowedFields.includes(e))
        console.log("filteredFields",filteredFields)
        
        if(filteredFields.length !== 0) {
            res.status(400).json({ message: "INCORRRECT FIELD!, Only firstName, lastName and passwords allowed"});
            return;
        }

        const {firstName, lastName, password} = req.body;
        let user = req.user.dataValues;

        await User.update({ 
            firstName: firstName,
            lastName: lastName,
            password: password,
        }, {
            where: {
              email: user.email
            }
          });

        return res.status(204).send();

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    getUser,
    updateUser
}