import { RegisterUserRequestDTO } from "../../dto/registerUserRequestDTO";
import { UpdateUserRequestDTO } from "../../dto/updateUserRequestDTO";
import { UsersRepository } from "../usersRepository";
import { prisma } from "../../lib/prisma";
import { User } from "../../models/User";

export class PrismaUsersRepository implements UsersRepository {
    async findAll(): Promise<User[]> {
        const user = await prisma.user.findMany();
        return user;
    }
    async create(data: RegisterUserRequestDTO): Promise<User> {
        const user = await prisma.user.create({ data });
        return user;
    }
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }
    async findByCel(cel: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { cel } });
        return user;
    }
    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
    async update(id: string, data: UpdateUserRequestDTO): Promise<User> {
        const user = await prisma.user.update({
            where: { id },
            data: {
                message: data.message,
                name: data.name,
                cel: data.cel,
            },
        });
        return user;
    }
}
