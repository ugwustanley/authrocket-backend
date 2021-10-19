import dotenv from "dotenv";
import { NextFunction } from "express";
import nodemailer from "nodemailer";
import CustomError from "./customError"

dotenv.config();



const mail_transport = nodemailer.createTransport({
 
    //  requireTLS: true,
     service: 'gmail',
     auth: {
        user : process.env.USER,
        pass : process.env.PASSWORD
     }
})
// #D7F9FF

export default function SendMail(to: string, subject: string, body: string, next:NextFunction) {
 
     try {
          mail_transport.sendMail({

               from: process.env.USER || '',
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