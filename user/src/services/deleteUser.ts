import { UserDidntExists } from "../errors/UserDidntExists";
import { UsersRepository } from "../repositories/usersRepository";
// import { Message } from "@prisma/client";

export default class DeleteUserService {
    constructor(private usersRepository: UsersRepository) {}

    async execute(data: deleteUserRequestDTO) {
        const user = await this.usersRepository.findByCel(data.number);
        if (!user) {
            throw new UserDidntExists("User not found");
        }
        await this.usersRepository.delete(user.id);
        return { status: 200 };
    }
}
