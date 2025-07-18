import { UserInput } from 'db/models/users';
import Users from 'repository/users.respository';
import { buildUserPayload } from 'helpers/users.sequelize';
const UserRepo = new Users();

const UserServices = {
  async create(payload: UserInput) {
    const new_payload = await buildUserPayload(payload);
    return await UserRepo.create(new_payload);
  },
  async findById(id: number) {
    return await UserRepo.getOneById(id);
  },
  async findByEmail(email: string) {
    return await UserRepo.findUserByEmail(email);
  },
  async findByUsername(username: string) {
    return await UserRepo.findUserByUsername(username);
  },
  async getAll() {
    return await UserRepo.getAll();
  },
};

export default UserServices;
