import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GenerateAdmVoucherService } from "../../services/generateAdmVoucher";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";
import { PrismaAdminRepository } from "../../repositories/prisma/PrismaAdminRepository";
import RedisConfig from "../../config/redis/redisConfig";

export default async function GenerateAdmVoucherController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const generateAdmVoucherSchema = z.object({
        newAdminNumber: z.string(),
        adminNumber: z.string(),
    });
    const body = generateAdmVoucherSchema.parse(request.body);

    const generateAdmVoucherService = new GenerateAdmVoucherService(
        new PrismaUsersRepository(),
        new PrismaAdminRepository(),
        new RedisConfig()
    );

    try {
        const response = await generateAdmVoucherService.execute({
            adminNumber: body.adminNumber,
            newAdminNumber: body.newAdminNumber,
        });
        reply.status(response.status).send(response.send);
    } catch (error) {}
}
