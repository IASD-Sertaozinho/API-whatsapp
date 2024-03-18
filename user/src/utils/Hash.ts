import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const pass = randomBytes(32);
const iv = randomBytes(16);
// Must be gen when the application starts.

export default class Hash {
    encrypt(message: string): string {
        const encrypt = createCipheriv("aes-256-gcm", pass, iv);
        return encrypt.update(message, "utf-8", "base64");
    }
    desencrypt(message: string): string {
        const decipher = createDecipheriv("aes-256-gcm", pass, iv);
        return decipher.update(message, "utf-8", "base64");
    }
    compare(message: string, messageToCompare: string): boolean {
        const decipher = this.desencrypt(message);
        return decipher === messageToCompare;
    }
}
