import { Message } from "../models/Message";

export interface UpdateUserRequestDTO {
    name: string | undefined;
    cel: string;
    message: Message | undefined;
}
