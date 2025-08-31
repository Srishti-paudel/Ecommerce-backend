import {Sequelize, DataTypes } from 'sequelize'

import usermodel from './models/usermodel.js';
import productModel from './models/productmodel.js';

import { envConfig } from '../config/config.js';

console.log(envConfig.connection_string)
const sequelize = new Sequelize(envConfig.connection_string || "postgresql://postgres:password@localhost:5432/ecommerce")

try {
    sequelize.authenticate().then(()=>{
        console.log("Database connected successfully!")
    })
.catch(err => {
    console.log("Database connection error:", err.message)
    // Don't crash the app, just log the error
})
}
catch(error)
{
    console.log("Database initialization error:", error.message)
}

const db ={}
db.sequelize =Sequelize
db.sequelize =sequelize

db.users=usermodel(sequelize,DataTypes)
db.products=productModel(sequelize,DataTypes)

// Only sync if connection is successful
sequelize.authenticate()
    .then(() => {
        return sequelize.sync({force:false})
    })
    .then(() => {
        console.log("Database migration completed successfully!")
    })
    .catch(err => {
        console.log("Migration error:", err.message)
        // Don't crash the app, just log the error
    })

export default db