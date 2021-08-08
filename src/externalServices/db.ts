import { connect } from "mongoose";
import { MessageModel } from "../models/messageModel";
import  _moment from "moment";
class DBConnection {
  init() {
    return connect("mongodb://localhost:27017/assigment", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log(`DB: Connected to`);

      })
      .catch((error) => {
        console.log("Mongoose failed to connect to MongoDB.");
        console.error("Mongoose connection error: ", error);
        process.exit(0);
      });
  }

  async insertDbquery(messageInfo) {
    const currentTime = _moment().format("DD-MM-YYYYTHH:mm")
    console.log(messageInfo);
    try {
      return MessageModel.updateOne({
        time_stamp: currentTime
      }, {
        $push: {
          data:messageInfo
        }
      }, { upsert: true });

    } catch (error) {
      console.log("inserting", error);
      return error;
    }

  }
}

export const db = new DBConnection()