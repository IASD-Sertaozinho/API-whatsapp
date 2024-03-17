import { AdminRepository } from "../repositories/admRepository";
import { CacheRepository } from "../repositories/cacheRepository";
import { UsersRepository } from "../repositories/usersRepository";



interface RegisterAdministrator {
    voucher: string;
    cel: string;
    username: string;
    password: string;

}

export default class registerAdm {
    constructor(private usersRepository: UsersRepository, private adminRepository: AdminRepository, private cacheRepository: CacheRepository) { }

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
            password: Hash(data.password), //To do a Hash function
            userCel: data.cel
        });
        return newAdmin;

    }

}
