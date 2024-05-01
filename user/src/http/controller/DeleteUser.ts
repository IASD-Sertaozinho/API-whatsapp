import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import DeleteUserService from "../../services/deleteUser";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";

export default async function DeleteUserController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deleteUserSchema = z.object({
        number: z.string(),
    });

    const deleteUserService = new DeleteUserService(
        new PrismaUsersRepository()
    );
    const params = deleteUserSchema.parse(request.params);

    try {
        const response = await deleteUserService.execute({
            number: params.number,
        });
        reply.status(response.status).send("Delete successfully");
    } catch (error) {
        reply.status(400).send(error);
    }
}
