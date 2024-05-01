import { prisma } from "../../lib/prisma";
import { Admin } from "../../models/Admin";
import { AdminRepository, createAdminData } from "../admRepository";

export class PrismaAdminRepository implements AdminRepository {
    async create(data: createAdminData): Promise<Admin> {
        return await prisma.admin.create({
            data: {
                userCel: data.cel,
                password: data.password,
            },
        });
    }
    async delete(phone_number: string): Promise<void> {
        await prisma.admin.delete({
            where: {
                userCel: phone_number,
            },
        });
    }
    async findByUserNumber(number: string): Promise<Admin | null> {
        return await prisma.admin.findUnique({ where: { userCel: number } });
    }
}
