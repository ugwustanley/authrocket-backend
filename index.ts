import express, {Request , Response, NextFunction} from 'express'

import cors from 'cors'

// import bodyParser from 'body-parser'

import routes from './src/routes/auth.route'

import errorHandler from './src/middleware/error'

import CustomError from './src/middleware/customError'

import initDB from './src/config/mongo-db.config'

const bodyParser = require('body-parser')
require("dotenv").config()

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));



app.get('/' , (req, res) => {
    res.send("Hello World")
})


app.use("/v1/users", routes)

app.get("*" , (req: Request, res: Response) =>{

   throw new CustomError("This route does not exist", 400, null)
 }
)

// Error
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

//     throw new CustomError( "IN_APP ERROR OCCURED", 400 , null)

// });

app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen( process.env.PORT || 8080 , () =>{
    console.log(`port running at ${PORT}`)
    initDB()
})