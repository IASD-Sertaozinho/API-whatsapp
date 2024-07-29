import axios from "axios";
import { Message } from "../class/message";

interface get_daily_meditation {
  titulo: string;
  text: string;
  image: string;
}

export const getMessage = async (message: Message) => {
  let msg: string;
  if (message === "COMUM") {
    msg = "get_common_meditation"
  }
  else if (message === "JOVENS") {
    msg = "get_yong_meditation"
  }
  else if (message === "MULHERES") {
    msg = "get_woman_meditation"
  }
  else {
    throw new Error("Message not found")
  }
  const response = await axios.get<get_daily_meditation>(`http://localhost:3000/${msg}`)
  return response;
}
