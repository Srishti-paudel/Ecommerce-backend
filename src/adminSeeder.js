import User from "./src/database/models/usermodel"
import { envConfig } from "./config/config.js"
import { debugPort } from "node:process"
const adminSeeder = async()=>{
    const[data] =await User.findAll({
        where:{
            email: envConfig.adminemail
        }
    })
  if(!data)
  {
      await User.create({
        userName: envConfig.adminusername,
        password: envConfig.adminpassword,
        email: envConfig.adminemail,
        role:"admin"
    })
    console.log("admin Seeded")
  }
  else{
    console.log("Admin alreadySeeded")
  }
    

}
export default adminSeeder