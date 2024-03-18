import { AdminRepository } from "../repositories/admRepository";
import { CacheRepository } from "../repositories/cacheRepository";
import { UsersRepository } from "../repositories/usersRepository";
import Hash from "../utils/Hash";

interface RegisterAdministrator {
    voucher: string;
    cel: string;
    username: string;
    password: string;
}

export default class registerAdm {
    constructor(
        private usersRepository: UsersRepository,
        private adminRepository: AdminRepository,
        private cacheRepository: CacheRepository,
        private hashFunctions: Hash
    ) {}

    async execute(data: RegisterAdministrator) {
        const user = await this.usersRepository.findByCel(data.cel);
        if (!user) {
            throw new Error("User didn't exists");
        }
        const isAdmin = await this.adminRepository.findByUserNumber(data.cel);
        if (isAdmin) {
            throw new Error("The users is already an Administrator");
        }
        const verifyVoucher = await this.cacheRepository.get(data.cel);
        if (!verifyVoucher || data.voucher != verifyVoucher) {
            throw new Error("Voucher doesn't match");
        }
        const newAdmin = await this.adminRepository.create({
            username: data.username,
            password: this.hashFunctions.encrypt(data.password),
            userCel: data.cel,
        });
        return newAdmin;
    }
}
