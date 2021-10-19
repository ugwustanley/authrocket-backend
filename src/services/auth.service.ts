import { User , IUserSchema} from '../models/mongoose.models'
import CustomError, { ValidationError} from '../middleware/customError'
import {validateHash} from '../middleware/hash'
import { NextFunction } from 'express';
import { convertCompilerOptionsFromJson } from 'typescript';


export const _userRegister = async (email:string, password: string, apiKey:string, uuid: string, appName:string,  payload?:any, next?:any ) =>{
    const  userData = await User.find({
            email
        })
    if(userData ){
  
        userData.map(
            user =>{
                if(user.apiKey == apiKey ) throw new CustomError("Email address already exists", 400 , null) 
            }
        )
       

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


export const _userLogin = async (email:string, password:string,apiKey:string, next:NextFunction) =>{
    
    const userData = await User.find({  email:email  })
    console.log(userData, userData.length)
    if(!userData || userData.length == 0) throw new CustomError("Email address does not exist")
    
    if(userData){
        for(let i = 0; i < userData.length ; i++){
            if(userData[i].apiKey === apiKey){
                console.log('api key mates')
                const isPasswordValid = await validateHash( password , userData[i].password ).catch(err => next(err.message))
        
                if(!isPasswordValid){
        
                    throw new CustomError("User password provided is incorrect")
                }
                if(isPasswordValid)  return userData[i];
            }
            else{
                console.log('reached')
               // throw new CustomError("This account doesn't exist for this application")
            }
        }
        throw new CustomError("This account doesn't exist for this application")
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
