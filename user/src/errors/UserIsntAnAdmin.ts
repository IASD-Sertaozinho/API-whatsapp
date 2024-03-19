export default class UserIsntAnAdminError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserIsntAnAdminError";
    }
}
