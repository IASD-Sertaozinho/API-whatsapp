import { FastifyInstance } from "fastify";
import RegisterUserController from "../controller/RegisterUser";

export async function registerUserRoutes(app: FastifyInstance) {
    app.post("/user", RegisterUserController);
}
