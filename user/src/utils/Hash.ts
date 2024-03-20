import { createCipheriv, createDecipheriv } from "node:crypto";
import { Buffer } from "node:buffer";

export default class Hash {
    private key: Buffer;
    private iv: Buffer;
    constructor(start_pass: Buffer, start_iv: Buffer) {
        this.key = start_pass;
        this.iv = start_iv;
    }
    encrypt(text: string) {
        const cipher = createCipheriv("aes-256-cbc", this.key, this.iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }

    decrypt(encryptedText: string) {
        const decipher = createDecipheriv("aes-256-cbc", this.key, this.iv);
        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }

    compare(plainText: string, encryptedText: string) {
        return this.encrypt(plainText) === encryptedText;
    }
}
