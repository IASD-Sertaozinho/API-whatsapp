// import { GenerateAdmVoucher } from "../generateAdmVoucher";
import { UsersRepository } from "../../repositories/usersRepository";
import { AdminRepository } from "../../repositories/admRepository";
import { beforeEach, describe, expect, it } from "vitest";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import InMemoryAdminRepository from "../../repositories/inMemory/admRepository";
import RegisterUserService from "../registerUser";
import { Message } from "@prisma/client";

import Hash from "../../utils/Hash";
import AuthenticateAdmService from "../authenticateAdm";
import WrongPasswordError from "../../errors/WrongPassword";
import { hash } from "../../app";
import { UserDidntExists } from "../../errors/UserDidntExists";

let adminRepository: AdminRepository;
let hashFunctions: Hash;
let authenticateAdminService: AuthenticateAdmService;
let registerUserService: RegisterUserService;
let usersRepository: UsersRepository;
const adm_phone_number = "12345678910";

describe("Authenticate Adm Service", async () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        hashFunctions = hash;
        adminRepository = new InMemoryAdminRepository();
        authenticateAdminService = new AuthenticateAdmService(
            adminRepository,
            hashFunctions
        );
        registerUserService = new RegisterUserService(usersRepository);

        await registerUserService.execute({
            cel: adm_phone_number,
            name: "John Doe",
            message: Message.COMUM,
        });
        await adminRepository.create({
            cel: adm_phone_number,
            password: hashFunctions.encrypt("123456"),
        });
    });
    it("should be able to authenticate an Admin", async () => {
        const userLogged = await authenticateAdminService.execute({
            number: adm_phone_number,
            password: "123456",
        });
        expect(userLogged.userCel).toBe(adm_phone_number);
    });
    it("should not be able to authenticate an Admin with the wrong password", async () => {
        expect(async () => {
            await authenticateAdminService.execute({
                number: adm_phone_number,
                password: "1234561",
            });
        }).rejects.toBeInstanceOf(WrongPasswordError);
    });
    it("should not be able to authenticate an Admin that doesn't exists", async () => {
        expect(async () => {
            await authenticateAdminService.execute({
                number: "12345678911",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(UserDidntExists);
    });
});
