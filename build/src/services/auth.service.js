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
exports._user = exports._isEmailVerified = exports._confirmEmail = exports._getUsers = exports._userLogin = exports._userRegister = void 0;
var mongoose_models_1 = require("../models/mongoose.models");
var customError_1 = __importDefault(require("../middleware/customError"));
var hash_1 = require("../middleware/hash");
var _userRegister = function (email, password, apiKey, uuid, appName, payload, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_models_1.User.findOne({
                    email: email
                })];
            case 1:
                if (_a.sent())
                    throw new customError_1.default("Email address already exists", 400, null);
                else {
                    data = {
                        email: email,
                        password: password,
                        apiKey: apiKey,
                        appName: appName,
                        uuid: uuid,
                        isEmailVerified: false,
                        payload: payload || null
                    };
                    user = new mongoose_models_1.User(data);
                    user.save(function (err) {
                        if (err)
                            throw new customError_1.default(err.message);
                    });
                    return [2 /*return*/, data];
                }
                return [2 /*return*/];
        }
    });
}); };
exports._userRegister = _userRegister;
var _userLogin = function (email, password, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, isPasswordValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_models_1.User.findOne({ email: email })];
            case 1:
                userData = _a.sent();
                if (!userData)
                    throw new customError_1.default("Email address does not exist");
                if (!userData) return [3 /*break*/, 3];
                return [4 /*yield*/, hash_1.validateHash(password, userData.password).catch(function (err) { return next(err.message); })];
            case 2:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new customError_1.default("User password provided is incorrect");
                }
                if (isPasswordValid)
                    return [2 /*return*/, userData];
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports._userLogin = _userLogin;
var _getUsers = function (apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_models_1.User.find({ apiKey: apiKey })];
            case 1:
                users = _a.sent();
                if (!users)
                    return [2 /*return*/];
                if (users) {
                    return [2 /*return*/, users];
                }
                return [2 /*return*/];
        }
    });
}); };
exports._getUsers = _getUsers;
var _confirmEmail = function (uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = mongoose_models_1.User.findOneAndUpdate({ uuid: uuid }, { $set: { isEmailVerified: true } }, { new: true });
        if (!user)
            return [2 /*return*/];
        return [2 /*return*/, user];
    });
}); };
exports._confirmEmail = _confirmEmail;
var _isEmailVerified = function (uuid, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_models_1.User.findOne({ uuid: uuid })];
            case 1:
                userData = _a.sent();
                if (!userData)
                    throw new customError_1.default("User does not exist");
                console.log("services");
                if (userData) {
                    console.log(userData);
                    return [2 /*return*/, userData];
                }
                console.log(userData, "us");
                return [2 /*return*/];
        }
    });
}); };
exports._isEmailVerified = _isEmailVerified;
var _user = function (uuid, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_models_1.User.findOne({ uuid: uuid })];
            case 1:
                userData = _a.sent();
                if (!userData)
                    throw new customError_1.default("user does not exist");
                if (userData) {
                    return [2 /*return*/, userData];
                }
                return [2 /*return*/];
        }
    });
}); };
exports._user = _user;
