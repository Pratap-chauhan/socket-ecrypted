import { io as clientIo } from "socket.io-client";
import { messageEncryption } from "./encryptMessage";
class ClientSocketConnection{
    init(){
        const socketConnection = clientIo("http://localhost:3000");
        socketConnection.on("sending_data",(data)=>{
            this.eventHandler(data);
        })
    }
    eventHandler(message){
        const splittedMessage = message.split('|');
        const Securitykey = splittedMessage[splittedMessage.length - 1];
        let decryptMessage =[];
        for(const msg of splittedMessage){
            decryptMessage.push(messageEncryption.decryptMessage(msg, Securitykey));
        }
        const messageInfo = {
            name : decryptMessage[0],
            origin: decryptMessage[1],
            destination: decryptMessage[2],
        }
        console.log(messageInfo);
    }
}

export const clientSockerConnection = new ClientSocketConnection();