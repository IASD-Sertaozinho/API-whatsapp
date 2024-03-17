import { AdminRepository } from "../repositories/admRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { generate } from "voucher-code-generator";
import { setRedis } from "../utils/redis/redisConfig";

export class GenerateAdmVoucher {
    constructor(private usersRepository: UsersRepository, private adminRepository: AdminRepository) { }


    async execute(newAdminCel: string) {

        const user = await this.usersRepository.findByCel(newAdminCel);
        if (!user) {
            throw new Error("User not found");
        }

        const isAdmin = await this.adminRepository.findByUserNumber(newAdminCel);
        if (isAdmin) {
            throw new Error("The users is already an Administrator");
        }
        const voucher = generate({
            length: 12,
            count: 1,
        })


        //The message will be stored for 10 minutes
        const setTimeout = 600

        await setRedis(newAdminCel, voucher[0], setTimeout)
    }
}
