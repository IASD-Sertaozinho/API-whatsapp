import { randomUUID } from "crypto";
import { User } from "../../models/User";
import { UsersRepository } from "../usersRepository";
import { RegisterUserRequestDTO } from "../../dto/registerUserRequestDTO";

export default class InMemoryUsersRepository implements UsersRepository {
    public items: User[];
    constructor() {
        this.items = new Array<User>();
    }
    async create(data: RegisterUserRequestDTO): Promise<User> {
        const object = {
            id: randomUUID(),
            cel: data.cel,
            name: data.name,
            message: data.message,
            Admin: undefined,
        };
        this.items.push(object);
        return object;
    }
    async findById(id: string): Promise<User | undefined> {
        return this.items.find((item) => item.id === id);
    }
    async findByCel(cel: string): Promise<User | undefined> {
        return this.items.find((item) => item.cel === cel);
    }
}
