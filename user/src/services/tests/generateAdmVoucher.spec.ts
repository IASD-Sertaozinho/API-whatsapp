import { GenerateAdmVoucher } from "../generateAdmVoucher";
import { UsersRepository } from "../../repositories/usersRepository";
import { AdminRepository } from "../../repositories/admRepository";
import { beforeEach, describe, expect, it } from "vitest";
import InMemoryUsersRepository from "../../repositories/inMemory/usersRepository";
import InMemoryAdminRepository from "../../repositories/inMemory/admRepository";
import RegisterUser from "../registerUser";
import { Message } from "../../models/Message";
import UserIsntAnAdminError from "../../errors/UserIsntAnAdmin";
import { CacheRepository } from "../../repositories/cacheRepository";
import InMemoryCacheRepository from "../../repositories/inMemory/CacheRepository";
import { UserDidntExists } from "../../errors/UserDidntExists";
import { UserAlreadyIsAnAdministrator } from "../../errors/UserAlreadyIsAnAdministrator";

describe("GenerateAdmVoucher", () => {
    let generateAdmVoucher: GenerateAdmVoucher;
    let registerUser: RegisterUser;
    let usersRepository: UsersRepository;
    let adminRepository: AdminRepository;
    let cacheRepository: CacheRepository;

    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository();
        adminRepository = new InMemoryAdminRepository();
        cacheRepository = new InMemoryCacheRepository();
        generateAdmVoucher = new GenerateAdmVoucher(
            usersRepository,
            adminRepository,
            cacheRepository
        );
        registerUser = new RegisterUser(usersRepository);
        const phone_number = "123456789";
        await registerUser.execute({
            cel: phone_number,
            name: "John Doe",
            message: Message.COMUM,
        });
        await adminRepository.create({
            cel: phone_number,
            password: "123456",
        });
    });

    it("should generate a new admin voucher as a Admin", async () => {
        await registerUser.execute({
            cel: "1234567890",
            name: "John Doe",
            message: Message.COMUM,
        });
        console.log("here");
        const response = await generateAdmVoucher.execute("1234567890");
        expect(typeof response).toBe("string");
    });

    it("should not generate a new admin voucher for an user that doesn't exists", async () => {
        expect(async () => {
            await generateAdmVoucher.execute("1234567890");
        }).rejects.toBeInstanceOf(UserDidntExists);
    });

    it("should not generate a new admin voucher for an user that is already an admin", async () => {
        expect(async () => {
            await generateAdmVoucher.execute("123456789");
        }).rejects.toBeInstanceOf(UserAlreadyIsAnAdministrator);
    });

    it("should not generate a new admin voucher as a User that is not an admin", async () => {
        expect(async () => {
            await generateAdmVoucher.execute("123456789");
        }).rejects.toBeInstanceOf(UserIsntAnAdminError);
    });
});
