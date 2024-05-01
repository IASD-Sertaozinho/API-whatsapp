import fastify from "fastify";
import Hash from "./utils/Hash";
import { randomBytes } from "node:crypto";
import { registerUserRoutes } from "./http/routes/RegisterUser";

export const app = fastify();

app.register(registerUserRoutes);
//Must have a better way to implement this...
export const hash = new Hash(randomBytes(32), randomBytes(16));
