export class UserDidntExists extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserDidntExists";
    }
}
