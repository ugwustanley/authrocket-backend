import mongoose from 'mongoose'


const dbURI:any = process.env.MONGO_URI


export default function initializeMongodb() {

  
    mongoose.connect(dbURI)

    //check for connection
    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + dbURI);
    }); 
    
    // error check
    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    });
}


