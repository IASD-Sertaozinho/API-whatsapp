import RegisterAdministratorRequestDTO from "../dto/registerAdmRequestDTO";
import InvalidVoucherError from "../errors/InvalidVoucher";
import { UserAlreadyIsAnAdministrator } from "../errors/UserAlreadyIsAnAdministrator";
import { UserDidntExists } from "../errors/UserDidntExists";
import { AdminRepository } from "../repositories/admRepository";
import { CacheRepository } from "../repositories/cacheRepository";
import { UsersRepository } from "../repositories/usersRepository";
import Hash from "../utils/Hash";

export default class registerAdm {
    constructor(
        private usersRepository: UsersRepository,
        private adminRepository: AdminRepository,
        private cacheRepository: CacheRepository,
        private hashFunctions: Hash
    ) {}

    async execute(data: RegisterAdministratorRequestDTO) {
        const user = await this.usersRepository.findByCel(data.cel);
        if (!user) {
            throw new UserDidntExists("User didn't exists");
        }
        const isAdmin = await this.adminRepository.findByUserNumber(data.cel);
        if (isAdmin) {
            throw new UserAlreadyIsAnAdministrator(
                "The user is already an Administrator"
            );
        }
        const verifyVoucher = await this.cacheRepository.get(data.cel);
        if (!verifyVoucher || data.voucher != verifyVoucher) {
            throw new InvalidVoucherError("Voucher doesn't match");
        }
        const newAdmin = await this.adminRepository.create({
            password: this.hashFunctions.encrypt(data.password),
            cel: data.cel,
        });
        return newAdmin;
    }
}
