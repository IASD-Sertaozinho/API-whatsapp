import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import RegisterUserService from "../../services/registerUser";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";
import { Message } from "@prisma/client";

export default async function RegisterUserController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerUserSchema = z.object({
        name: z.string(),
        phone_number: z.string().length(14),
        message: z.nativeEnum(Message),
    });
    const registerUserService = new RegisterUserService(
        new PrismaUsersRepository()
    );

    const body = registerUserSchema.parse(request.body);

    try {
        const response = await registerUserService.execute({
            cel: body.phone_number,
            name: body.name,
            message: body.message,
        });
        reply.status(response.status).send();
    } catch (error) {
        reply.status(400).send(error);
    }
}
