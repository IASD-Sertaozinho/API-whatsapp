import { AdminRepository } from "../repositories/admRepository";
// import { UsersRepository } from "../repositories/usersRepository";
import Hash from "../utils/Hash";

interface authenticateAdminRequest {
    number: string;
    password: string;
}

export default class authenticateAdm {
    constructor(
        // private usersRepository: UsersRepository,
        private adminRepository: AdminRepository,
        private hashFunctions: Hash
    ) {}

    async execute(data: authenticateAdminRequest) {
        const user = await this.adminRepository.findByUserNumber(data.number);
        if (!user) {
            throw new Error("User not found");
        }
        const isAdmin = this.hashFunctions.compare(
            data.password,
            user.password
        );
        if (!isAdmin) {
            throw new Error("Wrong password");
        }
        return user;
    }
}
