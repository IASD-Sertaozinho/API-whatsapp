import WrongPasswordError from "../errors/WrongPassword";
import { AdminRepository } from "../repositories/admRepository";
import Hash from "../utils/Hash";



export default class AuthenticateAdm {
    constructor(
        private adminRepository: AdminRepository,
        private hashFunctions: Hash,
    ) { }

    async execute(data: authenticateAdminRequestDTO) {
        const user = await this.adminRepository.findByUserNumber(data.number);
        if (!user) {
            throw new Error("User not found");
        }
        const isAdmin = this.hashFunctions.compare(
            data.password,
            user.password
        );
        console.log(data.password, this.hashFunctions.desencrypt(user.password), isAdmin);

        if (!isAdmin) {
            throw new WrongPasswordError("Wrong password");
        }
        return user;
    }
}
