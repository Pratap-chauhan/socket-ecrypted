"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSockerConnection = void 0;
var socket_io_client_1 = require("socket.io-client");
var encryptMessage_1 = require("./encryptMessage");
var ClientSocketConnection = /** @class */ (function () {
    function ClientSocketConnection() {
    }
    ClientSocketConnection.prototype.init = function () {
        var _this = this;
        var socketConnection = socket_io_client_1.io("http://localhost:3000");
        socketConnection.on("sending_data", function (data) {
            _this.eventHandler(data);
        });
    };
    ClientSocketConnection.prototype.eventHandler = function (message) {
        var splittedMessage = message.split('|');
        var Securitykey = splittedMessage[splittedMessage.length - 1];
        var decryptMessage = [];
        for (var _i = 0, splittedMessage_1 = splittedMessage; _i < splittedMessage_1.length; _i++) {
            var msg = splittedMessage_1[_i];
            decryptMessage.push(encryptMessage_1.messageEncryption.decryptMessage(msg, Securitykey));
        }
        var messageInfo = {
            name: decryptMessage[0],
            origin: decryptMessage[1],
            destination: decryptMessage[2],
        };
        console.log(messageInfo);
    };
    return ClientSocketConnection;
}());
exports.clientSockerConnection = new ClientSocketConnection();
