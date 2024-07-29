import { Message } from "./message";

export interface User {
  id: string;
  cel: string;
  name: string;
  message: Message;
  // Admin?: Admin | undefined;
}
