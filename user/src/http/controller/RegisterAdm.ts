import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import RegisterAdmService from "../../services/registerAdm";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";
import RedisConfig from "../../config/redis/redisConfig";
import { hash } from "../../app";
import { PrismaAdminRepository } from "../../repositories/prisma/PrismaAdminRepository";

export default async function RegisterAdmController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerAdmSchema = z.object({
        voucher: z.string(),
        cel: z.string().length(14),
        password: z.string(),
    });
    const body = registerAdmSchema.parse(request.body);
    const registerAdmServicer = new RegisterAdmService(
        new PrismaUsersRepository(),
        new PrismaAdminRepository(),
        new RedisConfig(),
        hash
    );
    try {
        const response = await registerAdmServicer.execute(body);

        reply.status(response.status).send(response.send);
    } catch (error) {
        reply.status(400).send(error);
    }
}
