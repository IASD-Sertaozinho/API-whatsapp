// import RegisterAdministratorRequestDTO from "../dto/registerAdmRequestDTO";
import { Admin } from "../models/Admin";

export interface AdminRepository {
    create(data: createAdminData): Promise<Admin>;
    delete(phone_number: string): Promise<void>;
    findByUserNumber(number: string): Promise<Admin | null>;
}
export interface createAdminData {
    password: string;
    cel: string;
}
