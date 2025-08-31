import nodemailer from 'nodemailer'
import { envConfig } from '../config/config.js'
export const  sendMail =async (data)=>{
   const transporter= nodemailer.createTransport({
        service:'gmail',//kun taria ko service provide garne ho lie hotmail yahooo mail gmail haru rakhne
        auth:{               
            user:envConfig.mail,//env bata use garne config ma rahyo bhane secure hunxa
            pass:envConfig.Emailpassword//apppasswordrakhne

        }
    })
    const mailOptions ={
      from: "Digital DOkkan<customerservice@gmail.com>",
      to: data.to,
      subject: data.subject,
      text: data.text
    }
    try{
    await transporter.sendMail(mailOptions)} catch(error){
        console.log(error)
    }
}