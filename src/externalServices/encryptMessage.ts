import * as crypto from "crypto";
class EncryptMessage{
    private algorithm = "aes-256-ctr";
    private initVector; 
    encryptMessage(message, Securitykey){
        try {
            this.initVector = this.initVector || crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, Securitykey, this.initVector);
            let encryptedData = cipher.update(message, "utf-8", "base64");
            encryptedData += cipher.final("base64");
            return encryptedData;
        } catch (error) {
            console.log(`Error while encryption with data ${JSON.stringify(message)}`);
        }
       
    }
    decryptMessage(message, Securitykey){
        try {
            const decipher = crypto.createDecipheriv(this.algorithm, Securitykey, this.initVector);
            let decryptedData = decipher.update(message, "base64", "utf-8");
            decryptedData += decipher.final("utf8");
            return decryptedData;
        } catch (error) {
            console.log(`Error while decryption with data ${JSON.stringify(message)}`);
        }
       
    }
    createHash(data){
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(data));
        return hash.copy().digest('base64').substring(0, 32)
    }
}

export const messageEncryption = new EncryptMessage();