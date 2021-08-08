"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = void 0;
var encryptMessage_1 = require("./encryptMessage");
var data_json_1 = __importDefault(require("../constants/data.json"));
var SocketConnection = /** @class */ (function () {
    function SocketConnection() {
    }
    SocketConnection.prototype.sockerInitialization = function (socket) {
        if (!this.socket) {
            this.socket = socket;
            this.emitMessage();
        }
    };
    SocketConnection.prototype.emitMessage = function () {
        var _this = this;
        try {
            var randomNumber = Math.floor(Math.random() * 100);
            var sumCheckMessage = {
                name: data_json_1.default.names[randomNumber],
                origin: data_json_1.default.cities[randomNumber],
                destination: data_json_1.default.cities[randomNumber + 1],
            };
            var hashedKey = encryptMessage_1.messageEncryption.createHash(sumCheckMessage);
            var name_1 = encryptMessage_1.messageEncryption.encryptMessage(sumCheckMessage.name, hashedKey);
            var origin_1 = encryptMessage_1.messageEncryption.encryptMessage(sumCheckMessage.origin, hashedKey);
            var destination = encryptMessage_1.messageEncryption.encryptMessage(sumCheckMessage.destination, hashedKey);
            var messageString = name_1 + "|" + origin_1 + "|" + destination + "|" + hashedKey;
            this.socket.emit("sending_data", messageString);
            setInterval(function () {
                _this.emitMessage();
            }, 30000);
        }
        catch (e) {
            console.log("erroremit", e);
        }
    };
    return SocketConnection;
}());
exports.socketConnection = new SocketConnection();
