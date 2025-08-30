import jwt  from "jsonwebtoken"
import { envConfig } from "../config/config.js"
const generateToken=()=>{
const token =jwt.sign({userId: userId},envConfig.JWTSECRETKEY,{expiresIN:'20d'}
 )
 return token
}
export default generateToken