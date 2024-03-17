import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findById(id: string): Promise<User>
    findByCel(cel: string): Promise<User>
}