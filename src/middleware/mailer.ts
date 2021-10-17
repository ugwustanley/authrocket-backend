import dotenv from "dotenv";
import { NextFunction } from "express";
import nodemailer from "nodemailer";
import CustomError from "./customError"

dotenv.config();


const mail_transport = nodemailer.createTransport({
    //  service: "mail.privateemail.com",
    //  port: 465,
    //  secure: true, 
    //  host: 'smtp.gmail.com',
    //  port: 587,
    //  secure: true,
    //  requireTLS: true,
     service: 'gmail',
     auth: {
        //   type: "OAuth2",
        //   user: "ugwuchiagoziestanley@gmail.com",
        //   pass: "08030535733",
        user:"authrocket2@gmail.com",
        pass:"unn247790"
        //   clientId: process.env.CLIENT_ID,
        //   clientSecret: process.env.CLIENT_SECRET,
        //   refreshToken: process.env.REFRESH_TOKEN
     }
})
// #D7F9FF

export default function SendMail(to: string, subject: string, body: string, next:NextFunction) {

   //  console.log(USERNAME, PASSWORD)
     try {
          mail_transport.sendMail({

               from: "ugwuchiagoziestanley@gmail.com",
               to: to ,
               subject: subject,
             //   text: body,
               html: body
          }, (err, info) => { 
               if (err){
                     console.log("Failed to send mail to ", to , err);
                    throw new CustomError("An error occurred while sending" + subject + "email")
                    
                 }
     
               console.log("Email Notification Sent Successfully");
          })  
     } catch (error) {
          next(new CustomError('an error occurred while trying to send mail'))
     }
   

}