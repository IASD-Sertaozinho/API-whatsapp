import { Message } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUserRepository";
import RegisterUserService from "../../services/registerUser";

export default async function RegisterUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserSchema = z.object({
    name: z.string(),
    phone_number: z.string(),
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
    reply.status(response.status).send("User registered successfully!");
  } catch (error) {
    reply.status(400).send(error);
  }
}
