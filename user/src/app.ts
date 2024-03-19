import fastify from "fastify";
import Hash from "./utils/Hash";
import { randomBytes } from "node:crypto";

export const app = fastify();

//Must have a better way to implement this...
export const hash = new Hash(randomBytes(32),
    randomBytes(16));
