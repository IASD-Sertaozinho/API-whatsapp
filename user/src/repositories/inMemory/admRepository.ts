import { randomUUID } from "crypto";
import { Admin } from "../../models/Admin";
import { AdminRepository, createAdminData } from "../admRepository";

export default class InMemoryAdminRepository implements AdminRepository {
    private admins: Admin[];
    constructor() {
        this.admins = new Array<Admin>();
    }

    public async create(data: createAdminData): Promise<Admin> {
        const admin: Admin = {
            id: randomUUID(),
            userCel: data.cel,
            password: data.password,
            // Set other properties of the admin object
        };
        this.admins.push(admin);
        return admin;
    }

    public async delete(phone_number: string): Promise<void> {
        const index = this.admins.findIndex(
            (admin) => admin.userCel === phone_number
        );
        this.admins.splice(index, 1);
    }

    public async findByUserNumber(number: string): Promise<Admin | undefined> {
        return this.admins.find((admin) => admin.userCel === number);
    }
}
