import { Admin, Prisma } from "@prisma/client";


export interface AdminRepository {
    create(data: Prisma.AdminUncheckedCreateInput): Promise<Admin>
    findByUsername(username: string): Promise<Admin>
    delete(username: string): Promise<void>
    findByUserNumber(number: string): Promise<Admin>
}
