import {config} from 'dotenv'
config()
console.log(process.env.connection_string)
export const envConfig ={
    port: process.env.PORT,
    connection_string : process.env.connection_string,
    JWTSECRETKEY : process.env.JWT_SECRET_KEY,
    mail : process.env.mail,
    Emailpassword:process.env.Email_password,
    adminemail:process.env.ADMIN_EMAIL,
    adminpassword:process.env.ADMIN_PASSWORD,
     adminusername:process.env.ADMIN_USERNAME,
}
