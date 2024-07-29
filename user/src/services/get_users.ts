import { UsersRepository } from "../repositories/usersRepository";

interface getUsers {
  phone_number?: string;
}

export class GetUsersService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: getUsers) {
    if (data.phone_number) {
      return await this.usersRepository.findByCel(data.phone_number);
    }
    return await this.usersRepository.findAll();
  }
}
