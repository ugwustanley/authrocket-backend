"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateApiKey = require('generate-api-key');
function getApikey() {
    return generateApiKey({ method: "string" });
}
exports.default = getApikey;
