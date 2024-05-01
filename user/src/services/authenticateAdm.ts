import { UserDidntExists } from "../errors/UserDidntExists";
import WrongPasswordError from "../errors/WrongPassword";
import { AdminRepository } from "../repositories/admRepository";
import Hash from "../utils/Hash";

//middleware?
export default class AuthenticateAdmService {
    constructor(
        private adminRepository: AdminRepository,
        private hashFunctions: Hash
    ) {}

    async execute(data: authenticateAdminRequestDTO) {
        const admin = await this.adminRepository.findByUserNumber(data.number);
        if (!admin) {
            throw new UserDidntExists("User not found");
        }
        const isAdmin = this.hashFunctions.compare(
            data.password,
            admin.password
        );

        if (!isAdmin) {
            throw new WrongPasswordError("Wrong password");
        }
        return admin;
    }
}
