import { RegisterUserRequestDTO } from "../dto/registerUserRequestDTO";
import { User } from "../models/User";

export interface UsersRepository {
    create(data: RegisterUserRequestDTO): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByCel(cel: string): Promise<User | undefined>;
}
