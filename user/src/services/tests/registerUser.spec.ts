import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../../repositories/usersRepository";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import { Message } from "@prisma/client";

import RegisterUserService from "../registerUser";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";

let usersRepository: UsersRepository;
let registerUser: RegisterUserService;

describe("Register User Service", async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        registerUser = new RegisterUserService(usersRepository);
    });

    it("should register a new user", async () => {
        const response = await registerUser.execute({
            cel: "123456789",
            name: "John Doe",
            message: Message.COMUM,
        });
        expect(response.status).toBe(201);
    });
    it("🚨should not register a user with the same cel", async () => {
        await registerUser.execute({
            cel: "123456789",
            name: "John Doe",
            message: Message.COMUM,
        });
        // const response = await registerUser.execute({
        //     cel: "123456789",
        //     name: "John Doe",
        //     message: Message.COMUM,
        // });
        // expect(response).toBe(409);
        expect(async () => {
            await registerUser.execute({
                cel: "123456789",
                name: "John Doe",
                message: Message.COMUM,
            });
        }).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
