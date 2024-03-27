import { randomUUID } from "crypto";
import { User } from "../../models/User";
import { UsersRepository } from "../usersRepository";
import { RegisterUserRequestDTO } from "../../dto/registerUserRequestDTO";

export default class InMemoryUsersRepository implements UsersRepository {
    public items: User[];
    constructor() {
        this.items = new Array<User>();
    }

    async findAll(): Promise<User[]> {
        return this.items;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex((item) => item.id === id);
        this.items.splice(index, 1);
    }

    async update(id: string, data: RegisterUserRequestDTO): Promise<User> {
        const index = this.items.findIndex((item) => item.id === id);
        this.items[index] = {
            ...this.items[index],
            cel: data.cel ? data.cel : this.items[index].cel,
            name: data.name ? data.name : this.items[index].name,
            message: data.message ? data.message : this.items[index].message,
        };
        return this.items[index];
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
