import { registerUser } from "../api/register_user";
import { checkUserAndMeditation } from "../util/check_user_and_meditation";


interface RegisterUserRequestDTO {
  req: string;
  cel: string;
}
export async function RegisterUser({ req, cel }: RegisterUserRequestDTO) {

  const { nome, tipoMeditacao } = checkUserAndMeditation(req)
  if (!nome || !tipoMeditacao) {
    return "Error"
  }
  await registerUser({ name: nome, cel, message: tipoMeditacao }).then((response) => {
    return "Success"
  }).catch((error) => {
    console.log(error)
  });
}
