export default class InvalidVoucherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidVoucherError";
    }
}
