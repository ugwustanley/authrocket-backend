"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var customError_1 = __importStar(require("./customError"));
var response_1 = require("./response");
/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
var errors = function (error, req, res, next) {
    if (error instanceof customError_1.ValidationError) {
        res.status(error.status || 400).send(response_1.response(false, error.message, null));
    }
    if (error instanceof customError_1.AuthenticationError) {
        res.status(error.status || 400).send(response_1.response(false, error.message, null));
    }
    if (error instanceof customError_1.default) {
        res.status(error.status || 400).send(response_1.response(false, error.message, null));
    }
    if (error.name == "JsonWebTokenError") {
        res.status(400).send(response_1.response(false, error.message, null));
    }
    if (error.name == "SyntaxError") {
        res.status(400).send(response_1.response(false, error.message, null));
    }
    else {
        res.status(500).send(response_1.response(false, error.message, null));
    }
};
exports.default = errors;
