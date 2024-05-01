import { Admin } from "./Admin";
import { Message } from "./Message";
export interface User {
    id: string;
    cel: string;
    name: string;
    message: Message;
    Admin?: Admin | undefined;
}
