import jwt  from "jsonwebtoken"
import { envConfig } from "../config/config.js"
const generateToken = (userId) => {
    const token = jwt.sign({userId: userId}, envConfig.JWTSECRETKEY, {expiresIn: '20d'})
    return token
}
export default generateToken