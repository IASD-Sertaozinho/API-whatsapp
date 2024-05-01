import { RegisterUserRequestDTO } from "../dto/registerUserRequestDTO";
import { UpdateUserRequestDTO } from "../dto/updateUserRequestDTO";
import { User } from "../models/User";

export interface UsersRepository {
    findAll(): Promise<Array<User>>;
    create(data: RegisterUserRequestDTO): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByCel(cel: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    update(id: string, data: UpdateUserRequestDTO): Promise<User>;
}
