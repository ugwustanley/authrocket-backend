"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// import bodyParser from 'body-parser'
var auth_route_1 = __importDefault(require("./src/routes/auth.route"));
var error_1 = __importDefault(require("./src/middleware/error"));
var customError_1 = __importDefault(require("./src/middleware/customError"));
var mongo_db_config_1 = __importDefault(require("./src/config/mongo-db.config"));
var bodyParser = require('body-parser');
require("dotenv").config();
var app = express_1.default();
app.use(cors_1.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send("Hello World");
});
app.use("/v1/users", auth_route_1.default);
app.get("*", function (req, res) {
    throw new customError_1.default("This route does not exist", 400, null);
});
// Error
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     throw new CustomError( "IN_APP ERROR OCCURED", 400 , null)
// });
app.use(error_1.default);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("port running at " + PORT);
    mongo_db_config_1.default();
});
