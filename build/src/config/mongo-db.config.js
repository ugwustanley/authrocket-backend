"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dbURI = "mongodb+srv://ugwustanley:unn247790@cluster0.kxnme.mongodb.net/test";
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
function initializeMongodb() {
    mongoose_1.default.connect(dbURI);
    //check for connection
    mongoose_1.default.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI);
    });
    // error check
    mongoose_1.default.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
}
exports.default = initializeMongodb;
