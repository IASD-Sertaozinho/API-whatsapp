import { FastifyInstance } from "fastify";
import { GetUserController } from "../controller/GetUser";
import RegisterUserController from "../controller/RegisterUser";

export async function registerUserRoutes(app: FastifyInstance) {
  app.post("/user", RegisterUserController);
  app.get("/users/:phone_number?", GetUserController);
}
