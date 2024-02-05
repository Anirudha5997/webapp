require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,{
        host: process.env.HOST,
        dialect: 'postgres',
        port: process.env.DBPORT
    });

const getServerStatus = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        return true;
    } catch (error) {
        console.error("'Unable to connect to the database:'",error);
        return false;
    }
}

module.exports = {
    getServerStatus
};

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     port: process.env.DBPORT,
//     host: process.env.HOST,
//     database: process.env.DATABASE
// });

// const getPoolStatus = async () => {   
//     try{
//         const { rows } = await pool.query("SELECT current_user");
//         const user = rows[0]['current_user']
//         console.log("CURRENT DATABASE USER : ",user);
//         if(user === 'anirudha'){
//             return true;
//         } return false; 

//     } catch (error){
//     console.log(error);
//     return false;
//     }
// }