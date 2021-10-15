
import mongoose, {Document} from 'mongoose'



 export interface IUserSchema extends Document {
     email:string,
     password:string, 
     apiKey:string,
     appName:string,
     uuid:string,
     isEmailVerified:string,
     payload:object;
 }

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
    appName: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
    },
    payload: {
        type: Object,
        required: false,
    }
}, {
    timestamps: true
});


const apiKeySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    key: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


export const apiKey = mongoose.model("key", apiKeySchema);

export const User = mongoose.model<IUserSchema>("User", userSchema);
