import { UpdateUserRequestDTO } from "../dto/updateUserRequestDTO";
import { UserDidntExists } from "../errors/UserDidntExists";
import { UsersRepository } from "../repositories/usersRepository";

export class UpdateUserService {
    constructor(private usersRepository: UsersRepository) {}
    async execute(data: UpdateUserRequestDTO) {
        const user = await this.usersRepository.findByCel(data.cel);
        if (!user) {
            throw new UserDidntExists("User not found");
        }
        const response = await this.usersRepository.update(user.id, data);
        return { status: 204 };
    }
}
