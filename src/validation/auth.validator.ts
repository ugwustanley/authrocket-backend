import {Request , Response , NextFunction} from 'express'
import {validationSchema, registerSchema, loginSchema} from '../models/validate.models'
import { ValidationError} from '../middleware/customError';


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const emailPasswordValidator = async (req: Request , res: Response , next: NextFunction) =>{

    const requestData  = req.body;

    try {

        const data = await validationSchema.validateAsync( requestData)
        if(data){
            next();
        }
        
    } catch (error) {
        
     //throw new ValidationError(error.message, 400, requestData)
       next(error)
    }

}

export const registerValidator = async (req: Request , res: Response , next: NextFunction) =>{

    const requestData  = req.body;

    try {

        const data = await registerSchema.validateAsync( requestData)
        if(data){
         
            next();
        }
        
    } catch (error) {
    
       next(error)
    }

}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const loginValidator = async (req: Request , res: Response , next: NextFunction) =>{

    const requestData  = req.body;

    try {

        const data = await loginSchema.validateAsync( requestData)
        if(data){
         
            next();
        }
        
    } catch (error) {
       
       next(error)
    }

}