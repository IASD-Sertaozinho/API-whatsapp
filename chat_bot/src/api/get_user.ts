import axios from "axios";
import { User } from "../class/user";

export const getUser = async (cel: string | null) => {
  const phone_number = cel?.replace(/\D/g, '');
  console.log(phone_number)

  const response = await axios.get<User>(`http://localhost:3001/users/${phone_number}`).finally(() => {
    console.log("Request finished")
  });
  return response.data;
}
