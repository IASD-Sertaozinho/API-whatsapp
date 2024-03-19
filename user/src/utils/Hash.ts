import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// let pass: Buffer;
// let iv: Buffer;
// Must be gen when the application starts.

export default class Hash {
    private pass: Buffer;
    private iv: Buffer;
    constructor(start_pass: Buffer, start_iv: Buffer) {
        this.pass = start_pass;
        this.iv = start_iv;
    }
    //Maybe need a refactor...
    encrypt(message: string): string {
        const encrypt = createCipheriv("aes-256-gcm", this.pass, this.iv);
        return encrypt.update(message, "utf-8", "base64");
    }
    desencrypt(message: string): string {
        const decipher = createDecipheriv("aes-256-gcm", this.pass, this.iv);
        return decipher.update(message, "utf-8", "base64");
    }
    compare(message: string, messageToCompare: string): boolean {
        const decipher = this.desencrypt(message);
        return decipher === messageToCompare;
    }
}
