import mongoose from 'mongoose'


const dbURI:string = "mongodb+srv://ugwustanley:unn247790@cluster0.kxnme.mongodb.net/test"
//String( process.env.MONGO_URI )


// interface Options{
//     useNewUrlParser: boolean,
//     useCreateIndex: boolean,
//     useUnifiedTopology: boolean,
//     useFindAndModify: boolean
// }


// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// };

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


