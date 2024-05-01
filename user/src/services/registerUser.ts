import { RegisterUserRequestDTO } from "../dto/registerUserRequestDTO";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { UsersRepository } from "../repositories/usersRepository";
// import { Message } from "@prisma/client";

export default class RegisterUserService {
    constructor(private usersRepository: UsersRepository) {}

    async execute(data: RegisterUserRequestDTO) {
        const user = await this.usersRepository.findByCel(data.cel);
        if (user) {
            throw new UserAlreadyExistsError("Number already signed up");
        }
        await this.usersRepository.create(data);

        return { status: 201 };
    }
}
