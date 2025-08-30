import {Sequelize, DataTypes } from 'sequelize'

import usermodel from './models/usermodel.js';
import productModel from './models/productmodel.js';

import { envConfig } from '../config/config.js';

console.log(envConfig.connection_string)
const sequelize = new Sequelize("postgresql://postgres:srishti2468@@db.rndvuxxcpgvuvaxavrjl.supabase.co:5432/postgres"
)
try {
    sequelize.authenticate().then(()=>{
        console.log("connect vayo hai")
    })
.catch(err => {
    console.log("error aayo",err)
})
}
catch(error)
{
    console.log(error)
}
const db ={}
db.sequelize =Sequelize
db.sequelize =sequelize



db.users=usermodel(sequelize,DataTypes)
db.products=productModel(sequelize,DataTypes)
 sequelize.sync({force:false}).then(()=>{
console.log("migrate vayo  hai tw")
 })
 // force:true,alter:true database ko data loss garnu xaina bahney migrate garda