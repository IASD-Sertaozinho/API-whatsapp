import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";
import { GetUsersService } from "../../services/get_users";

export async function GetUserController(request: FastifyRequest,
  reply: FastifyReply) {
  const schema = z.object({
    phone_number: z.string().optional(),
  })


  const { phone_number } = schema.parse(request.params);


  const getUsersService = new GetUsersService(new PrismaUsersRepository());
  try {
    const response = await getUsersService.execute({ phone_number });
    if (!response) return reply.status(404).send("User not found");
    reply.status(200).send(response);
  }
  catch (error) {
    reply.status(500).send(error);
    ;
  }
}
