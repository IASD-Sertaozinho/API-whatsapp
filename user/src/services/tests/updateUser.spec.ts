import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../../repositories/usersRepository";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import RegisterUserService from "../registerUser";
import { UpdateUserService } from "../updateUser";
import { User } from "../../models/User";
import { Message } from "@prisma/client";

import { UserDidntExists } from "../../errors/UserDidntExists";

let usersRepository: UsersRepository;
let registerUser: RegisterUserService;
let updateUser: UpdateUserService;
let user: User;

describe("Update User Service", async () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        registerUser = new RegisterUserService(usersRepository);
        updateUser = new UpdateUserService(usersRepository);
        user = await usersRepository.create({
            cel: "12345678910",
            name: "John Doe",
            message: Message.COMUM,
        });
    });
    it("should be able to update an user", async () => {
        await updateUser.execute({
            cel: "12345678910",
            name: "John Doe",
            message: Message.COMUM,
        });
        const users = await usersRepository.findAll();
        expect(users[0].name).toEqual("John Doe");
    });
    it("should not be able to update an user that doesn't exists", async () => {
        expect(async () => {
            await updateUser.execute({
                cel: "12345678911",
                name: "John Doe",
                message: Message.COMUM,
            });
        }).rejects.toBeInstanceOf(UserDidntExists);
    });
});
