import { Message } from "@prisma/client";

export interface UpdateUserRequestDTO {
    name: string | undefined;
    cel: string;
    message: Message | undefined;
}
