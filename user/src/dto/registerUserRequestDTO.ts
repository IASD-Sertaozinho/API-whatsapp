import { Message } from "../models/Message";

export interface RegisterUserRequestDTO {
    name: string;
    cel: string;
    message: Message;
}
