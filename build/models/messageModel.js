"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    time_stamp: { type: String, required: true },
    data: [{
            name: {
                type: String,
                required: true
            },
            origin: {
                type: String,
                required: true
            },
            destination: {
                type: String,
                required: true
            },
        }]
});
exports.MessageModel = mongoose_1.model('Message', MessageSchema);
