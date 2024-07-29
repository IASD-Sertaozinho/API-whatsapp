import axios from "axios";

interface RegisterUserRequestDTO {
  name: string;
  cel: string;
  message: string;
}


export const registerUser = async ({ name, cel, message }: RegisterUserRequestDTO) => {
  let messageType;
  if (message === "adultos")
    messageType = "COMUM"
  else if (message === "jovens")
    messageType = "JOVENS"
  else if (message === "mulheres")
    messageType = "MULHERES"
  else
    return "Invalid Message"
  console.log(cel.replace(/\D/g, ''))
  const response = await axios.post("http://localhost:3001/user", {
    name: name,
    phone_number: cel.replace(/\D/g, ''),
    message: messageType
  });
  if (response.status === 200) {
    return "ok";
  }
  return "error"
}
