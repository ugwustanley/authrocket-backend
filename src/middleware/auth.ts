import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import CustomError from './customError';



/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export default function RequestAuthentication(req: Request, res: Response, next: NextFunction) {
 
          const token = req.headers.authorization;

          const jwtSecret = process.env.JWT_SECRET || "stanlee";

          if (!token) return next(new CustomError("This request is unauthorized"));

          jwt.verify( token , jwtSecret , (err, data) => {

               if (err) return next(new CustomError("This request is unauthorized"));

               (req as any).user = data;

               next();
          });

}
/**
 * 
 * @param data 
 * @returns string
 */
export  async function  generateJwtToken(data: any, next:any) {

    const jwtSecret = process.env.JWT_SECRET || "stanlee"

    try {

    const  token =  await jwt.sign({id: data}, jwtSecret , { algorithm: "HS512", expiresIn: "10d" })

    if(token) return token

    } catch (error) {

        next(error)

    }

}
