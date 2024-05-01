import { GenerateAdmVoucherService } from "../generateAdmVoucher";
import { UsersRepository } from "../../repositories/usersRepository";
import { AdminRepository } from "../../repositories/admRepository";
import { beforeEach, describe, expect, it } from "vitest";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import InMemoryAdminRepository from "../../repositories/inMemory/admRepository";
import RegisterUserService from "../registerUser";
import { Message } from "@prisma/client";

import { CacheRepository } from "../../repositories/cacheRepository";
import InMemoryCacheRepository from "../../repositories/inMemory/CacheRepository";
import RegisterAdmService from "../registerAdm";
import { hash } from "../../app";
import InvalidVoucherError from "../../errors/InvalidVoucher";
import { UserDidntExists } from "../../errors/UserDidntExists";

describe("RegisterAdmin", () => {
    let generateAdmVoucher: GenerateAdmVoucherService;
    let registerUser: RegisterUserService;
    let usersRepository: UsersRepository;
    let adminRepository: AdminRepository;
    let cacheRepository: CacheRepository;
    let adm_phone_number: string;
    let registerAdmin: RegisterAdmService;
    const hashFunctions = hash;

    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        adminRepository = new InMemoryAdminRepository();
        cacheRepository = new InMemoryCacheRepository();
        generateAdmVoucher = new GenerateAdmVoucherService(
            usersRepository,
            adminRepository,
            cacheRepository
        );
        registerAdmin = new RegisterAdmService(
            usersRepository,
            adminRepository,
            cacheRepository,
            hashFunctions
        );
        registerUser = new RegisterUserService(usersRepository);
        adm_phone_number = "123456789";
        await registerUser.execute({
            cel: adm_phone_number,
            name: "John Doe",
            message: Message.COMUM,
        });
        await adminRepository.create({
            cel: adm_phone_number,
            password: "123456",
        });
    });
    it("should create a new Admin with correct Voucher", async () => {
        await registerUser.execute({
            cel: "1234567890",
            name: "John Doe",
            message: Message.COMUM,
        });
        const response = await generateAdmVoucher.execute({
            adminNumber: adm_phone_number,
            newAdminNumber: "1234567890",
        });
        const newAdmin = await registerAdmin.execute({
            cel: "1234567890",
            password: "123456",
            voucher: response.send,
        });

        expect(newAdmin.send).toHaveProperty("id");
    });
    it("should not create a new Admin with a phone number that is not signed up", async () => {
        expect(async () => {
            await registerAdmin.execute({
                cel: "1234567890",
                password: "123456",
                voucher: "1234567890",
            });
        }).rejects.toBeInstanceOf(UserDidntExists);
    });
    it("should not create a new Admin with a wrong Voucher", async () => {
        await registerUser.execute({
            cel: "1234567890",
            name: "John Doe",
            message: Message.COMUM,
        });
        await generateAdmVoucher.execute({
            adminNumber: adm_phone_number,
            newAdminNumber: "1234567890",
        });
        expect(async () => {
            await registerAdmin.execute({
                cel: "1234567890",
                password: "123456",
                voucher: "1234567890",
            });
        }).rejects.toBeInstanceOf(InvalidVoucherError);
    });
});
