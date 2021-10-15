"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.apiKey = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
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
var apiKeySchema = new mongoose_1.default.Schema({
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
exports.apiKey = mongoose_1.default.model("key", apiKeySchema);
exports.User = mongoose_1.default.model("User", userSchema);
