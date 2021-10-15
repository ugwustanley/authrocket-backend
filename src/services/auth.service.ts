import { User , IUserSchema} from '../models/mongoose.models'
import CustomError, { ValidationError} from '../middleware/customError'
import {validateHash} from '../middleware/hash'
import { NextFunction } from 'express';


export const _userRegister = async (email:string, password: string, apiKey:string, uuid: string, appName:string,  payload?:any, next?:any ) =>{

    if (await User.findOne({
        email
    })) throw new CustomError("Email address already exists", 400 , null);

    else  {
    const data = {
        email,
        password,
        apiKey,
        appName,
        uuid,
        isEmailVerified: false,
        payload: payload || null
    }

    const user = new User(data)

    user.save(function (err) {
        if (err) throw new CustomError(err.message);
      })
    
     return data;

    }


}


export const _userLogin = async (email:string, password:string, next:NextFunction) =>{
    
    const userData = await User.findOne({  email:email  })

    if(!userData) throw new CustomError("Email address does not exist")



    if(userData){
        
        const isPasswordValid = await validateHash( password , userData.password ).catch(err => next(err.message))
        
        if(!isPasswordValid){

            throw new CustomError("User password provided is incorrect")
        }
        if(isPasswordValid)  return userData;
    }
    
}

export const _getUsers = async (apiKey:string) =>{
    
    const users = await User.find({  apiKey: apiKey  })

    if(!users) return

    if(users){
        return users
    }
    
}

export const _confirmEmail = async (uuid:string) =>{
 
    const user = User.findOneAndUpdate({uuid}, {$set:{isEmailVerified:true}}, {new: true});

    if(!user) return

    return user
    

}


export const _isEmailVerified = async (uuid:string, next:NextFunction) =>{
    
    const userData = await User.findOne({  uuid:uuid })

    if(!userData) throw new CustomError("User does not exist")
     console.log("services")


    if(userData){
        console.log(userData)
       return userData;
    }                 
    console.log(userData , "us")
    return

    
}

export const _user= async (uuid:string, next:NextFunction) =>{
    
    const userData = await User.findOne({  uuid:uuid  })

    if(!userData) throw new CustomError("user does not exist")



    if(userData){
        
        return userData;
    }

    return
    
}
