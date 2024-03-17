import { UsersRepository } from "../repositories/usersRepository";
import { Message } from "@prisma/client"


interface RegisterUserRequest {
    name: string;
    cel: string;
    message: Message

}

export default class registerUser {
    constructor(private usersRepository: UsersRepository) { }

    async execute(data: RegisterUserRequest) {


        const user = await this.usersRepository.findByCel(data.cel);
        if (user) {
            throw new Error("User already exists");
        }

        await this.usersRepository.create(data);

        return 201;
    }
}
