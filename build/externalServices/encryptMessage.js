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
exports.messageEncryption = void 0;
var crypto = __importStar(require("crypto"));
var EncryptMessage = /** @class */ (function () {
    function EncryptMessage() {
        this.algorithm = "aes-256-ctr";
    }
    EncryptMessage.prototype.encryptMessage = function (message, Securitykey) {
        this.initVector = this.initVector || crypto.randomBytes(16);
        var cipher = crypto.createCipheriv(this.algorithm, Securitykey, this.initVector);
        var encryptedData = cipher.update(message, "utf-8", "base64");
        encryptedData += cipher.final("base64");
        return encryptedData;
    };
    EncryptMessage.prototype.decryptMessage = function (message, Securitykey) {
        var decipher = crypto.createDecipheriv(this.algorithm, Securitykey, this.initVector);
        var decryptedData = decipher.update(message, "base64", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    };
    EncryptMessage.prototype.createHash = function (data) {
        var hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(data));
        return hash.copy().digest('base64').substring(0, 32);
    };
    return EncryptMessage;
}());
exports.messageEncryption = new EncryptMessage();
