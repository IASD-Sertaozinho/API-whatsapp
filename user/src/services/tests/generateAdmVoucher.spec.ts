import { GenerateAdmVoucherService } from "../generateAdmVoucher";
import { UsersRepository } from "../../repositories/usersRepository";
import { AdminRepository } from "../../repositories/admRepository";
import { beforeEach, describe, expect, it } from "vitest";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import InMemoryAdminRepository from "../../repositories/inMemory/admRepository";
import RegisterUserService from "../registerUser";
import { Message } from "@prisma/client";

import UserIsntAnAdminError from "../../errors/UserIsntAnAdmin";
import { CacheRepository } from "../../repositories/cacheRepository";
import InMemoryCacheRepository from "../../repositories/inMemory/CacheRepository";
import { UserDidntExists } from "../../errors/UserDidntExists";
import { UserAlreadyIsAnAdministrator } from "../../errors/UserAlreadyIsAnAdministrator";

describe("GenerateAdmVoucher", () => {
    let generateAdmVoucher: GenerateAdmVoucherService;
    let registerUser: RegisterUserService;
    let usersRepository: UsersRepository;
    let adminRepository: AdminRepository;
    let cacheRepository: CacheRepository;
    let adm_phone_number: string;

    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        adminRepository = new InMemoryAdminRepository();
        cacheRepository = new InMemoryCacheRepository();
        generateAdmVoucher = new GenerateAdmVoucherService(
            usersRepository,
            adminRepository,
            cacheRepository
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

    it("should generate a new admin voucher as a Admin", async () => {
        await registerUser.execute({
            cel: "1234567890",
            name: "John Doe",
            message: Message.COMUM,
        });
        const response = await generateAdmVoucher.execute({
            adminNumber: adm_phone_number,
            newAdminNumber: "1234567890",
        });
        expect(typeof response.send).toBe("string");
    });

    it("should not generate a new admin voucher for an user that doesn't exists", async () => {
        expect(async () => {
            await generateAdmVoucher.execute({
                adminNumber: adm_phone_number,
                newAdminNumber: "1234123123",
            });
        }).rejects.toBeInstanceOf(UserDidntExists);
    });

    it("should not generate a new admin voucher for an user that is already an admin", async () => {
        expect(async () => {
            await generateAdmVoucher.execute({
                adminNumber: adm_phone_number,
                newAdminNumber: adm_phone_number,
            });
        }).rejects.toBeInstanceOf(UserAlreadyIsAnAdministrator);
    });

    it("should not generate a new admin voucher as a User that is not an admin", async () => {
        expect(async () => {
            await generateAdmVoucher.execute({
                adminNumber: "12345678912",
                newAdminNumber: "1234567893",
            });
        }).rejects.toBeInstanceOf(UserIsntAnAdminError);
    });
});
