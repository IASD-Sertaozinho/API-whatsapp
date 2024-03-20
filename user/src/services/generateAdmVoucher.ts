import { UserAlreadyIsAnAdministrator } from "../errors/UserAlreadyIsAnAdministrator";
import { UserDidntExists } from "../errors/UserDidntExists";
import UserIsntAnAdminError from "../errors/UserIsntAnAdmin";
import { AdminRepository } from "../repositories/admRepository";
import { CacheRepository } from "../repositories/cacheRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { generate } from "voucher-code-generator";

interface generateAdmVoucher {
    newAdminNumber: string;
    adminNumber: string;
}

export class GenerateAdmVoucher {
    constructor(
        private usersRepository: UsersRepository,
        private adminRepository: AdminRepository,
        private cacheRepository: CacheRepository
    ) {}

    //Needs a Middleware to check if the request user is an Admin
    async execute(data: generateAdmVoucher) {
        const isAdm = await this.adminRepository.findByUserNumber(
            data.adminNumber
        );
        if (!isAdm) {
            throw new UserIsntAnAdminError("You are not an Administrator!");
        }

        const user = await this.usersRepository.findByCel(data.newAdminNumber);
        if (!user) {
            throw new UserDidntExists("User not found");
        }

        const isAdmin = await this.adminRepository.findByUserNumber(
            data.newAdminNumber
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

        await this.cacheRepository.set(
            data.newAdminNumber,
            voucher[0],
            setTimeout
        );
        return voucher[0];
    }
}
