import { Message } from "@prisma/client";

export interface RegisterUserRequestDTO {
    name: string;
    cel: string;
    message: Message;
}
