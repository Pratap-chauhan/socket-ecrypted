import { Socket } from "socket.io";
import { messageEncryption} from "./encryptMessage";
import data from "../constants/data.json";
class SocketConnection {
    private socket: Socket;
    sockerInitialization(socket: Socket){
        if(!this.socket) {
            this.socket = socket;
            this.emitMessage();
        }
    }
    emitMessage(){
        try{
            const randomNumber = Math.floor(Math.random() * 100);
            const sumCheckMessage = {
                name: data.names[randomNumber],
                origin: data.cities[randomNumber],
                destination: data.cities[randomNumber + 1],
            }
            const hashedKey = messageEncryption.createHash(sumCheckMessage);
            const name = messageEncryption.encryptMessage(sumCheckMessage.name, hashedKey);
            const origin = messageEncryption.encryptMessage(sumCheckMessage.origin, hashedKey);
            const destination = messageEncryption.encryptMessage(sumCheckMessage.destination, hashedKey);
            const messageString = `${name}|${origin}|${destination}|${hashedKey}`;
            this.socket.emit("sending_data", messageString);
            setInterval(()=>{
                this.emitMessage()
            },30000)
        } catch(e){
            console.log("erroremit", e);
        }
        
    }
}
export const socketConnection = new SocketConnection();