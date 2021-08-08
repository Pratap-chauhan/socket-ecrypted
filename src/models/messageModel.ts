import { model, Schema, Model, Document } from 'mongoose';

interface IMessage {
    name: string,
    origin: string,
    destination: string,
    time_stamp: string
}
interface IMessageModel extends Document {
    time_stamp: string,
    message : Array<IMessage>
}
const MessageSchema: Schema = new Schema({
    time_stamp: { type: String, required: true },
  data : [{
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

export const MessageModel: Model<IMessageModel> = model('Message', MessageSchema);