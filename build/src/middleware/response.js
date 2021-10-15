"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
/**
 *
 * @param success
 * @param message
 * @param data
 * @returns
 */
var response = function (success, message, data) {
    var responseJSON = {
        success: success || false,
        message: message || null,
        data: data || null
    };
    return responseJSON;
};
exports.response = response;
