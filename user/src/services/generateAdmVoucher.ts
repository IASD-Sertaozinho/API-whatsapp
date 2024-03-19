import { UserAlreadyIsAnAdministrator } from "../errors/UserAlreadyIsAnAdministrator";
import { UserDidntExists } from "../errors/UserDidntExists";
import { AdminRepository } from "../repositories/admRepository";
import { CacheRepository } from "../repositories/cacheRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { generate } from "voucher-code-generator";

export class GenerateAdmVoucher {
    constructor(
        private usersRepository: UsersRepository,
        private adminRepository: AdminRepository,
        private cacheRepository: CacheRepository
    ) {}

    //Needs a Middleware to check if the request user is an Admin
    async execute(newAdminCel: string) {
        const user = await this.usersRepository.findByCel(newAdminCel);
        if (!user) {
            throw new UserDidntExists("User not found");
        }

        const isAdmin = await this.adminRepository.findByUserNumber(
            newAdminCel
        );
        if (isAdmin) {
            throw new UserAlreadyIsAnAdministrator(
                "The users is already an Administrator"
            );
        }
        const voucher = generate({
            length: 12,
            count: 1,
        });

        const setTimeout = 600;

        await this.cacheRepository.set(newAdminCel, voucher[0], setTimeout);
        return voucher[0];
    }
}
