"use strict";
// const generateApiKey = require('generate-api-key')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidKeyCheck = exports.validateUuid = exports.validateKey = exports.convertToUuid = exports.convertToApiKey = exports.generateUuid = exports.generateKey = void 0;
// export default function getApikey(){
//     return generateApiKey({method: "string"})
// }
var uuid_apikey_1 = __importDefault(require("uuid-apikey"));
/**
 *
 * @returns
 */
function generateKey() {
    var uuidApiKeyObject = uuid_apikey_1.default.create();
    return uuidApiKeyObject.apiKey;
}
exports.generateKey = generateKey;
/**
 *
 * @returns
 */
function generateUuid() {
    var uuidApiKeyObject = uuid_apikey_1.default.create();
    return uuidApiKeyObject.uuid;
}
exports.generateUuid = generateUuid;
/**
 *
 * @param uuid
 * @returns
 */
function convertToApiKey(uuid) {
    if (!uuid)
        return;
    return uuid_apikey_1.default.toAPIKey(uuid);
}
exports.convertToApiKey = convertToApiKey;
/**
 *
 * @param key
 * @returns
 */
function convertToUuid(key) {
    if (!key)
        return;
    return uuid_apikey_1.default.toUUID(key);
}
exports.convertToUuid = convertToUuid;
function validateKey(apikey) {
    return uuid_apikey_1.default.isAPIKey(apikey);
}
exports.validateKey = validateKey;
function validateUuid(uuid) {
    return uuid_apikey_1.default.isUUID(uuid);
}
exports.validateUuid = validateUuid;
/**
 *
 * @param apikey
 * @param uuid
 * @returns
 */
function uuidKeyCheck(apikey, uuid) {
    return uuid_apikey_1.default.check(apikey, uuid);
}
exports.uuidKeyCheck = uuidKeyCheck;
