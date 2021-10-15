"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var customError_1 = __importDefault(require("./customError"));
dotenv_1.default.config();
var mail_transport = nodemailer_1.default.createTransport({
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
        user: "authrocket2@gmail.com",
        pass: "unn247790"
        //   clientId: process.env.CLIENT_ID,
        //   clientSecret: process.env.CLIENT_SECRET,
        //   refreshToken: process.env.REFRESH_TOKEN
    }
});
// #D7F9FF
function SendMail(to, subject, body) {
    //  console.log(USERNAME, PASSWORD)
    mail_transport.sendMail({
        from: "ugwuchiagoziestanley@gmail.com",
        to: to,
        subject: subject,
        //   text: body,
        html: body
    }, function (err, info) {
        if (err) {
            console.log("Failed to send mail to ", to, err);
            throw new customError_1.default("An error occurred while sending" + subject + "email");
        }
        console.log("Email Notification Sent Successfully");
    });
}
exports.default = SendMail;
