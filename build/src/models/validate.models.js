"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.validationSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.validationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .max(150)
        .required()
        .email({
        minDomainSegments: 2
    }),
    password: joi_1.default.string()
        .min(6)
        .max(255)
        .required()
});
exports.registerSchema = joi_1.default.object({
    auth: {
        apiKey: joi_1.default.string().required(),
        appName: joi_1.default.string().required()
    },
    user: {
        email: joi_1.default.string()
            .max(150)
            .required()
            .email({
            minDomainSegments: 2
        }),
        password: joi_1.default.string()
            .min(6)
            .max(255)
            .required()
    },
    payload: joi_1.default.any()
});
exports.loginSchema = joi_1.default.object({
    auth: {
        apiKey: joi_1.default.string().required(),
        appName: joi_1.default.string().required()
    },
    user: {
        email: joi_1.default.string()
            .max(150)
            .required()
            .email({
            minDomainSegments: 2
        }),
        password: joi_1.default.string()
            .min(6)
            .max(255)
            .required()
    }
});
