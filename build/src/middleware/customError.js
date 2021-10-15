"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.ValidationError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, status, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "CustomError";
        _this.data = data || null;
        _this.status = status || 400;
        return _this;
    }
    return CustomError;
}(Error));
exports.default = CustomError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    /**
     *
     * @param message
     * @param status
     * @param data
     */
    function ValidationError(message, status, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "ValidationError";
        _this.data = data || null;
        _this.status = status || 400;
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    /**
     *
     * @param message
     * @param status
     * @param data
     */
    function AuthenticationError(message, status, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "AuthenticationError";
        _this.data = data || null;
        _this.status = status || 400;
        return _this;
    }
    return AuthenticationError;
}(Error));
exports.AuthenticationError = AuthenticationError;
