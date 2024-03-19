// import RegisterAdministratorRequestDTO from "../dto/registerAdmRequestDTO";
import { Admin } from "../models/Admin";

export interface AdminRepository {
    create(data: createAdminData): Promise<Admin>;
    delete(username: string): Promise<void>;
    findByUserNumber(number: string): Promise<Admin | undefined>;
}
export interface createAdminData {
    password: string;
    cel: string;
}
