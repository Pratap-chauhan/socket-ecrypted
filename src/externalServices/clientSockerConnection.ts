import { messageEncryption } from "./encryptMessage";
import { db } from "./db";
class ClientSocketConnection{

    async eventHandler(message){
        try {
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
            };
            await this.insertMessageInDB(messageInfo);   
        } catch (error) {
            console.log(`Error in Message handling with data ${message}`)
        }
       
    }

    async insertMessageInDB(message) {
        try {
           const queryRes =  await db.insertDbquery(message);
           console.log(`Insertion Query Response ${JSON.stringify(queryRes)}`);
        } catch (error) {
            console.log("error insertMessageInDB", error);   
        }
    }
}

export const clientSockerConnection = new ClientSocketConnection();