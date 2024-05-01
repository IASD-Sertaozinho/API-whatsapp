import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Message } from "@prisma/client";
import { UpdateUserService } from "../../services/updateUser";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";

export default async function UpdateUserController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateUserSchema = z.object({
        name: z.string().optional(),
        phone_number: z.string().length(14),
        message: z.nativeEnum(Message).optional(),
    });
    const updateUserService = new UpdateUserService(
        new PrismaUsersRepository()
    );
    const body = updateUserSchema.parse(request.body);
    try {
        const response = await updateUserService.execute({
            name: body.name,
            cel: body.phone_number,
            message: body.message,
        });
        reply.status(response.status).send();
    } catch (error) {
        reply.status(400).send(error);
    }
}
