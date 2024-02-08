require('dotenv').config()
const { Client } = require("pg")
const { Sequelize } = require('sequelize');
console.log("PG-ADMIN4 User",process.env.PGUSER)

async function initialize()  {
    return new Promise( async (resolve, reject) => {
        const client = new Client({
            host: process.env.HOST,
            port: process.env.DBPORT,
            user: process.env.PGUSER,
            password: process.env.PASSWORD,
        })
    
        try {
            await client.connect();
            console.log("inside try");
            const result = await client.query(`SELECT 1 FROM pg_database WHERE datname='${process.env.DATABASE}';`);
            
            if(result.rowCount === 0){
                await client.query('CREATE DATABASE ' + process.env.DATABASE);
            }
            await client.end();
            resolve();
            
        } catch (error) {
            console.log(error);
            await client.end();
            reject();
        }
    })
    
}


const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.PGUSER,
    process.env.PASSWORD,{
        host: process.env.HOST,
        dialect: 'postgres',
        port: process.env.DBPORT
    });

module.exports = {
    sequelize,
    initialize
    }
