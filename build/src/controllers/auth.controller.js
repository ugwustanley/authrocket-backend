"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.isEmailVerified = exports.confirmEmail = exports.getApiKey = exports.getUsers = exports.userLogin = exports.userRegister = void 0;
var keyServices_1 = require("../middleware/keyServices");
var auth_service_1 = require("../services/auth.service");
var hash_1 = require("../middleware/hash");
var auth_1 = require("../middleware/auth");
var mailer_1 = __importDefault(require("../middleware/mailer"));
var customError_1 = __importDefault(require("../middleware/customError"));
/**
 *
 * @param req
 * @param res
 */
function userRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, auth, user, payload, isApiKeyValid, hashedPassword, uuid, data, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, auth = _a.auth, user = _a.user, payload = _a.payload;
                    console.log(req.body, "this is the request body");
                    console.log("this is from register that is updated");
                    if (!auth || !user)
                        next(new customError_1.default("auth or user data not provided"));
                    if (!auth.appName || !auth.apiKey)
                        next(new customError_1.default("auth details not complete"));
                    if (!user.email || !user.password)
                        throw new customError_1.default("user data not complete");
                    return [4 /*yield*/, keyServices_1.validateKey(auth.apiKey)];
                case 1:
                    isApiKeyValid = _b.sent();
                    if (!isApiKeyValid) {
                        next(new customError_1.default("api key is not valid"));
                    }
                    return [4 /*yield*/, hash_1.hashItem(user.password)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, keyServices_1.generateUuid()];
                case 3:
                    uuid = _b.sent();
                    return [4 /*yield*/, auth_service_1._userRegister(user.email, hashedPassword, auth.apiKey, uuid, auth.appName, payload || null, next).catch(function (err) {
                            next(err);
                        })];
                case 4:
                    data = _b.sent();
                    if (!data)
                        new customError_1.default("An error occurred");
                    if (data) {
                        try {
                            body = "\n            <img style=\"width:220px;display:block;margin:auto\" src=\"https://i.ibb.co/DkDnnZW/sent-removebg-preview.png\">\n            <h2 style=\"text-align:center;font-size:20px;\">Verify your email address</h2>\n            <p style=\"padding-bottom:.1rem;text-align:center\">Please confirm that you want to use " + data.email + " as your " + data.appName + " account email address.</p>\n            <p style=\"text-align:center\">Verify this email address by clicking the button below</p>\n            <a style=\"display:block;margin:auto;text-align:center;margin-top:2rem;margin-bottom:2rem;text-decoration:none;\" href=\"https://authrocket.herokuapp.com/v1/users/confirm/" + data.uuid + "\"><button style=\"padding:1rem;color:#fff;background:#553d83;display:block;margin:auto;text-align:center;border:none;outline:none;\">Confirm Email Address</button></a>\n\n            <p style=\"padding:7px;text-align:center;\">Or copy and paste the below link to your browser</p>\n            <p style=\"color:blue;text-align:center\">https://authrocket.herokuapp.com/v1/users/confirm/" + data.uuid + "</p>\n            ";
                            mailer_1.default(data.email, "Confirm Email Addresss", body || "this is to test out our application click https://gmail.com");
                        }
                        catch (err) {
                            next(err);
                        }
                        // const jwt = await generateJwtToken(data.uuid).catch(err => next(err));
                        res
                            .status(200)
                            .send({
                            success: true,
                            message: "Registration successful",
                            data: data || null,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.userRegister = userRegister;
/**
 *
 * @param req
 * @param res
 */
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, auth, user, isApiKeyValid, data, jwt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, auth = _a.auth, user = _a.user;
                    if (!auth || !user)
                        next(new customError_1.default("auth or user data not provided"));
                    if (!auth.appName || !auth.apiKey)
                        next(new customError_1.default("auth details not complete"));
                    if (!user.email || !user.password)
                        throw new customError_1.default("user data not complete");
                    return [4 /*yield*/, keyServices_1.validateKey(auth.apiKey)];
                case 1:
                    isApiKeyValid = _b.sent();
                    if (!isApiKeyValid) {
                        next(new customError_1.default("api key is not valid"));
                    }
                    return [4 /*yield*/, auth_service_1._userLogin(user.email, user.password, next).catch(function (err) {
                            next(err);
                        })];
                case 2:
                    data = _b.sent();
                    if (!data)
                        throw new customError_1.default("An error occured");
                    if (!data) return [3 /*break*/, 4];
                    return [4 /*yield*/, auth_1.generateJwtToken(data.uuid, next).catch(function (err) {
                            return next(err);
                        })];
                case 3:
                    jwt = _b.sent();
                    //   const expiration = 1220
                    //  // HttpContext.Response.Cookies.Append("access_token", tokens.AccessToken, new CookieOptions { HttpOnly = true });
                    //   res.cookie('token', jwt, {
                    //     expires: new Date(Date.now() + expiration), 
                    //     secure: false, // set to true if your using https
                    //     httpOnly: true,
                    //   });
                    res
                        .status(200)
                        .send({
                        success: true,
                        message: "User Login successful",
                        token: jwt,
                        data: data || null,
                    });
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.userLogin = userLogin;
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, isApiKeyValid, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = req.params.id;
                    return [4 /*yield*/, keyServices_1.validateKey(apiKey)];
                case 1:
                    isApiKeyValid = _a.sent();
                    if (!isApiKeyValid) {
                        next(new customError_1.default("api key is not valid"));
                    }
                    return [4 /*yield*/, auth_service_1._getUsers(apiKey).catch(function (err) { return next(err); })];
                case 2:
                    users = _a.sent();
                    // if(!users) new CustomError("An error occured while trying to get users")
                    if (users) {
                        // const jwt = await generateJwtToken(data.uuid).catch(err => next(err));
                        res
                            .status(200)
                            .send({
                            success: true,
                            message: "users data return successful",
                            data: users || null,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function getApiKey(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var uuid, isUuidValid, apiKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.id;
                    return [4 /*yield*/, keyServices_1.validateUuid(uuid)];
                case 1:
                    isUuidValid = _a.sent();
                    if (!isUuidValid) {
                        next(new customError_1.default("uuid is not valid"));
                    }
                    if (!isUuidValid) return [3 /*break*/, 3];
                    return [4 /*yield*/, keyServices_1.convertToApiKey(uuid)];
                case 2:
                    apiKey = _a.sent();
                    if (!apiKey)
                        next(new customError_1.default("api key could not be generated"));
                    if (apiKey)
                        res.status(200).send({ uuid: uuid, apiKey: apiKey });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getApiKey = getApiKey;
function confirmEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var uuid, isUuidValid, user_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.id;
                    if (!uuid)
                        next(new customError_1.default("uuid is not provided"));
                    return [4 /*yield*/, keyServices_1.validateUuid(uuid)];
                case 1:
                    isUuidValid = _a.sent();
                    if (!isUuidValid) {
                        next(new customError_1.default("uuid is not valid"));
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, auth_service_1._confirmEmail(uuid)
                        // res.redirect('/v1/users/login');
                        //window.location.href = "/v1/users/login"
                        //    res.status(200).send({
                        //     success: true,
                        //     message: "User email address confirmed",
                        //     data: user || null,
                        //   });
                    ];
                case 3:
                    user_1 = _a.sent();
                    // res.redirect('/v1/users/login');
                    //window.location.href = "/v1/users/login"
                    //    res.status(200).send({
                    //     success: true,
                    //     message: "User email address confirmed",
                    //     data: user || null,
                    //   });
                    res.send("Email address  confirmed. revisit our site to log into your account");
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.confirmEmail = confirmEmail;
function isEmailVerified(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var uuid, isUuidValid, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.id;
                    if (!uuid)
                        next(new customError_1.default("User uuid not provided"));
                    return [4 /*yield*/, keyServices_1.validateUuid(uuid)];
                case 1:
                    isUuidValid = _a.sent();
                    if (!isUuidValid) {
                        next(new customError_1.default("uuid is not valid"));
                    }
                    console.log("controller");
                    return [4 /*yield*/, auth_service_1._isEmailVerified(uuid, next).catch(function (err) {
                            next(err);
                        })];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    if (!data)
                        new customError_1.default("An error occurred");
                    if (data) {
                        res
                            .status(200)
                            .send({
                            success: true,
                            message: "request successful",
                            data: data.isEmailVerified || false,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.isEmailVerified = isEmailVerified;
function user(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var uuid, isUuidValid, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.params.id;
                    return [4 /*yield*/, keyServices_1.validateUuid(uuid)];
                case 1:
                    isUuidValid = _a.sent();
                    if (!isUuidValid) {
                        next(new customError_1.default("uuid is not valid"));
                    }
                    return [4 /*yield*/, auth_service_1._user(uuid, next).catch(function (err) {
                            next(err);
                        })];
                case 2:
                    data = _a.sent();
                    if (!data)
                        throw new customError_1.default("An error occured");
                    if (data) {
                        res
                            .status(200)
                            .send({
                            success: true,
                            message: "Request successful",
                            data: data || null,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.user = user;
