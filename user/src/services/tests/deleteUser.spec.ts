import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import { UsersRepository } from "../../repositories/usersRepository";
import DeleteUser from "../deleteUser";
import { Message } from "../../models/Message";
import { describe, beforeEach, expect, it } from "vitest";
import { UserDidntExists } from "../../errors/UserDidntExists";

let usersRepository: UsersRepository;
let deleteUser: DeleteUser;

describe("Delete User Service", async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        deleteUser = new DeleteUser(usersRepository);
    });
    it("should be able to delete an user", async () => {
        await usersRepository.create({
            cel: "12345678910",
            name: "John Doe",
            message: Message.COMUM,
        });
        await deleteUser.execute({
            number: "12345678910",
        });
        const users = await usersRepository.findAll();
        expect(users).toEqual([]);
    });
    it("should not be able to delete an user that doesn't exists", async () => {
        expect(async () => {
            await deleteUser.execute({
                number: "12345678910",
            });
        }).rejects.toBeInstanceOf(UserDidntExists);
    });
});
